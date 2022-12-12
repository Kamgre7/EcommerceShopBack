export const userApiMessage = {
  createUser: 'User id and mail as response',
  createUserBadReq: 'User cannot register. Try again',
  createUserAddress: 'Return information if success: true/false',
  editUserInfo: 'Is success user information changed',
  editUserInfoResponse: 'User information updated successfully',
  editUserPwd: 'Is success user password changed',
  editUserPwdResponse: 'Password changed successfully',
  recoverUserPwd: 'Is success user password changed',
  recoverUserPwdBadReq: 'Cannot recover password. Try again',
  activateUserAccount: 'Return true if activation confirmed',
  activateUserAccountResponse: 'User activation was successful',
  activateUserAccountBadReq: 'Cannot activate user account. Try again',
  findAllUsers: 'Return array of all users',
  findOneUser: 'Return user profile information',
  findUserAddress: 'Return all user addresses',
  findOneUserAddress: 'Return user address information',
  checkIfUserLogged: 'Return object of user information',
  removeUser: 'Return information about success of deleting account',
  loginUser: 'User information object as response',
  loginUserBadReq: 'User cannot logged in. Try again',
  logoutUser: 'Is success user logout',
  uniqueUserToken: 'Unique user activation token',
  uniqueUserAddressId: 'Unique user address id',
  uniqueHashedPwd: 'Hashed user password',
  uniquePwdSalt: 'User random salt',
  uniqueUserId: 'Unique user id',
  createdDate: 'When user was created',
  updatedDate: 'When user was updated',
  forbiddenUser: 'User must have admin role, to see all users',
  forbiddenUserDeleteProduct: 'User must have admin role, to delete product',
  unauthorizedUser: 'You must be logged in',
};

export const basketApiMessage = {
  addToBasket: 'Return new basket id with is success information',
  changeItemQuantity:
    'Return is success information about changing item quantity in basket',
  deleteBasket: 'Return information about success of deleting item in basket',
  clearBasket: 'Remove all items from basket',
  uniqueBasketId: 'Unique basket id',
};

export const categoryApiMessage = {
  createCategory: 'Return filtered information about category',
  findAllCategories: 'Return all categories',
  findSingleCategory: 'Return category found by unique ID',
  forbiddenUser: 'User must have admin role, to add category',
  getAllCategoriesBadReq: 'Cannot find categories. Try again',
  getSingleCategoryBadReq: 'Cannot find category. Try again',
  getCategoryPhotoBadReq: 'Cannot find category photo. Try again',
  uniqueCategoryId: 'Unique category id',
};

export const checkoutApiMessage = {
  placeOrder: 'Return placing order response',
  placeOrderConfirmation: 'Order was placed correctly',
  findUserOrderHistory: 'Return all user orders',
  findUserSingleOrder: 'Return user order found by unique ID',
  uniqueOrderId: 'Unique order id',
  totalPriceInfo:
    'Returns information about order price, and how many items are with type',
};

export const productApiMessage = {
  createProduct: 'Return filtered information about product',
  editProduct: 'Return if is success product information changed',
  editProductInfoResponse: 'Product updated successfully',
  findAllProducts: 'Return array of all products',
  findAllProductsBadReq: 'Cannot find products. Try again',
  findBestSoldProduct: 'Return array of three best sold products',
  findBestSoldProductBadReq: 'Cannot find products. Try again',
  findProductByCategory: 'Return array of products with this same category',
  findProductByCategoryBadReq: 'Cannot find products. Try again',
  findProductById: 'Return product information',
  findProductByIdBadReq: 'Cannot find product. Try again',
  findProductBySearchTerm: 'Return array of products with this same search',
  findProductBySearchTermBadReq: 'Cannot find products. Try again',
  searchTerm: 'User description of product name',
  uniqueProductId: 'Unique product id',
  createdDate: 'When product was created',
  updatedDate: 'When product was updated',
  photoFile: 'Return photo file (img) of product',
  photoFileBadReq: 'Cannot find photo. Try again.',
  removeProduct: 'Return information about success of deleting product',
};

export const userApiInformation = {
  firstName: 'John',
  lastName: 'Stone',
  email: 'john@example.com',
  password: 'example123',
  newPwd: 'newPwd123',
  address: 'Baker Street 11a',
  city: 'London',
  postalCode: '11345',
  country: 'England',
  mobilePhone: 123456789,
  addressId: 'a05e7037-ebb8-418d-9653-797af68d5d01',
  userId: 'da0b7eda-43f0-448a-a2dd-36c2239d27cc',
  currentTokenId: 'edfe341a-65fb-46a0-b6af-f4462c51b295',
  creditCard: '4024007150612892',
  expDateCreditCart: '11/24',
  cvcCreditCard: '915',
  hashedPwd:
    'd6954dcf42ac0460c080fffba9f465022c9abc88726e9d507145f0cd6343df9fd7942e2428f20f5d78e61a43f17bac09f6db99670e6214b353d67c03168439c3',
  activationToken:
    '265a481545ff67f9b69a32183651ab4ae74e1e74d9d91dc9292d3835fe5aeb2fe153859954a5a01c2a3587584e6836a53e22d3b81fa7f2b871fc088bec8222da',
};

export const basketApiInformation = {
  basketId: '9b363e1e-a010-47f7-98c0-01374f52b705',
  itemQuantity: 5,
  updatedProductQuantity: 1,
};

export const categoryApiInformation = {
  categoryId: '73acf845-6eef-4a7c-8598-dce70237d22a',
  name: 'Accessories',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
  photoFileName: '1ed62061-7d63-4845-b812-1ef8fe6525df.jpeg',
  dateNow: new Date(),
};

export const productApiInformation = {
  productId: '1d3fae0f-891a-49a8-a483-3c421b0f63ac',
  name: 'Lamp',
  category: categoryApiInformation.categoryId,
  price: 128,
  quantity: 100,
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
  sku: 'A2B65',
  boughtCounter: 4,
  findBySearchTerm: 'lamp',
  photoFileName: '4dbc509d-284f-4617-8eaa-caf401dca278.jpeg',
};

export const checkoutApiInformation = {
  orderId: '091ad79d-8aa0-49d8-9863-45d4d23b1587',
  totalPrice: 4354.53,
  totalItems: 8,
  itemsType: 4,
};
