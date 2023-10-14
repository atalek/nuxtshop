<script lang="ts" setup>
import { toast } from 'vue3-toastify'
import { useAuthStore } from '~/stores/auth'
import { useProductStore } from '~/stores/products'

const config = useRuntimeConfig().public

const authStore = useAuthStore()
const productStore = useProductStore()

const route = useRoute()
const productId = route.params.id as string

await productStore.fetchProduct(productId)
const product = computed(() => productStore.product)

const name = ref('')
const price = ref(0)
const image = ref('')
const brand = ref('')
const category = ref('')
const countInStock = ref(0)
const description = ref('')

async function updateProduct() {
  if (authStore.userInfo.isAdmin) {
    const updateData = [
      name.value,
      price.value,
      image.value,
      brand.value,
      category.value,
      countInStock.value,
      description.value,
    ]

    try {
      await productStore.updateProduct(productId, updateData)
      navigateTo('/admin/productlist')
    } catch (error: any) {
      toast.error(error.statusMessage)
    }
  }
}

const widget = window.cloudinary.createUploadWidget(
  {
    cloud_name: config.cloudinaryName,
    upload_preset: config.cloudinaryFolder,
    multiple: false,
    maxFiles: 1,
    clientAllowedFormats: ['png', 'jpg', 'jpeg', 'webp'],
  },
  (error, result) => {
    if (!error && result && result.event === 'success') {
      const path = result.info.path
      const filename = path.split('/').pop()
      image.value = filename
    }
  }
)

function openUploadWidget() {
  widget.open()
}

watchEffect(async () => {
  if (!authStore.userInfo || !authStore.userInfo.isAdmin) {
    navigateTo('/')
  }

  if (product) {
    name.value = product.value.name
    price.value = product.value.price
    image.value = product.value.image
    brand.value = product.value.brand
    category.value = product.value.category
    countInStock.value = product.value.countInStock
    description.value = product.value.description
  }
})
</script>

<template>
  <Title>{{ `${product.name} | Edit` }}</Title>

  <NuxtLink to="/admin/productlist" class="btn btn-light my-3"
    >Go Back</NuxtLink
  >

  <FormContainer>
    <h2>Edit Product</h2>
    <form @submit.prevent="updateProduct">
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
        <label for="price" class="form-label">Price:</label>
        <input
          placeholder="Enter price"
          v-model="price"
          type="number"
          step=".01"
          price="price"
          id="price"
          class="form-control"
        />
      </div>

      <div class="form-group my-2">
        <label for="image" class="form-label">Image:</label>
        <input
          placeholder="Enter image url"
          v-model="image"
          type="text"
          image="image"
          id="image"
          class="form-control"
        />
      </div>
      <div class="form-group my-2">
        <label for="file" class="form-label">Choose File:</label>
        <input
          placeholder="Choose file"
          type="file"
          id="file"
          class="form-control"
          @click.prevent="openUploadWidget"
        />
      </div>
      <div class="form-group my-2">
        <label for="brand" class="form-label">Brand:</label>
        <input
          placeholder="Enter brand"
          v-model="brand"
          type="text"
          brand="brand"
          id="brand"
          class="form-control"
        />
      </div>
      <div class="form-group my-2">
        <label for="category" class="form-label">Category:</label>
        <input
          placeholder="Enter category"
          v-model="category"
          type="text"
          category="category"
          id="category"
          class="form-control"
        />
      </div>
      <div class="form-group my-2">
        <label for="countInStock" class="form-label">Count In Stock:</label>
        <input
          placeholder="Enter countInStock"
          v-model="countInStock"
          type="number"
          countInStock="countInStock"
          id="countInStock"
          class="form-control"
        />
      </div>
      <div class="form-group my-2">
        <label for="description" class="form-label">Description:</label>
        <textarea
          placeholder="Enter description"
          v-model="description"
          name="description"
          id="description"
          class="form-control"
          rows="4"
        >
        </textarea>
      </div>
      <button type="submit" class="btn btn-primary my-2">Update</button>
    </form>
  </FormContainer>
</template>

<style scoped></style>
