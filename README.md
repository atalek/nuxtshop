# NuxtShop eCommerce Platform

![Landing page](https://res.cloudinary.com/dkofkuquf/image/upload/v1705788590/nuxtshop/a06r0otgt0uj3liz1tjn.png)

Inspired by Traversy Media's ProShop v2 course, rebuilt fully with Nuxt 3.

## Features

- Full featured shopping cart
- Product reviews and ratings
- Top products carousel
- Product pagination
- Product search feature
- User profile with orders
- Admin product management
- Admin user management
- Admin Order details page
- Mark orders as delivered option
- Checkout process (shipping, payment method, etc.)
- Stripe payment integration

## Built with

- Nuxt 3
- MongoDB
- Pinia
- Bootstrap 5
- Cloudinary
- Stripe
- BCrypt
- JSON web token

## Setup

1. **Clone the repository.**

   ```bash
   git clone https://github.com/Amphei/nuxtshop.git

   ```

2. **Navigate to the project directory.**

   ```bash
   cd nuxtshop

   ```

3. **Install dependencies.**

   ```bash
   npm install

   ```

4. **Configure environment variables.**

   - Create a `.env` file in the root of the project.
   - Add the necessary environment variables.

   ```env
   # Mongodb
   MONGODB_URI=your_mongodb_uri

   # JWT secret
   JWT_SECRET=your_jwt_secret

   # Stripe
   STRIPE_PUBLIC_KEY=your_stripe_public_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret


   # Cloudinary
   CLOUDINARY=your_cloudinary_base_url
   CLOUDINARY_NAME=your_cloud_name
   CLOUDINARY_FOLDER=your_cloudinary_folder

   # NODE_ENV
   NODE_ENV=development

    # BASE_URL
   BASE_URL = 'http://localhost:3000' for development

   ```

5. **Run the development server.**

   ```bash
   npm run dev

   ```

6. **Open your browser and visit http://localhost:3000 to view the eCommerce
   webapp.**

## Live Version

[https://nuxtshop-yep.vercel.app/](https://nuxtshop-yep.vercel.app/)

## Author

Github [@Amphei](https://github.com/Amphei) <br> Linkedin:
[@Aleksandar Atanasovski](https://www.linkedin.com/in/aleksandar-atanasovski-16b123263/)
<br> Portfolio:
[https://atal-portfolio.pages.dev/](https://atal-portfolio.pages.dev/)
