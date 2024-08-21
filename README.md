# Overview

[![CircleCI](https://dl.circleci.com/status-badge/img/gh/silverstripeltd/project-skeleton/tree/main.svg?style=svg&circle-token=f517f3b65677305b7543e220e0b9400ec47c8421)](https://dl.circleci.com/status-badge/redirect/gh/silverstripeltd/project-skeleton/tree/main)
[![codecov](https://codecov.io/gh/silverstripeltd/project-skeleton/graph/badge.svg?token=BaF2m9vwhO)](https://codecov.io/gh/silverstripeltd/project-skeleton)

Create a project skeleton for a Silverstripe project.

Project skeleton contains a set of useful initial setups to get you started:
* Standard application structure
* Base theme with compiled assets
* Storybook with initial stories and style guide placeholders
* Testing frameworks with PHPUnit, Jest and Cypress
* Silverstripe standards linting configuration
* `DDEV` configuration for virtualisation of developer environments 
* Default robots.txt example file. Remember to update the sitemap location.

## :heart: Contributing to project skeleton

We'd love to have your ideas, improvements and fixes.

[See the contribution guide for more information](./CONTRIBUTING.md).

## :building_construction: How to setup your project using this skeleton

1. Setup the codebase

Press the green 'Use this template' button on Github (see [Creating a repository from a template](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/creating-a-repository-on-github/creating-a-repository-from-a-template#creating-a-repository-from-a-template)). You will be prompted to create a new repository using project-skeleton as the initial commit.

```
# Checkout the new repo
git clone git@github.com:silverstripeltd/<yourproject>

# Change directory to your project
cd <yourproject>

# replace this readme file with project-skeleton readme
git mv -f README.md.dist README.md
```

2. Update the `README.md` file with project details

3. Configure the `.ddev/config.yaml` with project details.  
   Defining the `name` for the project is important, as it should not change in the lifespan of the project.  
   See the [documentation for more information on good naming practice](#computer-important-ddev-config-setup-notes).


4. Enable the project on CircleCI, and add the status badge to the README ([instructions](https://silverstripe.atlassian.net/wiki/spaces/DEV/pages/1626013805/How+to+setup+CircleCI+for+Project+Skeleton))

5. Enable the project on Codecov.io ([instructions](docs/code-coverage.md)) and any other services you wish to use

For more information see [How to start a new project (Sprint Zero)](https://silverstripe.atlassian.net/wiki/spaces/DEV/pages/938835975/How+to+start+a+new+project+Sprint+Zero) on confluence.


## :computer: DDEV setup
### Project naming
The `name:` field in `.ddev/config.yml` defines the name of the project.

This is used to label the project internally within DDEV. This value also will form the domain for your site, and is shared for all developers. It should be a single word or multiple words in snake-case, it should not contain spaces or special characters.


Please choose carefully! Whilst it is possible to change the name, [changing the name requires several steps](https://ddev.readthedocs.io/en/stable/users/usage/faq/#workflow) and will be disruptive to other developers working on the project.

Be mindful of possible collisions between projects.

#### Better names

- `nzqa-portal`
- `search-service-project-poc`


These examples clearly define client and/or project scope and are unique.

#### Not so good names:

- repo names when they don't make much sense (i.e. `tourism1`, `fenz007`)
- vague or generic names (e.g. `promo-site`, `backup`, `redesign` etc.)


## :octocat: Github repository setup

Consistent repository setup is important. Some things you should do with a new repo:

- [ ] Create and set the default branch, standard is `develop`.
- [ ] Disable unused features (wiki, issues, projects etc.).
- [ ] Set up your branches to be [deleted after merge](https://docs.github.com/en/github/administering-a-repository/managing-the-automatic-deletion-of-branches).
- [ ] Set the permissions properly, see [the matrix on how to setup Github permissions](https://silverstripe.atlassian.net/wiki/spaces/IS/pages/1270186089/Github#Access-Management-for-github.com%2Fsilverstripeltd).
- [ ] Set up branch protection rules for `develop` and `main`, typically this is to require a PR before merging and require at least 1 approval. Also require status checks to pass before merging, so branches with failing CI workflows cant be merged until they are fixed.
