<?php

namespace App\Tests\View;

use App\View\CustomEmbedShortcodeProvider;
use SilverStripe\Dev\SapphireTest;
use SilverStripe\View\Parsers\ShortcodeParser;

class CustomEmbedShortcodeProviderTest extends SapphireTest
{

    /**
     * Define the ratio sizing information we want to test
     *
     * @return array[]
     */
    public function calculateRatioPaddingDataProvider(): array
    {
        return [
            [
                [300, 200],
                66.67,
            ],
            [
                [800, 300],
                37.5,
            ],
            [
                [1280, 720],
                56.25,
            ],
            [
                [200, 400],
                200,
            ],
        ];
    }

    /**
     * Define the data we want to test
     *
     * @return string[][]
     */
    public function shortCodeHandlerDataProvider(): array
    {
        return [
            [
                '[embed url="https://www.youtube.com/watch?v=dQw4w9WgXcQ", width="350", height="270"]',
                [
                    // samples of the expected output
                    '<div class="embed__wrapper" style="max-width: 350px;">',
                    '<div class="embed" style="padding-bottom: 77.14%;">',
                    '<iframe width="350" height="270" ',
                    'src="https://www.youtube.com/embed/dQw4w9WgXcQ?feature=oembed',
                    'frameborder="0" allow="accelerometer; ',
                    'autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ',
                    'allowfullscreen="" title="Rick',
                    '</iframe></div> </div>',
                ],
            ],
            [
                '[embed url="http://www.youtube.com/watch?feature=player_embedded&v=dQw4w9WgXcQ"]',
                [
                    // samples of the expected output
                    '<div class="embed__wrapper" style="max-width: 1280px;">',
                    '<div class="embed" style="padding-bottom: 56.25%;">',
                    '<iframe width="1280" height="720" ',
                    'src="https://www.youtube.com/embed/dQw4w9WgXcQ?feature=oembed',
                    'frameborder="0" allow="accelerometer; ',
                    'autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ',
                    'allowfullscreen="" title="Rick',
                    '</iframe></div> </div>',
                ],
            ],
            [
                '[embed url="https://vimeo.com/20808232"]',
                [
                    // samples of the expected output
                    '<div class="embed__wrapper" style="max-width: 1280px;">',
                    '<div class="embed" style="padding-bottom: 56.25%;">',
                    '<iframe src="https://player.vimeo.com/video/20808232?app_id=122963" ',
                    'width="1280" height="720" ',
                    'frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" ',
                    'title="somewhere over the rainbow">',
                    '</iframe></div> </div>',
                ],
            ],
            [
                '[embed url="https://vimeo.com/535667880",width="300",height="200"]',
                [
                    // samples of the expected output
                    '<div class="embed__wrapper" style="max-width: 300px;">',
                    '<div class="embed" style="padding-bottom: 66.67%;">',
                    '<iframe src="https://player.vimeo.com/video/535667880?app_id=122963" ',
                    'width="300" height="200" ',
                    'frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" ',
                    'title="Sinking Ship by Sasha Leigh Henry">',
                    '</iframe></div> </div>',
                ],
            ],
        ];
    }

    /**
     * Check we can calculate the ratio padding accurately
     *
     * @dataProvider calculateRatioPaddingDataProvider
     */
    public function testCalculateRatioPadding(array $data, float $expected): void
    {
        [$width, $height] = $data;
        $ratio = CustomEmbedShortcodeProvider::calculateRatioPadding($width, $height);
        $this->assertEquals($expected, $ratio);
    }

    /**
     * @dataProvider shortCodeHandlerDataProvider
     */
    public function testHandleShortcode(string $givenContent, array $expected): void
    {
        // setup the shortcode parser
        $parser = new ShortcodeParser();
        $parser->register('embed', [
            CustomEmbedShortcodeProvider::class,
            'handle_shortcode',
        ]);

        // parse the content
        $result = $parser->parse($givenContent);

        // strip the whitespace and line breaks
        $result = $this->stripString($result);

        // check the expected output is present
        foreach ($expected as $expectedOutput) {
            $this->assertStringContainsString($expectedOutput, $result);
        }
    }

    /**
     * Strip the whitespace and line breaks from a string
     *
     * @param string $string
     * @return string
     */
    private function stripString(string $string): string
    {
        // strip excess whitespace
        $string = preg_replace('/\s+/', ' ', $string);

        // strip line breaks
        $string = preg_replace('/\n+/', '', $string);

        return $string;
    }

}
