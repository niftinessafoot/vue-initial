<script setup>
import { ref } from 'vue';

const props = defineProps({
  label: String,
  id: String,
  data: Object,
  initValue: String,
  handleChange: Function,
  dataIndex: String | Number,
  context: String,
  className: String,
});

const selected = ref(props.initValue);
</script>

<template>
  <label :for="id" :className="className">
    <span>{{ label }}</span>
    <select
      @change="handleChange"
      :data-index="dataIndex"
      :id="id"
      :name="id"
      v-model="selected"
    >
      <option
        v-for="(rate, currency) in data"
        :value="currency"
        :key="currency"
      >
        {{ currency }}
      </option>
    </select>
    <aside v-if="context">{{ context }}</aside>
  </label>
</template>

<style scoped>
@import '@styles/base-select.css';
</style>
