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
      <Avatar v-if="model.value" :color="model.color" :value="model.value" />
      <span v-else>All</span>
    </template>

    <template #option="{itemProps, itemEvents, opt}">
      <q-item v-bind="itemProps" v-on="itemEvents">
        <q-item-section>
          <q-item-label caption>{{ opt.label }}</q-item-label>
        </q-item-section>

        <q-item-section v-if="opt.value" avatar>
          <Avatar :color="opt.color" :value="opt.value" />
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script>
import Avatar from "./components/Avatar";

export default {
  name: "StatusColFilter",

  components: {
    Avatar
  },

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
      if (!parentModel) this.model = { label: "All", value: null };
      else this.model.value = parentModel.filter;
    }
  }
};
</script>
