<script lang="ts" setup>
const props = defineProps({
  value: Number,
  text: String,
})

function getStarIcon(threshold: number): string {
  if (props.value! >= threshold) {
    return 'fa-solid:star'
  } else if (props.value! >= threshold - 0.5) {
    return 'fa-solid:star-half-alt'
  }
  return 'fa6-regular:star'
}
</script>

<template>
  <div class="rating">
    <span v-for="starIndex in 5" :key="starIndex">
      <Icon :name="getStarIcon(starIndex)" />
    </span>
    <span class="rating-text" v-if="text">{{ text }}</span>
  </div>
</template>

<style scoped></style>
