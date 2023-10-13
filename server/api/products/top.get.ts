import Product from '~/server/models/productSchema'

export default defineEventHandler(async event => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3)

  return products
})
