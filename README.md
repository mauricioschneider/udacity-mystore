# udacity-mystore
Angular project for Udacity's Full Stack JavaScript Developer nanodegree

## Features and Components

Features of this online store project include:

- Reading products from a remote source. In this case, it reads them from a lcal data.json file
- Adding and removing products from a cart
- Displaying push notifications using Bootstrap Toasts (`ngx-toastr`)
- Completing an order, with a fully client-side validated form
- Displaying an order confirmation message

The project has been built using Angular 17 and Bootstrap 5. Includes the following components:

- `product-list`: Home page. It displays all the products
- `product-item`: Child component of `product-list`. Used to render each product in the home page
- `product-item-detail`: Used to display a detailed view of a product
- `cart`: Lists all the cart items. Allows to add or remove more units of a product already in the cart. Features a checkout form
- `confirmation`: Display a confirmation once a valid order has been submitted using the `cart` component

Services include:

- `cart.service` Serves as central storage of cart data to be used to complete an order
- `product.service` Loads product data from a remote location (or in this case, from locally hosted `assets/data.json`)

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## References

This project uses Bootstrap for styling. I used the following templates as samples on how to display the list of products, and a detailed product view.

- Shop Item Template: https://startbootstrap.com/template/shop-item
- Shop Homepage Template: https://startbootstrap.com/template/shop-homepage