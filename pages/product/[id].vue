<script setup lang="ts">
import { useCartStore } from '~/stores/cart'
import { useAuthStore } from '~/stores/auth'
import { toast } from 'vue3-toastify'
import { useProductStore } from '~/stores/products'
import type { ProductType } from '~/types'

const cartStore = useCartStore()
const authStore = useAuthStore()

const route = useRoute()
const productId = route.params.id as string

const productStore = useProductStore()
await productStore.fetchProduct(productId)

const product = computed(() => productStore.product as ProductType)

const rating = ref(0)
const comment = ref('')

async function createReview() {
  if (rating.value === 0) {
    toast.error('Please select a rating!')
  } else if (!comment.value.trim()) {
    toast.error('Please write a comment!')
  } else {
    const reviewData = {
      // @ts-ignore
      rating: Number(rating.value[0]),
      comment: comment.value,
    }
    try {
      await productStore.createReview(productId, reviewData)

      await productStore.fetchProduct(productId)
      toast.success('Review created')
      rating.value = 0
      comment.value = ''
    } catch (error: any) {
      toast.error(error.data.message)
    }
  }
}
</script>

<template>
  <div>
    <Title>{{ product.name }}</Title>

    <div>
      <NuxtLink to="/" class="btn btn-light mb-3">Go Back</NuxtLink>

      <div class="row">
        <div class="col-md-5">
          <NuxtImg
            provider="cloudinary"
            :src="product?.image"
            :alt="`image of ${product.name}`"
            class="img-fluid rounded w-100" />
        </div>
        <div class="col-md-4">
          <ul class="list-group list-group-flush">
            <li class="list-group-item single-product">
              <h3>
                {{ product?.name }}
              </h3>
            </li>

            <li class="list-group-item">
              <Rating
                :value="product?.rating"
                :text="`${product?.numReviews} reviews`" />
            </li>
            <li class="list-group-item">Price: ${{ product.price }}</li>
            <li class="list-group-item">
              Description: {{ product.description }}
            </li>
          </ul>
        </div>

        <div class="col-md-3">
          <div class="card">
            <ul class="list-group list-group-flush">
              <li class="list-group-item">
                <div class="row">
                  <div class="col">Price:</div>
                  <div class="col">
                    <strong>${{ product.price }}</strong>
                  </div>
                </div>
              </li>
              <li class="list-group-item">
                <div class="row">
                  <div class="col">Status:</div>
                  <div class="col">
                    <strong>{{
                      product.countInStock! > 0 ? 'In Stock' : 'Out of stock'
                    }}</strong>
                  </div>
                </div>
              </li>

              <li class="list-group-item">
                <button
                  class="btn btn-block btn-primary w-100"
                  :disabled="product.countInStock === 0"
                  @click="cartStore.addItem(product!)">
                  Add to cart
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="row review">
        <div class="col-md-6">
          <h2>Reviews</h2>
          <p
            class="my-4 alert alert-primary"
            role="alert"
            v-show="product?.reviews?.length === 0">
            No Reviews
          </p>
          <div class="list-group list-group flush">
            <div
              class="list-group-item"
              v-for="review in product.reviews"
              :key="review._id?.toString()">
              <strong>{{ review.name }}</strong>
              <Rating :value="review.rating" />
              <p>{{ review.createdAt?.substring(0, 10) }}</p>
              <p>{{ review.comment }}</p>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="list-group-item" v-if="authStore.userInfo !== undefined">
            <h2>Write a review</h2>
            <form @submit.prevent="createReview">
              <div class="form-group my-2" id="rating">
                <label for="rating" class="form-label">Pick a rating</label>
                <select class="form-control" v-model="rating">
                  <option>1 - Poor</option>
                  <option>2 - Fair</option>
                  <option>3 - Good</option>
                  <option>4 - Very Good</option>
                  <option>5 - Excellent</option>
                </select>
              </div>
              <div class="form-group my-2">
                <label for="comment" class="form-label">Leave a comment</label>
                <textarea
                  placeholder="Enter comment"
                  v-model="comment"
                  name="comment"
                  id="comment"
                  class="form-control"
                  rows="3">
                </textarea>
              </div>
              <button type="submit" class="btn btn-primary w-100">
                Submit
              </button>
            </form>
          </div>
          <div v-else>
            Please <NuxtLink to="/login">sign in</NuxtLink> to write a review
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
