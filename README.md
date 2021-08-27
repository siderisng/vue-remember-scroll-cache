# vue-remember-scroll-cache
Vue plugin that provides functionality for remembering scroll position and loaded items in a catalog page after navigating back and forth to a single item page, with customisable options.

## Use case
This plugin was created as a usecase for an ecommerce website. Our category view page has an infinity loader (loads more products as we scroll down). We want to retain the loaded products and scroll position after clicking on a product and redirecting to the product page and then navigating back to the category view page. We want to create a seamless transition going between category view listing and product view page so that the user can continue exploring the available products without losing their progress.

[![Screen-Recording-2021-08-27-at-3.47.58-PM-1.md.gif](https://s9.gifyu.com/images/Screen-Recording-2021-08-27-at-3.47.58-PM-1.md.gif)](https://gifyu.com/image/GVJF)

## How it works

1. Adds click event listeners to the elements (using the developer specified selector) living inside the element that uses the `v-remember-scroll-cache` directive
2. When a user clicks on the aforementioned elements, the browser's scroll position is retained as well as the content of the variable that contains all items listed (eg. on an ecommerge category view), the name of the variable can also be configured.
3. User goes to item page, the one they clicked on.
4. User goes back to the catalog page
5. Previously loaded items are inserted by the plugin into the vue component using the directive, thus retaining all items previously loaded
6. Previous scroll position is restored.
7. User is at the same place they started and can continue scrolling down without losing their previous position in the category view page 🙂

## Installation

```
npm i --save vue-remember-scroll-cache
```

### Usage

In main.js or any other vue entry point:
```
import Vue from 'vue'
import VueRememberScrollCache from 'vue-remember-scroll-cache'

Vue.use(VueRememberScrollCache)
```

In vue template:
```
<div v-remember-scroll-cache="{ itemsName: 'products', selector: 'a' }">
Catalog view
.....
</div>
```

`itemsName` should contain the name of the internal state variable that holds all items that are listed. In this example our vue component has an internal state variable called `products` that is an array of all products in our ecommerce category view. `this.products` will be repopulated with the products loaded earlier when scrolling down the category view of our app.


`selector` should contain the css element selector to use for applying the click event listeners. In this example we want our plugin to run when a link (`a` tag) inside our div container is used


