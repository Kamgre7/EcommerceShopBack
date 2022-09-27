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

&nbsp;
### 🚩 Database structure
&nbsp;
![img_1](https://user-images.githubusercontent.com/105069884/192585448-ae06676e-0d05-4492-952f-201144ce588a.png)


### 🛠 Example of API calls
- user register

![image](https://user-images.githubusercontent.com/105069884/192571379-59d2e5e1-2264-45cf-abc0-da28a609afab.png)

- user account activation

![img_4](https://user-images.githubusercontent.com/105069884/192585657-07dd51ac-4268-424f-af5b-62f6affb0652.png)

- user login

![img_5](https://user-images.githubusercontent.com/105069884/192585687-275ab654-9e9f-4354-9fc6-a78327a16021.png)

- change user password

![img_6](https://user-images.githubusercontent.com/105069884/192585719-af249b85-abf5-47ae-98eb-d5199760f538.png)

- get product list

![img_9](https://user-images.githubusercontent.com/105069884/192585811-7a622a3c-4126-40aa-9a4b-56af57652e28.png)

- add product - admin required

![img_10](https://user-images.githubusercontent.com/105069884/192585859-772d7270-c3f5-471d-ba64-6303f77d1baa.png)

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
- product panel - filtering items by the options selected by user
- user panel - option to change user information
- unit testing
- refactor code

### Author

[@Kamgre7](https://github.com/Kamgre7/)



