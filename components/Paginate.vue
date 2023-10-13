<script setup>
defineProps({
  pages: Number,
  page: Number,
  keyword: { String, default: '' },
  isAdmin: { Boolean, default: false },
})

defineEmits(['change'])
</script>

<template>
  <nav aria-label="Page navigation">
    <div class="pagination mt-3" v-if="pages > 1">
      <button
        v-for="pageNumber in pages"
        :key="pageNumber"
        :class="{ active: pageNumber === page }"
        class="page-item page-link"
        @click="$emit('change', pageNumber)"
      >
        {{ pageNumber }}
      </button>
    </div>
  </nav>
</template>
