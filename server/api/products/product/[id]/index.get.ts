import Product from '~/server/models/productSchema'

export default defineEventHandler(async event => {
  const id = event.context.params?.id

  const product = await Product.findById(id)
  if (product) {
    return product
  } else {
    throw createError({
      statusCode: 404,
      statusMessage: 'Product with that ID does not exist',
    })
  }
})
