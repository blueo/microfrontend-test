import FlyoutPanel from "../themes/app/src/js/components/FlyoutPanel/FlyoutPanel.vue";

export default {
  title: 'Components/Flyout Panel',
};

export const FlyoutPanelStory = (args) => ({
  setup() { return args },
  components: { FlyoutPanel },
  template: `<div>
      <button class="btn btn-primary" @click="mobileMenuOpen = true">Open {{direction}}</button>
      <flyout-panel
        :slideFrom="direction"
        :open="mobileMenuOpen"
        @close="mobileMenuOpen = !mobileMenuOpen"
      >
        <h1>Flyout Panel</h1>
        <p>Slides in from the {{direction}}</p>
      </flyout-panel>
    </div>`,
  data() {
    return {
      mobileMenuOpen: false,
    };
  },
});

FlyoutPanelStory.args = {
  direction: 'right',
}
