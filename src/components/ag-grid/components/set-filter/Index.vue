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
      @input="valueChanged"
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

      <template #option="{itemProps, itemEvents, opt}">
        <q-item v-bind="itemProps" v-on="itemEvents">
          <q-item-section side>
            <q-checkbox dense v-model="model" :val="opt.value" />
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-caption-3" caption>
              {{ opt.label }}
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
    options: [{ label: "All", value: null }],
    model: [{ label: "All", value: null }]
  }),

  computed: {
    colId() {
      return this.params.column.colId;
    }
  },

  methods: {
    onPopUpShow() {
      const instance = this.getFilterInstance();
      const values = instance.getValues();
      const mappedValues = values.map(val => ({ label: val, value: val }));
      this.options = [{ label: "All", value: null }, ...mappedValues];
    },

    valueChanged(newValues) {
      if (!newValues.length) this.applyFilter(null);
      else {
        const values = newValues.filter(val => val.value !== null);
        this.applyFilter(values.map(val => val.value));
      }
    },

    getFilterInstance() {
      return this.params.api.getFilterInstance(this.colId);
    },

    applyFilter(values) {
      const model = values ? { values } : null;
      const instance = this.getFilterInstance();
      instance.setModel(model);
      this.params.api.onFilterChanged();
      // const instance = this.getFilterInstance();
      // instance.setFilterValues(values);
      // instance.applyModel();
      // this.params.api.onFilterChanged();
    },

    onParentModelChanged(parentModel) {
      console.log(parentModel);
      if (!parentModel) this.model = { label: "All", value: null };
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
