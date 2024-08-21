import { createApp, defineAsyncComponent } from "vue";
import { createStore } from "vuex";
import MegaNav from "./components/MegaNav.vue";
import FlyoutPanel from './components/FlyoutPanel/FlyoutPanel.vue';

const RootApp = {
  /**
   * Synchronous components
   *
   * These components are part of the main app.js bundle so will
   * load with the page load. This is ideal for components used on every
   * page and/or 'above the fold'. If your component can wait to load later
   * use the Async component api below. If you are unsure which place to put
   * your component use this one but note it will increase the size of app.js
   *
   * to use - import your component above and add it to the components object
   * @example
   *
   * import MyComponent from './components/MyComponent'
   * // ...
   * components: {
   *  MyComponent,
   * },
   * // ...
   */
  components: {
    FlyoutPanel,
  },
  mixins: [MegaNav],
  data() {
    return {
      mobileMenuOpen: false,
    };
  },
  methods: {
    closeMobileMenu() {
      this.mobileMenuOpen = false;
    },
    openMobileMenu() {
      this.mobileMenuOpen = true;
    },
  },
};

const app = createApp(RootApp);

/**
 * Add Async components
 *
 * These components will only load when rendered. It is
 * ideal for components that aren't used on every page or aren't
 * "above the fold" as their JS is downloaded at a lower priority
 *
 * @see https://vuejs.org/guide/components/async.html
 */
const asyncComponents = [
  ['TabGroup', 'Tabs/TabGroup.vue'],
  ['TabItem', 'Tabs/TabItem.vue'],
];

asyncComponents.forEach(([component, componentPath]) => {
  app.component(component, defineAsyncComponent(() =>
    // note must be within a known path: https://github.com/webpack/webpack/issues/6680
    import(`./components/${componentPath}`)
  ));
});

app.mount("#app");

/**
 * Enable and setup Vuex
 *
 * This should be used when we need to share state amongst components or actions
 * occur across components.
 */
const store = createStore({
  state: {},

  getters: {},

  /* eslint-disable no-param-reassign */
  mutations: {},
  /* eslint-enable no-param-reassign */

  actions: {},
});

app.use(store);
