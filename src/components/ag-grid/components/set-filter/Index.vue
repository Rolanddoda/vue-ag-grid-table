<template>
  <div class="set-filter cursor-pointer" @click="showFilter">
    <q-select
      :value="model"
      :options="options"
      dense
      hide-dropdown-icon
      outlined
      bg-color="white"
      style="pointer-events: none"
    >
      <template #append>
        <q-icon size="18px" name="keyboard_arrow_down"></q-icon>
      </template>

      <template #selected>
        <span class="text-caption-3" v-if="model.value">
          Filtered
        </span>
        <span class="text-caption-3" v-else>All</span>
      </template>
    </q-select>
  </div>
</template>

<script>
export default {
  name: "SetFilter",

  data: () => ({
    options: [{ label: "All", value: null }],
    model: { label: "All", value: null }
  }),

  methods: {
    showFilter() {
      this.params.showParentFilter();
    },

    onParentModelChanged(parentModel) {
      console.log(parentModel);
      if (!parentModel) this.model = { label: "All", value: null };
      else this.model.value = parentModel.values;
    }
  }
};
</script>

<style lang="scss" scoped>
.set-filter {
  ::v-deep .q-field__control {
    height: var(--filter-height);
    min-height: var(--filter-height) !important;
  }
}
</style>
