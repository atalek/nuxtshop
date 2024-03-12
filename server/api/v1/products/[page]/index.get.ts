import Product from '~/server/models/productSchema'
import type { ProductType } from '~/types'

export default defineEventHandler(async event => {
  const pageSize = 8
  const page = Number(event.context.params?.page)

  const count = await Product.countDocuments()

  const products: ProductType[] = await Product.find({})
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .lean()

  return { products, pages: Math.ceil(count / pageSize) }
})
