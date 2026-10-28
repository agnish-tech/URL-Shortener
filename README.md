# URL Shortener

A URL Shortener web application built using **Node.js, Express.js, MongoDB, and EJS**. The application allows authenticated users to generate short URLs, redirect users to original URLs, and track link visits through analytics.

## Features

- **URL Shortening:** Generate unique short IDs for long URLs.
- **URL Redirection:** Redirect users to the original URL using the generated short link.
- **User Authentication:** User signup and login functionality using JSON Web Tokens (JWT).
- **Cookie-Based Authentication:** Store authentication tokens in browser cookies.
- **Role-Based Access Control:** Support for `NORMAL` and `ADMIN` user roles.
- **User-Specific URLs:** Display URLs created by the logged-in user.
- **Admin Dashboard:** Allow administrators to view all generated URLs.
- **Click Tracking:** Record timestamps for visits to shortened URLs.
- **URL Analytics:** Retrieve total visits and visit history for a specific short URL.
- **Server-Side Rendering:** Render the application pages using EJS templates.

## Tech Stack

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express.js | Web server and routing |
| MongoDB | NoSQL database |
| Mongoose | MongoDB object modeling |
| EJS | Server-side HTML rendering |
| JSON Web Token (JWT) | Authentication tokens |
| Cookie-parser | Read authentication cookies |
| ShortID | Generate short URL identifiers |
| Nodemon | Automatically restart the server during development |

## Project Structure

```text
SHORT-URL/
├── controllers/
│   ├── url.js
│   └── user.js
├── middlewares/
│   └── auth.js
├── models/
│   ├── url.js
│   └── user.js
├── routes/
│   ├── staticRouter.js
│   ├── url.js
│   └── user.js
├── service/
│   └── auth.js
├── views/
│   ├── home.ejs
│   ├── login.ejs
│   └── signup.ejs
├── connect.js
├── index.js
├── package.json
├── package-lock.json
└── README.md
```

## Getting Started

### Prerequisites

Make sure you have installed:

- [Node.js](https://nodejs.org/)
- [MongoDB Community Server](https://www.mongodb.com/try/download/community)
- [Git](https://git-scm.com/)

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/agnish-tech/URL-Shortener.git
```

**2. Navigate to the project directory**

```bash
cd URL-Shortener
```

**3. Install dependencies**

```bash
npm install
```

**4. Start MongoDB**

Make sure your local MongoDB server is running. The application connects to the `short-url` database on the default MongoDB port.

```text
mongodb://localhost:27017/short-url
```

**5. Start the application**

```bash
npm start
```

Nodemon will start the Express server on port `8001`.

**6. Open the application**

Visit [http://localhost:8001](http://localhost:8001) in your browser.

## Application Routes

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Display the user's URL dashboard |
| GET | `/signup` | Display the signup page |
| GET | `/login` | Display the login page |
| POST | `/user` | Register a new user |
| POST | `/user/login` | Authenticate a user |
| POST | `/url` | Generate a short URL |
| GET | `/:shortId` | Redirect to the original URL |
| GET | `/url/analytics/:shortId` | Retrieve URL analytics |
| GET | `/admin/urls` | Display all URLs for administrators |

**Note:** URL creation requires authentication and an authorized user role. The admin dashboard is restricted to users with the `ADMIN` role.

## Database Models

### User

Stores user account information, including:

- `name` — User's name
- `email` — Unique email address
- `password` — User password
- `role` — `NORMAL` or `ADMIN`
- `createdAt` and `updatedAt` — Timestamps managed by Mongoose

### URL

Stores shortened URL information, including:

- `shortId` — Unique identifier for the short URL
- `redirectURL` — Original destination URL
- `visitHistory` — Array of visit timestamps
- `createdBy` — Reference to the user who created the URL
- `createdAt` and `updatedAt` — Timestamps managed by Mongoose

## How It Works

1. A user signs up or logs in.
2. The server generates a JWT and stores it in a browser cookie.
3. Authentication middleware validates the token and identifies the logged-in user.
4. The user submits a long URL through the dashboard.
5. The server generates a short ID and stores the URL in MongoDB.
6. When someone visits the short URL, the server records the visit timestamp and redirects them to the original destination.
7. The analytics endpoint returns the total number of visits and the visit history.

## Future Improvements

- Hash passwords using bcrypt.
- Move JWT secrets and database configuration into environment variables.
- Add URL validation and improved error handling.
- Add URL expiration and deletion functionality.
- Improve the dashboard UI and analytics visualization.
- Add automated tests for authentication, URL generation, and redirection.

## License

This project is licensed under the ISC License, as specified in `package.json`.
