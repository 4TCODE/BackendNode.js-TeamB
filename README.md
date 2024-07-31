# Task1

## Used Technologies

- NestJs
- TypeORM
- TS

## Installation Steps

1- We need a Postgresql database (if you don't have it click : [Here](https://www.postgresql.org/download/))

2- Please (Follow / Edit) the **'src/config/database.ts'** file.

3- Now we are ready for the next steps:

- Clone this repo

  ```bash
    git clone https://github.com/4TCODE/BackendNode.js-TeamB.git
  ```

- Install dependencies and Run

  ```bash
    # installing dependencies
    npm install
  ```
  
  ```bash
    # start the app
    npm start
  ```

## API Endpoints

### Auth Endpoints

___________________________________
| HTTP Verbs | Endpoints | Action |
| --- | --- | --- |
| POST | /api/v1/auth/signup | To create a new account  |
| POST | /api/v1/auth/login | To log in with an existed account |
___________________________________

### Users Endpoints

___________________________________
| HTTP Verbs | Endpoints | Action |
| --- | --- | --- |
| GET | /api/v1/users/profile | To get a profile for a user |
| PATCH | /api/v1/users/edit | To edit a profile for a user  |
| PATCH | /api/v1/users/promote/:userId | To promote a user by **admin**  |
| DELETE | /api/v1/users/me | To deactivate an account |
___________________________________

### Products Endpoints

___________________________________
| HTTP Verbs | Endpoints | Action |
| --- | --- | --- |
| POST | /api/v1/products | To create a product by **admin** |
| GET | /api/v1/products/:productId | To get product's data |
| PATCH | /api/v1/products/:productId | To edit a product's data by **admin** |
| DELETE | /api/v1/products/:productId | To delete a product by **admin** |
___________________________________
