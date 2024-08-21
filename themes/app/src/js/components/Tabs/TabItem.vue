<template>
  <div
    v-show="isActive"
    role="tabpanel"
    :aria-hidden="!isActive"
    :id="computedId"
    ref="tab"
  >
    <slot />
  </div>
</template>

<script>
import { inject, onBeforeMount, ref, watch } from 'vue';

export default {
  name: 'tab-item',
  props: {
    id: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const isActive = ref(false);
    const tabsProvider = inject('tabsProvider');
    const header = props.name; // eslint-disable-line
    const computedId = props.id
      ? props.id
      : props.name.toLowerCase().replace(/ /g, '-');
    const hash = `#${computedId}`;

    watch(
      () => tabsProvider.activeTabHash,
      () => {
        isActive.value = hash === tabsProvider.activeTabHash;
      },
    );

    onBeforeMount(() => {
      tabsProvider.tabs.push({
        name: props.name,
        header,
        hash,
        index: tabsProvider.tabs.length,
      });
    });

    return {
      header,
      computedId,
      hash,
      isActive,
    };
  },
};
</script>
