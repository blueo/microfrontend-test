<?php

namespace App\Tests\Extensions;

use Page;
use SilverStripe\AssetAdmin\Forms\UploadField;
use SilverStripe\Assets\Image;
use SilverStripe\CMS\Model\SiteTree;
use SilverStripe\Control\Director;
use SilverStripe\Dev\SapphireTest;
use SilverStripe\Forms\TextareaField;
use SilverStripe\Forms\TextField;

/**
 * Test the OpenGraphSiteTreeExtension data
 */
class OpenGraphSiteTreeExtensionTest extends SapphireTest
{

    /**
     * Define the fixture file to use for each test
     *
     * This also sets up the database with the data from the fixture file
     * which is rebuilt for each test run
     *
     * @inheritDoc
     */
    protected static $fixture_file = 'OpenGraphSiteTreeExtensionTest.yml';

    /**
     * Check that the correct fields are included in the site tree
     */
    public function testUpdateCMSFields(): void
    {
        $obj = $this->objFromFixture(Page::class, 'with-og');
        assert($obj instanceof SiteTree);
        $fields = $obj->getCMSFields();

        $expectedInstances = [
            'OGTitle' => TextField::class,
            'OGDescription' => TextareaField::class,
            'OGImage' => UploadField::class,
        ];

        foreach ($expectedInstances as $key => $class) {
            $msg = 'The field'. $key .'should be an instance of'. $class .'::class';
            $this->assertInstanceOf($class, $fields->dataFieldByName($key), $msg);
        }
    }

    /**
     * Check the open graph title is given to the template correctly
     */
    public function testGetOpenGraphTitle(): void
    {
        $page = $this->objFromFixture(Page::class, 'with-og');
        $this->assertEquals($page->OGTitle, $page->getOpenGraphTitle());
    }

    /**
     * Check the default open graph title is the page title
     */
    public function testGetOpenGraphTitleDefault(): void
    {
        $page2 = $this->objFromFixture(Page::class, 'with-no-og-title');
        $this->assertEquals($page2->Title, $page2->getOpenGraphTitle());
    }

    /**
     * Check the default open graph image set in the site config is output correctly
     */
    public function testGetOpenGraphImageDefault(): void
    {
        // create a page with Open Graph fields
        $page = $this->objFromFixture(Page::class, 'simple');

        // create an image for the Open Graph image
        $ogImageSiteConfig = $this->objFromFixture(Image::class, 'ogImageSiteConfig');
        $ogImageSiteConfig->setFromLocalFile(Director::baseFolder() . '/app/tests/fixtures/images/1200x650.jpeg');
        $ogImageSiteConfig->write();

        // check the Open Graph image is output correctly
        $this->assertEquals($ogImageSiteConfig->Title, $page->getOpenGraphImage()->Title);
    }

    /**
     * Check the page Open Graph image is output correctly, overriding the default
     */
    public function testGetOpenGraphImage(): void
    {
        // set a default Open Graph image
        $ogImageSiteConfig = $this->objFromFixture(Image::class, 'ogImageSiteConfig');
        $ogImageSiteConfig->setFromLocalFile(Director::baseFolder() . '/app/tests/fixtures/images/1200x650.jpeg');
        $ogImageSiteConfig->write();

        // create an image for the Open Graph image for the page
        $ogImage = $this->objFromFixture(Image::class, 'ogImage');
        $ogImage->setFromLocalFile(Director::baseFolder() . '/app/tests/fixtures/images/1200x650.jpeg');
        $ogImage->write();

        // create a page with Open Graph fields
        $page = $this->objFromFixture(Page::class, 'with-og');

        // check the Open Graph page image is output correctly
        $this->assertEquals($ogImage->Title, $page->getOpenGraphImage()->Title);
    }

    /**
     * Check the function which forces an image URL to be secure
     */
    public function testForceSecure(): void
    {
        $page = $this->objFromFixture(Page::class, 'with-og');
        $url = 'http://localhost/assets/1200x650__ScaleWidth.jpeg';
        $this->assertEquals('https://localhost/assets/1200x650__ScaleWidth.jpeg', $page->forceSecure($url));
    }

}
