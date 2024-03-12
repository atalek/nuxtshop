import Product from '~/server/models/productSchema'

export default defineEventHandler(async event => {
  const products = await Product.find({})

  return products
})
