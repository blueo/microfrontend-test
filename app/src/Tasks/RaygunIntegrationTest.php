<?php

namespace App\Tasks;

use Exception;
use SilverStripe\Control\HTTPRequest;
use SilverStripe\Dev\BuildTask;

/**
 * @codeCoverageIgnore
 */
class RaygunIntegrationTest extends BuildTask
{

    private static $segment = 'test-raygun-integration'; // phpcs:ignore SlevomatCodingStandard.TypeHints

    protected $title = 'Raygun error check'; // phpcs:ignore SlevomatCodingStandard.TypeHints

    public function getDescription() // phpcs:ignore SlevomatCodingStandard.TypeHints
    {
        return 'Test Raygun logging by throwing an error.';
    }

    /**
     * @param HTTPRequest $request
     * @throws Exception
     */
    public function run($request) // phpcs:ignore SlevomatCodingStandard.TypeHints
    {
        throw new Exception('Raygun test');
    }

}
