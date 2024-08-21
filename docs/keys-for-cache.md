# Keys for Cache

* [Intro](#intro)
* [Accessing your Cache Keys through KFC](#accessing-your-cache-keys-through-kfc)
* [Using KFC for Partial Caching](#using-kfc-for-partial-caching)
* [Manipulating your CacheKey](#manipulating-your-cachekey)
* [How your Cache Keys are invalidated/cleared](#how-your-cache-keys-are-invalidatedcleared)
* [When you might not use KFC](#when-you-might-not-use-kfc)

## Intro

Please see the [repo](https://github.com/silverstripe-terraformers/keys-for-cache) for full documentation (especially
if you are a project lead). Below is as close to a "TL;DR" as I could manage.

Keys for Cache (KFC for short) attempts to make the generation of Cache Keys (EG: like you use for Partial Caching)
simpler.

**Note:** It can be used for anything, but Partial Caching is the main use case, so that's what we'll focus on.

If you're not familiar with Partial Caching, then the official
[Silverstripe docs](https://docs.silverstripe.org/en/4/developer_guides/performance/partial_caching/) are a good place
to start.

Previously you were probably creating (EG) `getCacheKey()` methods on your Pages, Blocks, etc. These methods would need
to collate a bunch of unique IDs and `LastEdited` dates into a string, and then you'd return that and use it within your
`<% cached .. %>` wrapper.

One issue with this is that for more complex Blocks (like a Carousel, that has many items, and who's items can have
links and images) often the performance cost of querying everything that is needed for `getCacheKey()` is as high as if
you hadn't used caching at all.

Another issue is that it can sometimes be difficult to visualise what information you need in your Cache Key in order
for it to invalidate at the correct times.

KFC will attempt to help with both of these problems.

## Accessing your Cache Keys through KFC

By default, the `CacheKeyExtension` is applied to **all** `DataObjects`. One key thing you need to do as you're building
out your `DataObjects` is determine which of them need Cache Keys.

For example, you might decide that you'd like Cache Keys to be available to all of your Pages. Since `Page.php` is a
class that we control, you'll probably add this configuration into the class itself:

```php
class Page extends SiteTree
{
    private static bool $has_cache_key = true;
}
```

You might also decide that you'd like Cache Keys available on all of your Blocks. `BaseElement.php` is **not** a class
that we control, so here you would use config yaml instead:

```yaml
DNADesign\Elemental\Models\BaseElement:
    has_cache_key: true
```

## Using KFC for Partial Caching

Your `getCacheKey()` method is now provided through the `CacheKeyExtension`. As mentioned above, this Extension is
applied to all `DataObjects`.

So, keep in mind, if you're using KFC, then every `DataObject` has access to the `getCacheKey()` method and the
`$CacheKey` template variable, **however**, only classes that have specified that they `has_cache_key` will get returned
a value from that method. If a `DataObject` does **not** `has_cache_key`, then the value returned will always be `null`.

You might then use this `$CacheKey` for one of your Blocks:

```
<% cached $CacheKey %>
    <div class="container">
        <% loop $Items %>
            ...
        <% end_loop %>
    </div>
<% end_cached %>
```

Or, you could add it into the `ElementalArea.ss` template for **all** Blocks:

```
<% loop $ElementControllers %>
    <% cached $Me.CacheKey if $Me.CacheKey %>
        $Me
    <% end_cached %>
<% end_loop %>
```

Note: By adding `if $CacheKey`, we provide devs with the opportunity to have some Blocks **uncached** by making those
particular blocks either `has_cache_key = false`, or by returning `null` or `false` in some other way for the
`$CacheKey` method (more on that later).

It can also be used for other areas of your Page, for example you might have some "non-Block" Page elements like a
HeroBanner, and then perhaps there are some SocialLinks in the footer.

```
<section class="hero-banner">
    <%-- $CacheKey will come from our Page, and then we can add 'HeroBanner' as some extra salt so that it doesn't --%>
    <%-- conflict with the Key we will later use for the SocialLinks --%>
    <% cached $CacheKey, 'HeroBanner' %>
        <div>
            ...
        </div>
    <% end_cached %>
</section>

... body content, including all of our Blocks, etc

<section class="social-link">
    <%-- $CacheKey will also come from our Page (and will be exactly the same as the one used above), but because --%>
    <%-- we've added 'SocialLinks' as some extra salt, the two will not get confused --%>
    <% cached $CacheKey, 'SocialLinks' %>
        <ul>...</ul>
    <% end_cached %>
</section>
```

For more examples on how you could use KFC, please
[see the docs](https://github.com/silverstripe-terraformers/keys-for-cache/blob/main/docs/en/examples.md)

## Manipulating your CacheKey

You also have access to an extension point `updateCacheKey`. This provides you with the `CacheKeyDTO` which you can then
append to, or replace.

```php
// Append something to the Cache Key
public function updateCacheKey(CacheKeyDto $cacheKey): void
{
    $extraValue = $this->SomethingElseFromMyDataObject;
    
    $cacheKey->appendKey($extraValue);
}

// OR
// Completely replace the Cache Key
public function updateCacheKey(CacheKeyDto $cacheKey): void
{
    // This is overriding the entire CacheKey and setting it to null. If you were using `if $CacheKey` in your
    // template, then this would mean that it will be "uncached" (because the `if` condition will be false)
    if ($this->SomeCriteria) {
        $cacheKey->set(null);
    }
}
```

## How your Cache Keys are invalidated/cleared

Instead of calculating your Cache Key at the time of request (like you used to do), we're now going to calculate the
Cache Key at the time of **content author action**. Whenever a relevant action is triggered, we will clear all
associated Cache Keys.

What we need you to do is tell us when this Cache Key needs to be invalidated, and you do that (for the most part) by
telling us what your `DataObject` `cares` about.

**Note:** A `DataObject` does not need to `has_cache_key` for it to have `cares` (or to be `cares`'ed about).

Let's say you have a Carousel. It's pretty common for our Carousels to have Items, and those Items usually have (at the
very least) an Image, but they often also have a Link (CTA). The Cache Key for a Carousel would (ideally) need to
invalidate any time the Carousel block itself is updated, any time an Item is updated, **and** any time an Image is
updated through the Asset admin, **and** any time that Link (CTA) is updated.

The above is **way** too much for the old method of generating Keys can handle. The cost of correctly calculating all
of the above is almost (if not exactly) the same as if you didn't use caching at all.

With KFC, we would now define the configuration for our Carousel and Items like so. The goal is to create a "chain"
(or a spiders web) that connects all relevant relationships together.

The way that KFC works is that when you edit/delete/etc any `DataObject`, KFC invokes a method on that `DataObject`
which will (firstly) clear the Cache Key for that `DataObject` (if it `has_cache_key`), and  it will then go looking for
any/all `DataObjects` that `cares` about that particular record. KFC then triggers the same method on that `DataOject`,
and the process continues until there are nothing else in the chain/web.

`CarouselBlock.php`:

```php
class CarouselBlock extends BaseElement
{
    // Just reiterating the need for this config, but you might have defined this in yaml
    // Our CarouselBlock *will* have a CacheKey
    $private static bool $has_cache_key = true;

    // Our CarouselBlock has many Items (pretty standard)
    private static array $has_many = [
        'Items' => CarouselItem::class,
    ];

    // Here I tell KFC that there is a relationship that the Carousel "cares" about
    private static array $cares = [
        'Items',
    ];
}
```

`CarouselItem.php`:

```php
class CarouselItem extends DataObject
{
    // Please note, CarouselItem does *not* has_cache_key, because we don't really need to have individual Partial
    // Caches for each Item. That doesn't mean that it can't still "care" about things though

    // Our CarouselItem has one Link, and it has one Image
    private static array $has_one = [
        'CtaLink' => Link::class,
        'Image' => Image::class,
    ];

    // Our Items care about both of those relationships
    private static array $cares = [
        'CtaLink',
        'Image',
    ];
}
```

Ok, so what's happening here?

* If we were to update the `CarouselBlock` itself (say, update the Title), then KFC would immediately see that the Block
  `has_cache_key`, and it would invalidate that Key.
  * There are no other `DataObjects` that `cares` about our `CarouselBlock`, so the process would stop there.
* If an author was to update a `CarouselItem` (again, by updating the Title), then KFC would see that it does *not*
  `has_cache_key`, so it would *not* attempt to invalidate any Keys for the Item. However, it **will** go looking for
  any relationships that "care" about it.
  * At this time, it will find the `CarouselBlock` that it is assigned to, and it will trigger the `CarouselBlock` to
    invalidate its Key.
* If an author updated the `CtaLink`, or the `Image`, then a similar thing would happen. Neither of those
  `has_cache_key`, but both would "find" the associated `CarouselItem` (or "Items", in the case of Image), and in turn
  the `CarouselItem` (or Items) would go and find the `CarouselBlock`, at which point, the `CarouselBlock` would
  invalidate its Key.

There is also configuration for `touches` (which is kind of the opposite of `cares`), and `global_cares` (which can
be really useful).

For more configuration instructions, please
[see the docs](https://github.com/silverstripe-terraformers/keys-for-cache#setup-and-configuration)

## When you might not use KFC

There might still be times when you use the original method of creating cache keys (where you create your own
`getCacheKey()` method, and fill it with everything you need).

**Most often**, I would say that this would be when you're creating a cached area for something that isn't represented
by a `DataObject`, or perhaps it's representing a whole mess of `DataObjects`.

The Tourism CORE project, for example, has a few different "global" type features that all require very different
information. None of those features have a single `DataObject` that they can use as their main point of reference. The
easiest solution is to add separate `get[Feature]CacheKey()` methods onto our `PageController` (like we used to do).
