<?php

namespace App\Extensions;

use SilverStripe\AssetAdmin\Forms\UploadField;
use SilverStripe\Assets\Image;
use SilverStripe\Forms\FieldList;
use SilverStripe\ORM\DataExtension;

/**
 * Adds a new tab for Open Graph meta tags to the SiteConfig in the CMS.
 *
 * This allows a site wide, default Open Graph image to be set.
 *
 * The Open Graph meta tags are used by social media sites to display
 * information about a page when it is shared.
 */
class OpenGraphSiteConfigExtension extends DataExtension
{

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
     * Update the CMS site config to add the Open Graph tab
     *
     * @param FieldList $fields - The fields to update
     */
    public function updateCMSFields(FieldList $fields): void
    {
        $fields->addFieldsToTab(
            'Root.OpenGraph',
            [
                UploadField::create('OGImage', 'Site wide Open Graph image')
                    ->setDescription('This image is used when any page is shared via social media.
                    Each page can also have it\'s own Open Graph image which will be used instead of this one.'),
            ]
        );
    }

}
