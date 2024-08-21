<?php

namespace App\Extensions;

use SilverStripe\AssetAdmin\Forms\UploadField;
use SilverStripe\Assets\Image;
use SilverStripe\Forms\FieldList;
use SilverStripe\Forms\LiteralField;
use SilverStripe\Forms\TextareaField;
use SilverStripe\Forms\TextField;
use SilverStripe\ORM\DataExtension;
use SilverStripe\SiteConfig\SiteConfig;

/**
 * Adds a new tab for Open Graph meta tags to all Pages in the CMS
 *
 * The Open Graph meta tags are used by social media sites to display
 * information about a page when it is shared.
 */
class OpenGraphSiteTreeExtension extends DataExtension
{

    /**
     * Define the extra fields to add
     */
    private static array $db = [
        'OGTitle' => 'Varchar(70)',
        'OGDescription' => 'Text',
    ];

    /**
     * Define the relationships to add
     */
    private static array $has_one = [
        'OGImage' => Image::class,
    ];

    /**
     * Define the objects that this owns
     */
    private static array $owns = [
        'OGImage',
    ];

    /**
     * Update the CMS pages to add the Open Graph fields
     *
     * @param FieldList $fields - The fields to update
     */
    public function updateCMSFields(FieldList $fields): void
    {
        $owner = $this->getOwner();

        $ogFields = [
            LiteralField::create(
                'WhatIsOG',
                '<h2>What are Open Graph meta tags?</h2>
                    <p>Open Graph meta tags are snippets of code that control how URLs are displayed when shared
                    on social media.</p>
                    <p class="mb-sm-5">They’re part of Facebook’s
                    <a href="https://ogp.me/" target="_blank" rel="noopener">Open Graph protocol</a>
                    and are also used by other social media sites, including LinkedIn and X (formally Twitter).</p>',
            ),
            TextField::create('OGTitle', 'Open Graph title')
                ->setMaxLength(60)
                ->setDescription('Limited to 60 characters. Defaults to the page title'),
            TextareaField::create('OGDescription', 'Open Graph description')
                ->setMaxLength(200)
                ->setDescription('Limited to 200 characters.'),
            UploadField::create('OGImage', 'Open Graph image')
                ->setDescription('Recommended size (1200x630 pixels) or higher'),
        ];

        if ($owner->isPublished()) {
            $ogFields[] = LiteralField::create(
                'OGPreviewLink',
                sprintf(
                    '<a href="https://www.opengraph.xyz/url/%s" target="_blank" rel="noopener">
                    Preview the open graph meta tags</a>',
                    $owner->AbsoluteLink(),
                )
            );
        }

        $fields->addFieldsToTab('Root.OpenGraph', $ogFields);
    }

    /**
     * Get the Open Graph title for the templates
     */
    public function getOpenGraphTitle(): string
    {
        $owner = $this->getOwner();

        return $owner->OGTitle ?: $owner->Title;
    }

    /**
     * Get the Open Graph description for the templates
     */
    public function getOpenGraphImage(): ?Image
    {
        $owner = $this->getOwner();

        if ($owner->OGImage()->exists()) {
            return $owner->OGImage;
        }

        return SiteConfig::current_site_config()->OGImage;
    }

    /**
     * Get a secure Open Graph image for the templates
     *
     * @param string $url - The url to force to be secure
     * @return string - The secure url
     */
    public function forceSecure(string $url): string
    {
        // force the image URL to be secure
        return str_replace('http://', 'https://', $url);
    }

}
