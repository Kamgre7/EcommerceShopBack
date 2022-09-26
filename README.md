# E-commerce Shop Backend

E-commerdce Shop App is a shop application created to learn new techniques using framework
**NestJS**. Code was formetted using eslint. Project is a backend api for e-commerce shop
application.

[Frontend of application](https://github.com/Kamgre7/EcommerceShopFront)

### 🚀 Technologies

- Node.js
- NestJS
- TypeScript
- PassportJS
- Nodemailer
- Multer
- Mysql2
- TypeORM
- Handlebars


### ✅ Requirements
Before starting, you need to have Git and Node installed.

### 🏁 Running the app

```bash
# Clone the project
$ git clone https://link-to-project

# Go to the project directory
$ cd my-project

# Install dependencies
$ npm install

# Start the server
$ npm run start
```


### 🛠 Main API Reference


#### **AUTH EP**

#### User login request

```http
  POST /auth/login
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | User email `REQUIRED`
| `password` | `string` | User password `REQUIRED`


#### User logout request

```http
  GET /auth/logout
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `user`      | `UserEntity` | user must be logged in`REQUIRED` |

&nbsp;
#### **BASKET EP**

#### Add items to basket

```http
  POST /basket
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `productId` | `string` | product ID `REQUIRED`
| `quantity` | `number` | quantity `REQUIRED`
| `user`      | `UserEntity` | user must be logged in`REQUIRED` |

#### Show user basket

```http
  GET /basket
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `user`      | `UserEntity` | user must be logged in`REQUIRED` |

#### Delete single item in basket

```http
  DELETE /basket/:id
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id`      | `string` | id of single basket item `REQUIRED` |
| `user`      | `UserEntity` | user must be logged in`REQUIRED` |

#### Clear basket of all items

```http
  DELETE /basket
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `user`      | `UserEntity` | user must be logged in`REQUIRED` |

&nbsp;
#### **CATEGORY EP**

#### Create category

```http
  POST /category
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | new category name `REQUIRED`
| `description`      | `string` | new category description `REQUIRED` |
| `photo`      | `file` | category photo|
| `user`      | `UserEntity` | Admin must be logged in`REQUIRED` |


#### Show categories

```http
  GET /category
```

#### Show single category

```http
  GET /category/:id
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id`      | `string` | id of single category `REQUIRED` |

#### Show category photo

```http
  GET /category/photo/:id
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id`      | `string` | id of single category `REQUIRED` |

&nbsp;
#### **CHECKOUT EP**

#### Place order

```http
  POST /checkout/order
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `userAddresId` | `string` | user address ID `REQUIRED`
| `creditCard`      | `string` | user credit card number `REQUIRED` |
| `expDate`      | `string` | user credit card expiration date `REQUIRED`
| `creditCardCvc`      | `string` | creadit card cvc number `REQUIRED`|
| `user`      | `UserEntity` | user must be logged in`REQUIRED` |

#### Show all orders of user

```http
  GET /checkout/order/history
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `user`      | `UserEntity` | user must be logged in`REQUIRED` |

#### Show single user order

```http
  GET /checkout/order/history/:id
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id`      | `string` | id of single order `REQUIRED` |
| `user`      | `UserEntity` | user must be logged in`REQUIRED` |


#### Show basket checkout

```http
  GET /checkout
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `user`      | `UserEntity` | user must be logged in`REQUIRED` |

&nbsp;
#### **PRODUCT EP**

#### Create product

```http
  POST /product
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | new product name `REQUIRED`
| `description`      | `string` | new product description `REQUIRED` |
| `price`      | `number` | product price `REQUIRED` |
| `quantity`      | `number` | product quantity `REQUIRED` |
| `sku`      | `string` | product sku number `REQUIRED` |
| `categoryId`      | `string` | product category id `REQUIRED` |
| `photo`      | `file` | product photo|
| `user`      | `UserEntity` | Admin must be logged in`REQUIRED` |


#### Show products

```http
  GET /product
```

#### Show top sold products

```http
  GET /product/ranking
```

#### Find products by category

```http
  GET /product/category/:categoryName
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `categoryName`      | `string` | name of category `REQUIRED` |

#### Find products by search bar

```http
  GET /product/find/:searchTerm
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `productId`      | `string` | name of search product `REQUIRED` |


#### Show single product

```http
  GET /product/:productId
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `productId`      | `string` | ID of product `REQUIRED` |


#### Delete product

```http
  DELETE /product/:productId
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `productId`      | `string` | ID of product `REQUIRED` |
| `user`      | `UserEntity` | Admin must be logged in`REQUIRED` |


&nbsp;
#### **USER EP**

#### Register user

```http
  POST /user/register
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `firstName` | `string` | user first name `REQUIRED`
| `lastName`      | `string` | user last name `REQUIRED` |
| `email`      | `string` | user email `REQUIRED` |
| `password`      | `string` | user password `REQUIRED` |
| `address`      | `string` | street and local number `REQUIRED` |
| `city`      | `string` | city `REQUIRED` |
| `postalCode`      | `string` | postal code `REQUIRED`|
| `country`      | `string` |country `REQUIRED` |
| `mobilePhone`      | `number` | mobile phone `REQUIRED` |


#### Add user address

```http
  POST /user/address
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `address`      | `string` | street and local number `REQUIRED` |
| `city`      | `string` | city `REQUIRED` |
| `postalCode`      | `string` | postal code `REQUIRED`|
| `country`      | `string` |country `REQUIRED` |
| `mobilePhone`      | `number` | mobile phone `REQUIRED` |
| `user`      | `UserEntity` | user must be logged in`REQUIRED` |


#### Change user password

```http
  PATCH /user/edit/password
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `currentPassword`      | `string` | current password `REQUIRED` |
| `newPassword`      | `string` | new password `REQUIRED` |
| `user`      | `UserEntity` | user must be logged in`REQUIRED` |


#### Activate user account

```http
  GET /user/activate/:token
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `token`      | `string` | generated activation token `REQUIRED` |


#### Show all users

```http
  GET /user
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `user`      | `UserEntity` | Admin must be logged in`REQUIRED` |


#### Show single user

```http
  GET /user/:userId
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `userId`      | `string` | user ID`REQUIRED` |
| `user`      | `UserEntity` | Admin/User must be logged in`REQUIRED` |


#### Find user addresses

```http
  GET /user/address
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `user`      | `UserEntity` | User must be logged in`REQUIRED` |


#### Find a single user address

```http
  GET /user/address/:addressId
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `addressId`      | `string` |user address ID `REQUIRED` |
| `user`      | `UserEntity` | User must be logged in`REQUIRED` |


#### Detele user account

```http
  GET /user/:userId
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `userId`      | `string` | ID of user `REQUIRED` |
| `user`      | `UserEntity` | User must be logged in`REQUIRED` |


## Authors

[@Kamgre7](https://github.com/Kamgre7/)


