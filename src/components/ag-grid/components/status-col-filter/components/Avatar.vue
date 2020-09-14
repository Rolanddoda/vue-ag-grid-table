<template>
  <q-avatar size="20px" :style="{ background: color }" text-color="white">
    <span class="text-button-big"> {{ value }}</span>
  </q-avatar>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      required: true
    },

    value: {
      type: String,
      required: true
    }
  }
};
</script>
