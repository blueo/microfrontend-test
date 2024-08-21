import "../themes/app/src/scss/app.scss";
import { initialize, mswLoader  } from 'msw-storybook-addon';

/**
 * Initialise mock service worker for API mocking
 * @see mswLoader config below for configuration example
 */
initialize();

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

/**
 * Add Mock Service Worker loader for API mocking
 *
 * @see https://msw-sb.vercel.app/?path=/docs/guides-getting-started--docs
 * @example <caption>Add handlers to your stories to mock API requests</caption>
 * export const StoryComponent = () => ({});
 * StoryComponent.parameters = {
 *     msw: {
 *      handlers: [
 *        // Import the 'rest' library and set up a POST request handler for a specific route.
 *        rest.post('/_search/*', (request, response, context) => {
 *           // Simulate a valid JSON response for a search request.
 *           const jsonResponse = "your valid JSON response here";
 *
 *           // Send the JSON response back to the client.
 *           response(context.json(jsonResponse));
 *        })
 *      ],
 *    }
 *  }
 */
export const loaders = [mswLoader];
