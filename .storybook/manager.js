import { addons } from '@storybook/manager-api';
import Theme from './theme';

/**
 * Configure the Storybook manager interface
 *
 * @see https://storybook.js.org/docs/react/configure/features-and-behavior
 */
addons.setConfig({
  theme: Theme,
});
