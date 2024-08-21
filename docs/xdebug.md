# Xdebug


`DDEV` have great [docs around xdebug](https://ddev.readthedocs.io/en/latest/users/debugging-profiling/step-debugging/).


For specific set up instructions for PHPStorm, please see our [PHPStorm docs](phpstorm.md).

Once you setup Xdebug, you should be able to enable or disable it.
Feel free to check out [Xdebug debugging tips](https://silverstripe.atlassian.net/l/c/17B1GV8d) for more information.



## Xdebug commands

Enable Xdebug by running `ddev xdebug` or `ddev xdebug on` from your project directory.

It will remain enabled until you start or restart the project.

Disable Xdebug for better performance when not debugging with `ddev xdebug off`.

Toggle Xdebug on and off easily with `ddev xdebug toggle`.

`ddev xdebug status` will show Xdebug’s current status.
