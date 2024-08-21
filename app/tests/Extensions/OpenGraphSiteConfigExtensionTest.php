<?php

namespace App\Tests\Extensions;

use App\Extensions\OpenGraphSiteConfigExtension;
use SilverStripe\AssetAdmin\Forms\UploadField;
use SilverStripe\Dev\SapphireTest;
use SilverStripe\SiteConfig\SiteConfig;

class OpenGraphSiteConfigExtensionTest extends SapphireTest
{

    /**
     * Check that the correct fields are included in the site config
     */
    public function testUpdateCMSFields(): void
    {
        $extension = new OpenGraphSiteConfigExtension();
        $fields = (new SiteConfig())->getCMSFields();
        $extension->updateCMSFields($fields);

        $expectedInstances = [
            'OGImage' => UploadField::class,
        ];

        foreach ($expectedInstances as $key => $class) {
            $msg = 'The field'. $key .'should be an instance of'. $class .'::class';
            $this->assertInstanceOf($class, $fields->dataFieldByName($key), $msg);
        }
    }

}
