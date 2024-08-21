<?php

namespace App\Tests\Extensions;

use Page;
use SilverStripe\Assets\Image;
use SilverStripe\Control\Director;
use SilverStripe\Dev\FunctionalTest;

/**
 * Test the output of the OpenGraphSiteTreeExtension in the templates
 */
class OpenGraphSiteTreeExtensionFunctionalTest extends FunctionalTest
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
     * @dataProvider OpenGraphFieldsDataProvider
     * @param string $field - The field markup to check for
     * @return void
     * @throws ValidationException
     */
    public function testOpenGraphFieldsInTemplate(string $field): void
    {
        // create an image for the Open Graph image
        $ogImage = $this->objFromFixture(Image::class, 'ogImage');
        $ogImage->setFromLocalFile(Director::baseFolder() . '/app/tests/fixtures/images/1200x650.jpeg');
        $ogImage->write();

        // create an page with Open Graph fields
        $page = $this->objFromFixture(Page::class, 'with-og');
        $page->publishRecursive();

        // fetch the page response object
        $response = $this->get($page->Link());

        // check it loaded correctly
        $this->assertEquals(200, $response->getStatusCode());

        // check the Open Graph fields are in the template
        $this->assertStringContainsString($field, $response->getBody());
    }

    /**
     * Data provider for the Open Graph fields
     */
    protected function OpenGraphFieldsDataProvider(): array
    {
        $OGTitle = 'Open Graph title';
        $OGDescription = 'Open Graph description';

        return [
            [sprintf('<meta itemprop="name" content="%s">', $OGTitle)],
            [sprintf('<meta property="og:title" content="%s">', $OGTitle)],
            [sprintf('<meta name="twitter:title" content="%s">', $OGTitle)],
            [sprintf('<meta itemprop="description" content="%s">', $OGDescription)],
            [sprintf('<meta property="og:description" content="%s">', $OGDescription)],
            [sprintf('<meta name="twitter:description" content="%s">', $OGDescription)],
            ['<meta property="og:site_name" content="Your Site Name">'],
            ['<meta property="og:type" content="website">'],
            ['<meta property="og:url" content="http://localhost/about-us/">'],
            ['<link rel="canonical" href="http://localhost/about-us/">'],
            ['<meta property="og:image" content="http://localhost/assets/'],
            ['1200x650__ScaleWidth'],
            ['.jpeg">'],
            ['<meta property="og:image:secure_url" content="https://localhost/assets/'],
            ['<meta property="og:image:type" content="image/jpeg">'],
            ['<meta property="og:image:alt" content="Test image">'],
            ['<meta property="twitter:image" content="https://localhost/assets/'],
            ['<meta property="twitter:image:alt" content="Test image">'],
        ];
    }

}
