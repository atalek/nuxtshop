<script lang="ts" setup>
import { toast } from 'vue3-toastify'
import { useAuthStore } from '~/stores/auth'
import { useAdminStore } from '~/stores/admin'

const authStore = useAuthStore()
const adminStore = useAdminStore()

const page = ref(1)

const { data, error, refresh } = await useAsyncData(
  'users',
  () =>
    $fetch(`/api/users/admin/${page.value}`, {
      params: {
        page: page.value,
      },
    }),
  { watch: [page] }
)

function refetch(pageNumber: number) {
  page.value = pageNumber
}

async function deleteHandler(userId: string) {
  if (authStore.userInfo.isAdmin) {
    try {
      await adminStore.deleteUser(userId)
      refresh()
      toast.success('User deleted')
    } catch (error) {
      toast.error('Cannot delete an admin user!')
    }
  }
}

watchEffect(() => {
  if (error.value && error.value.statusCode === 403) {
    authStore.logout()
  }
  if (!authStore.userInfo || !authStore.userInfo.isAdmin) {
    navigateTo('/login')
  }
})
</script>

<template>
  <Title>{{ 'Users | Admin' }}</Title>

  <div class="row align-items-center">
    <div class="col">
      <h1>Users</h1>
    </div>
  </div>
  <div class="table-responsive">
    <table class="table table-striped responsive">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">NAME</th>
          <th scope="col">EMAIL</th>
          <th scope="col">ADMIN</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in data!.users" :key="user._id">
          <th scope="row">{{ user._id }}</th>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>
            <template v-if="user.isAdmin">
              <Icon name="ic:baseline-check" style="color: green" />
            </template>

            <template v-else>
              <Icon name="heroicons-solid:x" style="color: red" />
            </template>
          </td>
          <td>
            <NuxtLink :to="`/admin/user/${user._id}`">
              <button class="btn btn-light btn-sm mx-2">
                <Icon name="fa6-solid:pen-to-square" />
              </button>
            </NuxtLink>
          </td>
          <td>
            <button
              class="btn btn-danger btn-sm mx-2"
              @click="deleteHandler(user._id)"
            >
              <Icon style="color: white" name="bi:trash-fill" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <Paginate @change="refetch" :pages="data!.pages" :page="page" />
  </div>
</template>

<style scoped></style>
