<template>
  <div class="set-filter">
    <q-select
      :value="model"
      :options="options"
      multiple
      dense
      hide-dropdown-icon
      outlined
      bg-color="white"
      @input="applyFilter"
      @popup-show="onPopUpShow"
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

      <template #no-option>
        <q-item>
          <q-item-section class="text-italic text-grey">
            No options
          </q-item-section>
        </q-item>
      </template>

      <template #before-options>
        <q-item clickable @click="handleAllOptionClick">
          <q-item-section side>
            <q-checkbox
              dense
              :value="areAllOptionsSelected"
              :val="null"
              @click="handleAllOptionClick"
            />
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-caption-3" caption>
              All
            </q-item-label>
          </q-item-section>
        </q-item>
      </template>

      <template #option="{itemProps, itemEvents, opt}">
        <q-item v-bind="itemProps" v-on="itemEvents">
          <q-item-section side>
            <q-checkbox dense :value="model" :val="opt" @input="applyFilter" />
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-caption-3" caption>
              {{ opt }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </template>
    </q-select>
  </div>
</template>

<script>
export default {
  name: "SetFilter",

  data: () => ({
    options: [],
    model: []
  }),

  computed: {
    colId() {
      return this.params.column.colId;
    },

    areAllOptionsSelected() {
      return this.model.length === this.options.length;
    }
  },

  methods: {
    onPopUpShow() {
      const instance = this.getFilterInstance();
      this.options = instance.getValues();
      if (!this.model.length) this.model = instance.getValues();
    },

    getFilterInstance() {
      return this.params.api.getFilterInstance(this.colId);
    },

    handleAllOptionClick() {
      if (this.areAllOptionsSelected) this.applyFilter([]);
      else this.applyFilter(null);
    },

    applyFilter(values) {
      const model = values ? { values } : null;
      const instance = this.getFilterInstance();
      instance.setModel(model);
      this.params.api.onFilterChanged();
    },

    onParentModelChanged(parentModel) {
      if (!parentModel) this.model = this.options.slice();
      else this.model = parentModel.values;
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
