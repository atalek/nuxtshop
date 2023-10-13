import Product from '~/server/models/productSchema'
import { Product as Productt } from '~/types'

export default defineEventHandler(async event => {
  const user = event.context.user

  if (user && user.isAdmin) {
    const pageSize = 8
    const page = Number(event.context.params?.page)
    const count = await Product.countDocuments()

    // @ts-ignore
    const products: Productt[] = await Product.find({})
      .limit(pageSize)
      .skip(pageSize * (page - 1))

    return { products, page, pages: Math.ceil(count / pageSize) }
  } else {
    throw createError({
      statusCode: 403,
      statusMessage: 'Access denied,not an admin',
    })
  }
})
