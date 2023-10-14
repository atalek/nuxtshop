import { Types } from 'mongoose'

export interface Product {
  _id: Types.ObjectId
  user: string
  name: string
  image: string
  description: string
  brand: string
  category: string
  price: number
  countInStock: number
  rating: number
  numReviews: number
  reviews?: Review[]
}

export interface ProductUpdateData {
  name?: string
  price?: number
  image?: string
  brand?: string
  category?: string
  countInStock?: number
  description?: string
}

export interface CartItem {
  product: Product
  qty: number
}

export interface UserInfo {
  _id?: Types.ObjectId
  name: string
  email: string
  isAdmin: boolean
}

export interface LoginInfo {
  email: string
  password?: string
}

export interface User extends LoginInfo {
  name: string
}

export interface UpdateUserData {
  name?: string
  email?: string
  isAdmin?: boolean
}

export interface ShippingAddress {
  address: string
  city: string
  postalCode: string
  country: string
}

export interface Review {
  _id?: Types.ObjectId
  name?: string
  rating: number
  comment: string
  createdAt?: string
}

export interface OrderItems {
  name: string
  qty: number
  image: string
  price: number
  product: Product
}

export interface Order {
  _id: Types.ObjectId
  user?: UserInfo
  createdAt: string
  totalPrice: number
  isPaid: boolean
  paidAt: string
  isDelivered: boolean
  deliveredAt: string
}

export interface PlaceOrder {
  orderItems: CartItem[]
  shippingAddress: ShippingAddress
  paymentMethod: string
  itemsPrice: number
  shippingPrice: number
  taxPrice: number
  totalPrice: number
}

export interface PaymentIntent {
  id: string
  created: string
}
