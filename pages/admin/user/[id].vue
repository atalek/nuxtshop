<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
import { useAdminStore } from '~/stores/admin'
import { toast } from 'vue3-toastify'

const authStore = useAuthStore()
const adminStore = useAdminStore()

const route = useRoute()
const userId = route.params.id as string

await adminStore.fetchSingleUser(userId)
const user = computed(() => adminStore.user)

const name = ref('')
const email = ref('')
const isAdmin = ref(false)

async function updateUser() {
  if (authStore.userInfo.isAdmin) {
    const updateData = {
      name: name.value,
      email: email.value,
      isAdmin: isAdmin.value,
    }
    try {
      await adminStore.updateUser(userId, updateData)
      navigateTo(`/admin/userlist`)
    } catch (error: any) {
      toast.error(error.data.message)
    }
  }
}

watchEffect(async () => {
  if (!authStore.userInfo || !authStore.userInfo.isAdmin) {
    navigateTo('/')
  }
  if (user) {
    name.value = user.value.name
    email.value = user.value.email
    isAdmin.value = user.value.isAdmin as boolean
  }
})
</script>

<template>
  <Title>{{ `${name} | Edit ` }}</Title>

  <NuxtLink to="/admin/userlist" class="btn btn-light my-3">Go Back</NuxtLink>
  <FormContainer>
    <h2>Edit user</h2>
    <form @submit.prevent="updateUser">
      <div class="form-group my-2">
        <label for="name" class="form-label">Name:</label>
        <input
          placeholder="Enter name"
          v-model="name"
          type="text"
          name="name"
          id="name"
          class="form-control"
        />
      </div>
      <div class="form-group my-2">
        <label for="email" class="form-label">Email:</label>
        <input
          placeholder="Enter email"
          v-model="email"
          type="email"
          email="email"
          id="email"
          class="form-control"
        />
      </div>

      <div class="form-check my-2">
        <input
          class="form-check-input"
          type="checkbox"
          v-model="isAdmin"
          true-value="true"
          false-value="false"
          id="flexCheckDefault"
        />
        <label class="form-check-label" for="flexCheckDefault"> Admin </label>
      </div>
      <button type="submit" class="btn btn-primary my-2">Update</button>
    </form>
  </FormContainer>
</template>
