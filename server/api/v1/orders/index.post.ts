import Order from '~/server/models/orderSchema'
import Product from '~/server/models/productSchema' // Import your product model

export default defineEventHandler(async event => {
  const user = event.context.user
  const body = await readBody(event)

  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = body

  if (orderItems && orderItems.length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'No order items',
    })
  } else {
    const updateStockPromises = []

    const orderItemsWithProductData = orderItems.map(item => {
      const productData = {
        name: item.product.name,
        qty: item.qty,
        image: item.product.image,
        price: item.product.price,
        product: item.product._id,
      }

      const updateStockPromise = Product.findByIdAndUpdate(
        item.product._id,
        { $inc: { countInStock: -item.qty } },
        { new: true },
      )

      updateStockPromises.push(updateStockPromise)

      return productData
    })

    await Promise.all(updateStockPromises)

    const order = new Order({
      orderItems: orderItemsWithProductData,
      user: {
        _id: user?.id,
        ...user,
      },
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    })

    const createdOrder = await order.save()

    return { createdOrder }
  }
})
