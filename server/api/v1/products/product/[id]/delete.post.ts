import Product from '~/server/models/productSchema'

export default defineEventHandler(async event => {
  const id = event.context.params?.id
  const user = event.context.user
  const product = await Product.findById(id)

  if (user && user.isAdmin) {
    if (product) {
      await Product.deleteOne({ _id: product._id })

      return { message: 'Product removed' }
    } else {
      throw createError({
        statusCode: 404,
        statusMessage: 'Product with that ID does not exist',
      })
    }
  }
})
