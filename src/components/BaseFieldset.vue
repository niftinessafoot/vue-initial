<script setup>
const props = defineProps({
  legend: String,
  className: String,
});
</script>

<template>
  <fieldset :className="className">
    <legend v-if="legend">{{ legend }}</legend>
    <slot />
  </fieldset>
</template>

<style scope>
@import '@styles/base-fieldset.css';
</style>
