import Product from '~/server/models/productSchema'

export default defineEventHandler(async event => {
  const user = event.context.user

  const id = event.context.params?.id

  const body = await readBody(event)

  const [name, price, image, brand, category, countInStock, description] = body

  if (user && user.isAdmin) {
    const product = await Product.findById(id)

    if (product) {
      product.name = name || product.name
      product.price = price || product.price
      product.image = image || product.image
      product.brand = brand || product.brand
      product.category = category || product.category
      product.countInStock = countInStock || product.countInStock

      product.description = description || product.description

      const updatedProduct = await product.save()

      return updatedProduct
    } else {
      throw createError({
        statusCode: 404,
        statusMessage: 'Product with that ID does not exist',
      })
    }
  } else {
    throw createError({
      statusCode: 403,
      statusMessage: 'Access denied,not an admin',
    })
  }
})
