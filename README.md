# E-Commerce Platform

This project is an e-commerce platform built with **PostgreSQL**, **Sequelize**, **Express**, and **Next.js**. It provides a full-featured shopping experience with a responsive front-end and a secure back-end.


![image](https://github.com/user-attachments/assets/14e76fbf-1a82-48a1-af2b-a66d2f4800e2)

## Features
- **Database**: Structured with PostgreSQL and managed using Sequelize ORM.
- **Add-to-Cart**: Users can add products to their cart and proceed with checkout.
- **Front-End**: Built with Next.js for a fast, responsive UI.
- **Product Management**: Easy product listing, retrieval, and detail view.

## Current Work
- **Payment Integration**: Implementing **Stripe** for secure payment processing.
- **Security**: Working on input sanitization, encrypted authentication, and HTTPS for enhanced security.

## Getting Started

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/ecommerce-platform.git
    cd ecommerce-platform
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up your environment variables in a `.env` file:
    - `DB_URI` – PostgreSQL database connection string
    - `STRIPE_SECRET_KEY` – Your Stripe secret key

4. Run the app:
    ```bash
    npm run dev
    ```

    Visit `http://localhost:3000` to access the platform.

## Tech Stack
- **Backend**: Express.js, Sequelize, PostgreSQL
- **Frontend**: Next.js
- **Payment Processing**: Stripe
- **Security**: Input sanitization, encrypted authentication, HTTPS
