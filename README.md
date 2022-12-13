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
- Swagger


### ✅ Requirements
Before starting, you need to have Git and Node installed.

#### Run locally - backend

```bash
# Clone the project
$ git clone https://github.com/Kamgre7/EcommerceShopBack.git

# Go to the project directory
$ cd e-commerce-shop-back

# Install dependencies
$ npm install

# Start the server
$ npm run start
```

#### Run locally - frontend

```bash
# Clone the project
$ git clone https://github.com/Kamgre7/EcommerceShopFront.git

# Go to the project directory
$ cd ecommerce-shop-front

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

#### Change item quantity in basket

```http
  POST /basket
```

| Parameter      | Type     | Description                |
|:---------------| :------- | :------------------------- |
| `basketId`        | `string` | basket ID `REQUIRED`
| `quantity`     | `number` | quantity `REQUIRED`
| `user`         | `UserEntity` | user must be logged in`REQUIRED` |

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

#### Edit product information

```http
  PATCH /product/edit
```

| Parameter     | Type     | Description                       |
|:--------------| :------- |:----------------------------------|
| `id`           | `string` | product ID `REQUIRED`             
| `name`        | `string` | product name `REQUIRED`           
| `description` | `string` | product description `REQUIRED`    |
| `price`       | `number` | product price `REQUIRED`          |
| `quantity`    | `number` | product quantity `REQUIRED`       |
| `sku`         | `string` | product sku number `REQUIRED`     |
| `categoryId`  | `string` | product category ID `REQUIRED`    |
| `user`        | `UserEntity` | Admin must be logged in`REQUIRED` |


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
  GET /product/category/:categoryId
```

| Parameter | Type     | Description              |
|:----------| :------- |:-------------------------|
| `categoryId`       | `string` | id of category `REQUIRED` |

#### Find products by search bar

```http
  GET /product/find/:searchTerm
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `productId`      | `string` | name of search product `REQUIRED` |

#### Find product photo

```http
  GET /product/photo/:productId
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


#### Change user information

```http
  PATCH /user/edit/
```

| Parameter | Type     | Description                      |
| :-------- | :------- |:---------------------------------|
| `firstName`      | `string` | first name `REQUIRED`            |
| `lastName`      | `string` | last name `REQUIRED`             |
| `email`      | `string` | email `REQUIRED`                 |
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


#### Recover password

```http
  PUT /user/recover-password
```

| Parameter     | Type     | Description                      |
|:--------------| :------- |:---------------------------------|
| `email`           | `string` | current email`REQUIRED`              |
| `newPassword` | `string` | new password `REQUIRED`          |


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

#### Check if user is logged

```http
  GET /user/check
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
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

&nbsp;
### 🚩 Database structure
&nbsp;
![img_1](https://user-images.githubusercontent.com/105069884/192585448-ae06676e-0d05-4492-952f-201144ce588a.png)


### 🛠 Example of API calls
- user register

![image](https://user-images.githubusercontent.com/105069884/207419343-235ee89b-0301-4852-84bd-9b6c3bb8efa1.png)


- user account activation

![image](https://user-images.githubusercontent.com/105069884/207419663-1fc067c7-8ff8-42c1-b75e-13cb6316554e.png)


- user login

![image](https://user-images.githubusercontent.com/105069884/207419118-1a6a1dac-de8f-4e04-b27d-a925b4103757.png)


- change user password

![image](https://user-images.githubusercontent.com/105069884/207419839-07048b7b-57bf-4ea8-ab5a-ba0449dc0cb9.png)


- get product list

![image](https://user-images.githubusercontent.com/105069884/207419955-8c393508-9e65-46b9-8b49-f794da70e4c8.png)


- add product - admin required

![image](https://user-images.githubusercontent.com/105069884/207420112-8fd1b4dc-93e9-4858-8d99-853805a1c553.png)
![image](https://user-images.githubusercontent.com/105069884/207420197-8951c008-6484-4f5d-9ab3-49f97a2f76fb.png)


- get category list

![image](https://user-images.githubusercontent.com/105069884/192586139-9b6fa05b-1459-4def-91c1-c14c6ed1d462.png)

- add category - admin required

![img_11](https://user-images.githubusercontent.com/105069884/192586042-181b61f1-53af-4cee-af6d-0a17881765d6.png)

- add item to basket

![img_12](https://user-images.githubusercontent.com/105069884/192586174-9cdaa739-a353-4924-8bcc-c9c36fe49131.png)

- get basket item list

![img_13](https://user-images.githubusercontent.com/105069884/192586199-4b649b4f-ca75-401a-ae67-40367c56a0d3.png)

- remove item from basketId

![img_14](https://user-images.githubusercontent.com/105069884/192586226-a026bf73-733b-4a9a-b888-5f47742adac8.png)

- add additional user address

![img_15](https://user-images.githubusercontent.com/105069884/192586250-985fc2f9-473b-4136-bc1a-1b71a7cd34a5.png)

- get all user addresses

![img_16](https://user-images.githubusercontent.com/105069884/192586272-8023fa0e-9332-4b0a-82fe-93a5252208ce.png)

- checkout information

![img_17](https://user-images.githubusercontent.com/105069884/192586300-ea3fb1b5-42e8-43eb-a4f0-4b5aefc14b22.png)

- place an order

![img_18](https://user-images.githubusercontent.com/105069884/192586319-fc378d43-85d1-42c2-b032-aec2e8a5ba55.png)

- order history

![img_19](https://user-images.githubusercontent.com/105069884/192586340-e684e7b2-cb58-4965-9c9c-5ba63e3d0396.png)

### 🧭 TODO
✅ user panel - option to change user information

✅ recover password method

✅ add Swagger API documentation
- product panel - filtering items by the options selected by user
- unit testing
- refactor code

### Author

[@Kamgre7](https://github.com/Kamgre7/)



