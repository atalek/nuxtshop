import Product from '~/server/models/productSchema'

// Create product
// Admin route

export default defineEventHandler(async event => {
  const user = event.context.user

  if (user && user.isAdmin) {
    const product = new Product({
      name: 'Sample name',
      price: 0,
      user: user,
      image: 'sample_kb2zbe.jpg',
      brand: 'Sample brand',
      category: 'Sample category',
      countInStock: 0,
      numReviews: 0,
      description: 'Sample description',
    })
    const createdProduct = await product.save()
    return createdProduct
  } else {
    throw createError({
      statusCode: 403,
      statusMessage: 'Access denied,not an admin',
    })
  }
})
