<script lang="ts" setup>
import { useAuthStore } from '~/stores/auth'
import { toast } from 'vue3-toastify'
import { RouteLocationRaw } from '#vue-router'

const authStore = useAuthStore()

const route = useRoute()
const sp = route.query.redirect
const redirect = sp || '/'

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

async function submitHandler() {
  if (password.value !== confirmPassword.value) {
    toast.error('The passwords do not match!')
  } else {
    const data = {
      name: name.value.trimEnd(),
      email: email.value.trim(),
      password: password.value.trim(),
    }
    try {
      const res = await authStore.register(data)
      if (res) {
        navigateTo(redirect as RouteLocationRaw)
      }
    } catch (error: any) {
      toast.error(error.data.message)
    }
  }
}

function isLoggedIn() {
  if (authStore.userInfo) {
    return navigateTo(redirect as RouteLocationRaw)
  }
}
isLoggedIn()

async function register2() {
  const data = {
    name: name.value.trimEnd(),
    email: email.value.trim(),
    password: password.value.trim(),
  }
  const res = await $fetch('/api/v2/auth/register', {
    method: 'POST',
    body: data,
  })
}
</script>

<template>
  <div>
    <Title>{{ 'Register' }}</Title>
    <FormContainer>
      <h1>Register</h1>
      <form @submit.prevent="register2">
        <div class="form-group my-2">
          <label for="name" class="form-label">Name:</label>
          <input
            type="name"
            placeholder="Enter Name"
            v-model="name"
            name="name"
            id="name"
            class="form-control" />
        </div>
        <div class="form-group my-2">
          <label for="email" class="form-label">Email Address:</label>
          <input
            type="email"
            placeholder="Enter email"
            v-model="email"
            name="email"
            id="email"
            class="form-control" />
        </div>

        <div class="form-group my-2">
          <label for="password" class="form-label">Password:</label>
          <input
            type="password"
            placeholder="Enter password"
            v-model="password"
            name="password"
            id="password"
            class="form-control" />
        </div>
        <div class="form-group my-2">
          <label for="confirm-password" class="form-label"
            >Confirm Password:</label
          >
          <input
            type="password"
            placeholder="Confirm password"
            v-model="confirmPassword"
            name="confirm-password"
            id="confirm-password"
            class="form-control" />
        </div>

        <button
          type="submit"
          class="btn btn-primary mt-2 w-100"
          :disabled="!name || !email || !password || !confirmPassword">
          Register
        </button>
      </form>

      <div class="row py-3">
        <div class="col">
          Already have an account ?
          <NuxtLink :to="redirect ? `/login?redirect=${redirect}` : '/login'"
            >Sign In</NuxtLink
          >
        </div>
      </div>
    </FormContainer>
  </div>
</template>
