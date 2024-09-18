# Microfrontend demo


1. clone the repository 
2. Run `ddev start` to bring up a local development environment
3. Run `ddev composer install`
4. Run `nvm use` followed by `yarn` and `yarn build`
5. Run `ddev sake dev/build flush=1`
6. run `ddev launch` and verify the site is working - including logging in with the username `admin` and password `password`
7. change into the `piral-app` directory and run `yarn && yarn build`
8. Verify that you can visit the 'Micro Admin' section of the CMS and get a basic Header displayed
9. change to the `piral-module-one` directory and run `yarn && yarn build`
10. Verify that on the Micro Admin section you now have some page content
11. change to the `piral-module-two` directory and run `yarn && yarn build`
12. Verify that on the Micro Admin the page content has changed to have new green text

optionally edit the `config.yaml` files in `piral-module-one` or `piral-module-two` to show the JS loading being controlled via yaml.
