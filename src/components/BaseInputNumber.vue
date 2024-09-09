<script setup>
const props = defineProps({
  label: String,
  id: String,
  className: String,
  context: String,
  min: String,
  max: String,
});
const model = defineModel();

function handleUpdate(evt) {
  const { value = '' } = evt?.target;

  model.value = value;
}
</script>

<template>
  <label :for="id" :className="className">
    <span>{{ label }}</span>
    <input
      type="number"
      :max="max"
      :min="min"
      :id="id"
      :value="modelValue"
      @keyup="handleUpdate"
    />
    <aside v-if="context">{{ context }}</aside>
  </label>
</template>

<style scoped>
@import '@styles/base-input.css';
</style>
