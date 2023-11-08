<script lang="ts" setup>
const keyword = ref('')

function handleSearch() {
  if (keyword) {
    navigateTo(`/search/${keyword.value.trim()}`)
    keyword.value = ''
  } else {
    navigateTo('/')
  }
}
</script>

<template>
  <form @submit.prevent="handleSearch" class="d-flex">
    <div class="mr-sm-2 ml-sm-5">
      <input
        placeholder="Search products..."
        type="text"
        v-model="keyword"
        name="q"
        id="search"
        class="form-control"
      />
    </div>
    <button type="submit" class="btn btn-outline-success text-white p-2 mx-2">
      Search
    </button>
  </form>
</template>

<style scoped></style>
