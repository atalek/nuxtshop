<script lang="ts" setup>
import { useCartStore } from '~/stores/cart'
import { useAuthStore } from '~/stores/auth'
import { toast } from 'vue3-toastify'

const cartStore = useCartStore()
const authStore = useAuthStore()

async function logoutHandler() {
  try {
    authStore.logout()
    cartStore.clear()
  } catch (error: any) {
    toast.error(error.statusMessage)
  }
}

const route = useRoute()

const isLinkActive = (to: string) => {
  return computed(() => route.path === to).value
}

const isAdminActive = computed(() => {
  return route.path.startsWith('/admin')
})
</script>

<template>
  <header>
    <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
      <div class="container">
        <NuxtLink class="navbar-brand" href="/">
          <img
            src="~/assets/nuxt.png"
            alt="nuxtshop logo"
            style="width: 40px; height: 40px"
          />
          <span style="color: rgb(67, 238, 67); margin-left: 5px">Nuxt</span
          >Shop
        </NuxtLink>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <NuxtLink
                class="nav-link"
                :class="{ active: isLinkActive('/cart') }"
                aria-current="page"
                to="/cart"
              >
                <Icon name="fa6-solid:cart-shopping" />
                Cart
                <span v-show="cartStore.totalCount > 0" class="cart-count">{{
                  cartStore.totalCount
                }}</span>
              </NuxtLink>
            </li>

            <li
              class="nav-item dropdown"
              v-if="
                authStore.userInfo && Object.keys(authStore.userInfo).length > 0
              "
            >
              <div class="dropdown">
                <div
                  class="nav-link dropdown-toggle"
                  id="user-profile-navbarDropdownMenuLink"
                  data-bs-toggle="dropdown"
                  style="cursor: pointer"
                  :class="{ active: isLinkActive('/profile') }"
                >
                  {{ authStore.userInfo.name }}
                </div>
                <ul
                  class="dropdown-menu"
                  aria-labelledby="user-profile-navbarDropdownMenuLink"
                >
                  <li>
                    <NuxtLink class="dropdown-item" to="/profile"
                      >Profile</NuxtLink
                    >
                  </li>
                  <li>
                    <NuxtLink
                      class="dropdown-item"
                      @click="logoutHandler"
                      to="/"
                      >Logout</NuxtLink
                    >
                  </li>
                </ul>
              </div>
            </li>

            <li class="nav-item" v-else>
              <NuxtLink
                class="nav-link"
                to="/login"
                :class="{ active: isLinkActive('/login') }"
                ><Icon name="fa6-solid:user" />Sign in</NuxtLink
              >
            </li>
            <div
              class="dropdown"
              v-show="authStore.userInfo && authStore.userInfo.isAdmin"
            >
              <div
                :class="{ active: isAdminActive }"
                class="nav-link dropdown-toggle"
                id="admin-pannel-navbarDropdownMenuLink"
                data-bs-toggle="dropdown"
                style="cursor: pointer"
              >
                Admin
              </div>
              <ul
                class="dropdown-menu"
                aria-labelledby="admin-pannel-navbarDropdownMenuLink"
              >
                <li>
                  <NuxtLink class="dropdown-item" to="/admin/productlist"
                    >Products</NuxtLink
                  >
                </li>
                <li>
                  <NuxtLink class="dropdown-item" to="/admin/userlist"
                    >Users</NuxtLink
                  >
                </li>
                <li>
                  <NuxtLink class="dropdown-item" to="/admin/orderlist"
                    >Orders</NuxtLink
                  >
                </li>
              </ul>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.cart-count {
  color: white;
  height: 25px;
  width: 23px;
  background-color: #0a8e4a;
  margin-right: 3px;
  border-radius: 50%;
  display: inline-block;
  text-align: center;
}

.nav-link.active {
  color: rgb(67, 238, 67);
}
</style>
