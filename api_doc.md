# LodaShop API Documentation

## Deployed server

- url : https://api.h8-legend.phase2.foxhub.space
- registered user :

```js
[
  {
    username: "Alice",
    email: "alice@example.com",
    password: "123456",
    phoneNumber: "123-456-7890",
    address: "123 Main St",
  },
  {
    username: "Bob",
    email: "bob@example.com",
    password: "654321",
    phoneNumber: "987-654-3210",
    address: "456 Elm St",
  },
];
```

&nbsp;

## Models :

_User_

```
- email : string
- password : string
```

_History_

```
- description : string
- UserId : string
- TransactionId : string
```

_Transaction_

```
- title : string
- price : integer
- GameId : integer
```

_Game_

```
-name:string
```

## Endpoints :

List of available endpoints:
​

- `POST /register`
- `POST /login`

Routes below need authentication:

- `GET /users`
- `GET /histories`
- `GET /transactions`
- `GET /transactions/:id"`
- `POST /transactions`
- `GET /games`
- `GET /games/:id`

Routes below are only endpoint being hit during the midtrans token:

- `POST /histories/:id`
- `POST /qr-code`
- `POST /generateMidtransToken`
- `POST /midtranstoken`

&nbsp;

## 1. POST /register

Request:

- body:

```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "phoneNumber": "string",
  "address": "string"
}
```

_Response (201 - Created)_

```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "phoneNumber": "string",
  "address": "string"
}
```

&nbsp;

## 2. POST /login

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "invalid email or password"
}
```

&nbsp;

## 3. GET /users

Description:

- Request current user details

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
  {
    "id": 5,
    "username": "Alice",
    "email": "alice@example.com",
    "password": "$2a$08$KIwqnOoFl6jzRWYojdwu6u1ifGsSNIiMKiWNAYhO5aA9vK8lN.psm",
    "phoneNumber": "123-456-7890",
    "address": "123 Main St",
    "createdAt": "2023-10-25T21:11:14.869Z",
    "updatedAt": "2023-10-25T21:11:14.869Z"
  }
]
```

&nbsp;

## 4. GET /histories

Description:

- Request current histories of transaction list

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
  {
        "id": 7,
        "description": "Thanks For Your Top Up on Transaction 200 Diamond on Game Clash Of Clans, for 80000",
        "UserId": 5,
        "TransactionId": 3,
        "createdAt": "2023-10-27T02:19:12.055Z",
        "updatedAt": "2023-10-27T02:19:12.055Z"
    },
    {
        "id": 6,
        "description": "Thanks For Your Top Up on Transaction 200 Diamond on Game Clash Of Clans, for 80000",
        "UserId": 5,
        "TransactionId": 3,
        "createdAt": "2023-10-27T02:17:14.079Z",
        "updatedAt": "2023-10-27T02:17:14.079Z"
    },
    ...
]
```

&nbsp;

## 5. GET /transactions

Description:

- Request current transactions list available of each games

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
  {
        "id": 1,
        "title": "WelkinMoon 1 Bulan",
        "price": 80000,
        "GameId": 1,
        "createdAt": "2023-10-25T21:11:14.896Z",
        "updatedAt": "2023-10-25T21:11:14.896Z",
        "Game": {
            "id": 1,
            "name": "Genshin Impact",
            "imageUrl": "https://upload.wikimedia.org/wikipedia/en/thumb/5/5d/Genshin_Impact_logo.svg/768px-Genshin_Impact_logo.svg.png?20210608062209",
            "createdAt": "2023-10-25T21:11:14.892Z",
            "updatedAt": "2023-10-25T21:11:14.892Z"
        }
    },
    {
        "id": 2,
        "title": "999 Genesis Crystal",
        "price": 144000,
        "GameId": 1,
        "createdAt": "2023-10-25T21:11:14.896Z",
        "updatedAt": "2023-10-25T21:11:14.896Z",
        "Game": {
            "id": 1,
            "name": "Genshin Impact",
            "imageUrl": "https://upload.wikimedia.org/wikipedia/en/thumb/5/5d/Genshin_Impact_logo.svg/768px-Genshin_Impact_logo.svg.png?20210608062209",
            "createdAt": "2023-10-25T21:11:14.892Z",
            "updatedAt": "2023-10-25T21:11:14.892Z"
        }
    },
    ...
]
```

## 5. GET /transactions/:id

Description:

- Request transaction detail by id available of each games

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
  "id": 1,
  "title": "WelkinMoon 1 Bulan",
  "price": 80000,
  "GameId": 1,
  "createdAt": "2023-10-25T21:11:14.896Z",
  "updatedAt": "2023-10-25T21:11:14.896Z",
  "Game": {
    "id": 1,
    "name": "Genshin Impact",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/en/thumb/5/5d/Genshin_Impact_logo.svg/768px-Genshin_Impact_logo.svg.png?20210608062209",
    "createdAt": "2023-10-25T21:11:14.892Z",
    "updatedAt": "2023-10-25T21:11:14.892Z"
  }
}
```

&nbsp;

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
