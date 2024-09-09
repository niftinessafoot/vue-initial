<script setup>
import { ref, watchEffect } from 'vue';
import CONFIG from '@/config.json';
import {
  formatCurrency,
  formatDecimal,
  formatPercentage,
} from '@scripts/format';

const props = defineProps({
  data: Array,
  budget: Number | String,
  className: String,
});

const formattedBudget = ref();
const formattedData = ref();

function generateFormattedData(data, budget) {
  return data.map((ele) => {
    const { allocation, currency, rate } = ele;
    const value = allocation * budget * rate;

    return {
      value: formatDecimal(value, CONFIG.fractional), // This is a big assumption based on understanding of fractional cryptocurrency.
      currency,
      allocation: formatPercentage(allocation),
    };
  });
}

watchEffect(async () => {
  formattedBudget.value = formatCurrency(props.budget);
  formattedData.value = generateFormattedData(props.data, props.budget);
});
</script>

<template>
  <article :className="className">
    <h4 className="report-headline">Investment: {{ formattedBudget }}</h4>
    <header className="report-header">
      <span>Currency</span>
      <span>Units</span>
      <span>Allocation</span>
    </header>
    <section
      v-for="{ currency, value, allocation } in formattedData"
      className="report-allocation"
    >
      <span>
        {{ currency }}
      </span>
      <span>
        {{ value }}
      </span>
      <span>
        {{ allocation }}
      </span>
    </section>
  </article>
</template>

<style scoped>
@import '@styles/app-report.css';
</style>
