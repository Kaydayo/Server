# 1  Typescript - File Update

### Setup
1. `yarn tsc` - to transpile to js lib/app
2. `yarn serve` - to start the server

## Problem Description:

Create A basic node application, that makes a CRUD operation (create, read, update, delete) into a file database.json.

## How will I complete this project?

- Use the folder ./server and work there.
- Your application should use basic bare bone node and typescript
- Push Solution to Github
- Host app on preferred cloud hosting provider, e.g Heroku
- Your aplication should be able to perform.
  - `GET` Request which returns all the products in your database.json data
  - `POST` Request which adds data to your database.json file (Note: If there is no database.json on post, create one dynamically).
  - `PUT` or `PATCH` Request which updates fields of a particular data using the id in database.json
  - `DELETE` Request which removes a particular data from your database.json using the id
- Data format example:

```
[
    {
     productName: "T Shirt",
     productDescription: "Men's Vintage Shirt Casual Short Sleeve T-Shirt",
     productVarieties: [
       {
         size: "large",
         color: "orange",
         quantity: "15",
         images: ["https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/83/453283/1.jpg?6332", "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/83/453283/2.jpg?6332"],
         price: "23000"
       },
       {
         size: "medium",
         color: "large",
         quantity: "35",
         images: ["https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/86/690064/1.jpg?7852", "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/86/690064/3.jpg?3113"],
         price: "35000"
       }
     ],
     dateUploaded: "1636633307531",
     dateEdited: "1636633307531"
    }
]
```

## FRONT END FEATURES:
- upload products
- Display Products with its varieties
- Add to cart
- Checkout
