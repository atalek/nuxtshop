<script lang="ts" setup>
import { useAuthStore } from '~/stores/auth'
import { toast } from 'vue3-toastify'
import { RouteLocationRaw } from '#vue-router'

const authStore = useAuthStore()

const route = useRoute()
const sp = route.query.redirect
const redirect = sp || '/'

const email = ref('')
const password = ref('')

async function submitHandler() {
  const data = {
    email: email.value,
    password: password.value,
  }
  try {
    const res = await authStore.login(data)
    if (res && res._id) {
      navigateTo(redirect as RouteLocationRaw)
    }
  } catch (error: any) {
    toast.error('Invalud username or passsword')
  }
}

const isLoggedIn = () => {
  if (authStore.userInfo && Object.keys(authStore.userInfo).length > 0) {
    navigateTo(redirect as RouteLocationRaw)
  }
}

isLoggedIn()
</script>

<template>
  <Title>{{ 'Log in' }}</Title>

  <FormContainer>
    <h1>Sign in</h1>
    <form @submit.prevent="submitHandler">
      <div class="form-group my-2">
        <label for="email" class="form-label">Email Address:</label>
        <input
          placeholder="Enter email"
          v-model="email"
          type="email"
          name="email"
          id="email"
          class="form-control"
        />
      </div>

      <div class="form-group my-2">
        <label for="password" class="form-label">Password:</label>
        <input
          type="password"
          placeholder="Enter password"
          v-model="password"
          name="password"
          id="password"
          class="form-control"
        />
      </div>

      <button
        type="submit"
        class="btn btn-primary mt-2 w-100"
        :disabled="!email || !password"
      >
        Sign In
      </button>
    </form>

    <div class="row py-3">
      <div class="col">
        New Customer ? <NuxtLink to="/register">Register</NuxtLink>
      </div>
    </div>
  </FormContainer>
</template>

<style scoped></style>
