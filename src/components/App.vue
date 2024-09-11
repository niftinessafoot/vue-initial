<script setup>
import { ref, computed, watchEffect } from 'vue';
import CONFIG from '@/config.json';
import { default as BaseInputNumber } from '@components/BaseInputNumber.vue';
import { default as BaseSelect } from '@components/BaseSelect.vue';
import { default as BaseFieldset } from '@components/BaseFieldset.vue';
import { default as AppReport } from '@components/AppReport.vue';
import { useFetch } from '@composables/useFetch';
import { formatPercentage } from '@scripts/format';

const allocations = ref(CONFIG.initialState);
const textInput = ref(CONFIG.initialBudget);
const rates = ref({});
const reportData = computed(() => {
  const { value: currentRates } = rates;

  return allocations.value.map(({ allocation, currency }) => {
    return {
      rate: currentRates[currency],
      allocation,
      currency,
    };
  });
});

function handleSelectChange(evt) {
  const { target } = evt;
  const { value, dataset } = target;
  const index = parseInt(dataset.index, 10);

  if (index >= 0) {
    const newState = [...allocations.value];
    newState[index].currency = value;

    allocations.value = newState;
  }
}

watchEffect(async () => {
  const { data } = await useFetch({
    url: CONFIG.apiEndpoint,
  });

  rates.value = data?.rates;
});
</script>

<template>
  <BaseFieldset legend="Investable Assets" className="app-set-investment">
    <BaseInputNumber
      v-model="textInput"
      id="txtInvestment"
      label="Budget"
      className="app-investment"
      context="Currency in USD"
      min="0"
  /></BaseFieldset>

  <BaseFieldset legend="Allocations" class="app-set-allocations">
    <template
      v-for="({ allocation, currency }, index) in allocations"
      :key="`sel-${index}`"
    >
      <BaseSelect
        :label="`${formatPercentage(allocation)} of Investment`"
        :data="rates"
        :init-value="currency"
        :id="`sel-${index}`"
        :handle-change="handleSelectChange"
        :data-index="index"
        :context="`Current Rate: ${rates[currency]}`"
        :className="`allocation-${currency.toLowerCase()}`"
      />
    </template>
  </BaseFieldset>
  <AppReport :budget="textInput" :data="reportData" className="app-report" />
</template>

<style>
@import '@styles/global.css';
@import '@styles/app.css';
</style>
