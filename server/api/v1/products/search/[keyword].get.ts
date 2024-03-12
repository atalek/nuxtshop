import Product from '~/server/models/productSchema'

export default defineEventHandler(async event => {
  const keyword = event.context.params?.keyword

  const products = await Product.find({
    $or: [
      { name: { $regex: `.*${keyword}.*`, $options: 'i' } },
      { brand: { $regex: `.*${keyword}.*`, $options: 'i' } },
      { category: { $regex: `.*${keyword}.*`, $options: 'i' } },
      { description: { $regex: `.*${keyword}.*`, $options: 'i' } },
    ],
  })

  return products
})
