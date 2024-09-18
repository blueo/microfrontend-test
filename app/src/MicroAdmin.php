<?php

namespace App;

use SilverStripe\Admin\LeftAndMain;
use SilverStripe\Control\HTTPRequest;
use stdClass;

class MicroAdmin extends LeftAndMain
{

    private static $url_segment = "microadmin";
    private static $menu_title  = "Micro Admin";

    private static $extra_requirements_javascript = [
        'piral-app/dist/release/main.js',
    ];

    private static $extra_requirements_css = [
        'piral-app/dist/release/style.css',
    ];

    private static array $allowed_actions = [
        'feed',
    ];

    private static array $pilets = [];

    public function feed(HTTPRequest $request)
    {
        $response = new stdClass();
        $response->items = $this->config()->get('pilets');

        return json_encode($response);
    }
}
