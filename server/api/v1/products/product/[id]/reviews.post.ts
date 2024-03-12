import Product from '~/server/models/productSchema'

export default defineEventHandler(async event => {
  const user = event.context.user
  const id = event.context.params?.id
  const body = await readBody(event)
  const { rating, comment } = <
    {
      rating: string
      comment: string
    }
  >body

  const product = await Product.findById(id)
  if (product) {
    const alreadyReviewed = product.reviews.find(
      review => review.user.toString() === user?.id?.toString(),
    )
    if (alreadyReviewed) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Product already reviewed!',
      })
    } else {
      const review = {
        name: user?.name,
        rating: Number(rating),
        comment,
        user: user?.id,
      }
      product.reviews.push(review)
      product.numReviews = product.reviews.length

      product.rating =
        product.reviews.reduce((acc, review) => acc + review.rating, 0) /
        product.reviews.length

      await product.save()
      return { status: 201, message: 'Review added' }
    }
  } else {
    throw createError({
      statusCode: 404,
      statusMessage: 'Product with that ID does not exist',
    })
  }
})
