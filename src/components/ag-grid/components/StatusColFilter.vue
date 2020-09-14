<template>
  <q-select
    :value="model"
    dense
    outlined
    class="full-width"
    :options="options"
    @input="valueChanged"
  >
    <template #selected>
      <q-avatar
        v-if="model.value"
        size="20px"
        :style="{ background: model.color }"
        text-color="white"
      >
        {{ model.value }}
      </q-avatar>

      <span v-else>All</span>
    </template>

    <template #option="scope">
      <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
        <q-item-section>
          <q-item-label caption>{{ scope.opt.label }}</q-item-label>
        </q-item-section>

        <q-item-section v-if="scope.opt.value" avatar>
          <q-avatar
            size="20px"
            :style="{ background: scope.opt.color }"
            text-color="white"
          >
            {{ scope.opt.value }}
          </q-avatar>
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script>
export default {
  data: function() {
    return {
      model: { label: "All", value: null },
      options: [
        { label: "Accepted", value: "A", color: "#65b5a5" },
        { label: "Cancelled", value: "C", color: "#4f829e" },
        { label: "Pending", value: "P", color: "#DD9787" },
        { label: "All", value: null }
      ]
    };
  },
  methods: {
    valueChanged(newValue) {
      this.model = newValue;
      this.params.parentFilterInstance(function(instance) {
        instance.onFloatingFilterChanged("equals", newValue.value);
      });
    },

    onParentModelChanged(parentModel) {
      console.log("CALLEd", parentModel);
      // note that the filter could be anything here, but our purposes we're assuming a greater than filter only,
      // so just read off the value and use that
      if (!parentModel) this.model = { label: "All", value: null };
      else this.model.value = parentModel.filter;
    }
  }
};
</script>
