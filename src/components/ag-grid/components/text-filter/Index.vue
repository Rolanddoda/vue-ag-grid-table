<template>
  <div class="text-filter">
    <q-input
      :value="model"
      :debounce="800"
      bg-color="white"
      dense
      outlined
      placeholder="search.."
      @input="valueChanged"
    >
      <template #append>
        <q-icon name="search" class="text-white-5"></q-icon>
      </template>
    </q-input>
  </div>
</template>

<script>
export default {
  name: "TextFilter",

  data: () => ({
    model: null
  }),

  methods: {
    valueChanged(newValue) {
      this.model = newValue;
      this.params.parentFilterInstance(function(instance) {
        instance.onFloatingFilterChanged("equals", newValue);
      });
    },

    onParentModelChanged(parentModel) {
      this.model = parentModel?.filter;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/styles/fonts.scss";

.text-filter {
  ::v-deep .q-field__control {
    height: var(--filter-height);
    min-height: var(--filter-height) !important;
    @extend .text-caption-3;
  }
}
</style>
