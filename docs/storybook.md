# Storybook

## Overview

Storybook is an environment for developing UI components and allows us to maintain a library of components that can be shared between developers/teams.

See [Storybook documentation for more information](https://storybook.js.org/docs/vue/get-started/introduction).

## Getting started

To view Storybook run the following command.

```sh
yarn storybook
```

This will build everything required to deploy the story book and once done it will open a new browser window to view it.

Any changes that are made to components whilst this is running are automatically deployed.

## Using storybook for design reviews

To use storybook in design reviews you can run a static build of storybook by running the command: `yarn storybook:build` which will output the files into a directory named `storybook-static` in the root directory of the project. You can then zip this up and share it around, this allows you to share the zip file with a designer so they can perform a review of what you've created.

### Possible issues/notes

- If you develop a block and present it out of context of the rest of the site then it is likely that you'll need to make changes once it makes it to UAT and the designer looks at it.
- You might need to include some dist assets (e.g. images), for this you can update the command for storybook to include static files from a directory: `"storybook:build": "build-storybook -s themes/app/dist",`
- If you're using react then there's some notes at the bottom of the page
- This doesn't cover every design review scenario and especially for complex cases you might need to fall back to ngrok or more likely, deploying to UAT to perform the review

## Storybook Addons

The default setup for Storybook simply renders the component to the page. There are a number of addons that allow inclusion
of such things as component info, source code, component property summaries etc.
This skeleton project currently has the following addons installed for use:
- viewport: see the component in various screen sizes/orientations
- knobs: makes component properties dynamic so that you can play around and test different component states
- links: link stories together
- actions: inspect/document events relating to your component
- storybook-addon-vue-info: shows component information including description, story source and property table
- storybook/addon-a11y: Test component compliance with web accessibility standards.

NB: There seems to be a bug with the rendering of the addon tabs rendered in the bottom of the storybook page. Since we are currently using an alpha release, this will hopefully be resolved in the near future.

## Customising storybook

Some basic templates are included to allow for easy customisation of the Storybook interface.

`.storybook/manager-head.html` and `.storybook/preview-head.html` can be used to add code, e.g. custom styles or script to the `<head>` of the interface and preview window respectively.

`.storybook/theme.js` is included to make it easy to add a custom logo for your project.

See [the theming documentation](https://storybook.js.org/docs/react/configure/theming) for more information.

## File Structure

Components can first be developed in isolation from the SilverStripe site, using Storybook as a platform for verifying the components along with its various states.

New components will typically be placed in the `themes/app/src/js/components` directory. Whilst developing the component you can create a corresponding Storybook story in `/stories`.

### Static directories for loading assets in Storybook

The Storybook configuration has been updated to define some standard static directories which we use across projects.
* **/dist** which will find files in `<root>/themes/app/dist/`
* **/src** which will find files in `<root>/themes/app/src/`
* **/assets** which will find example files in `<root>/stories/assets/`

For example;

```html
<img src="/dist/icons/chev-down.svg" alt=""/>
```

Will load the image from `<root>/themes/app/dist/icons/chev-down.svg`.

### Directory aliases for loading components in Storybook

These are similar to the static directories above, but for when importing components in the stories themselves.
* **@dist** which will find files in `<root>/themes/app/dist/`
* **@src** which will find files in `<root>/themes/app/src/`
* **@assets** which will find example files in `<root>/stories/assets/`

For example;

```js
import Button from '@src/js/components/Button.vue';
```

Will load the component from `<root>/themes/app/src/components/Button.vue`.

## Example Story

```js
import { storiesOf } from '@storybook/vue';

import MyButton from '@src/js/components/MyButton.vue';
import '@dist/app.css';

storiesOf('Styleguide', module)
  .addDecorator((storyFn, context) => withInfo()(storyFn)(context))
  .add('Buttons', () => ({
    template: `
      <div>
        <button type="button" class="btn btn-primary">Primary</button>
        <button type="button" class="btn btn-secondary">Secondary</button>
        <button type="button" class="btn btn-success">Success</button>
        <button type="button" class="btn btn-danger">Danger</button>
        <button type="button" class="btn btn-warning">Warning</button>
        <button type="button" class="btn btn-info">Info</button>
        <button type="button" class="btn btn-light">Light</button>
        <button type="button" class="btn btn-dark">Dark</button>
        <button type="button" class="btn btn-link">Link</button>
      </div>
    `,
  }));
```

Starting with the 'storiesOf' function to define which 'chapter' to add the story to, specify any decorators(addons) you wish to apply to the story, and then add the story with the template required to define and render the documented component in the storybook page.

## Generating a static app for Storybook

You can also generate a static app for Storybook which could be useful if you need to demo it to a client or host it somewhere for easy reference.

```sh
yarn storybook:build
```

## Using storybook with react

You'll want to use `@storybook/html` as most of your templates will still be HTML.
For the react components, create a react decorator like so:

```js
import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import { useEffect, useMemo } from "@storybook/client-api";

const reactDecorator = (story, context) => {
  const node = useMemo(() => document.createElement("div"), [
    context.kind,
    context.name,
  ]);
  useEffect(() => () => ReactDOM.unmountComponentAtNode(node), [node]);
  ReactDOM.render(<StrictMode>{story()}</StrictMode>, node);
  return node;
};

export default () => reactDecorator;
```

Then in your story you can do the following:

```js
import React from "react";
import MyCustomComponent from "../themes/app/src/js/components/MyCustomComponent";
import reactDecorator from "../.storybook/react-decorator";

export default {
  title: "My custom component",
  decorators: [reactDecorator()],
};

export const Default = () => <MyCustomComponent />;
```

## Future Storybook development

There are currently limitations with Storybook in that React and Vue components have to be added to separate Storybooks (with Storybook/Vue and Storybook/React libraries) so the current storybook implementation focuses on Vue component development. There are plans for Storybook to address this in future releases, and to also allow inclusion of HTML snippets.

This would allow for the Styleguide and Welcome pages to be pure HTML files rather than the current necessity to wrap them into a Vue component.

## Removing Storybook

This skeleton project comes configured with Storybook installed. If it is not required as part of your project you can remove it as follows.

```sh
rm -rf .storybook/
rm -rf stories/
```

And remove the associated `scripts` and `devDependencies` from `package.json`.
