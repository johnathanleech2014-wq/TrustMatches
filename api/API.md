# IPTV API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
All endpoints (except auth) require JWT token in header:
```
Authorization: Bearer <token>
```

## Endpoints

### Authentication

#### Register
```
POST /auth/register
{
  "username": "user123",
  "email": "user@example.com",
  "password": "secure_password",
  "firstName": "John",
  "lastName": "Doe"
}
```

#### Login
```
POST /auth/login
{
  "username": "user123",
  "password": "secure_password"
}
```

### Channels

#### Get All Channels
```
GET /channels?category=Sports&country=US&page=1&limit=50
```

#### Get Channel by ID
```
GET /channels/:id
```

#### Get Channels by Category
```
GET /channels/category/:category
```

### Movies

#### Get All Movies
```
GET /movies?genre=Action&year=2023&page=1&limit=50
```

#### Get Movie by ID
```
GET /movies/:id
```

#### Get Trending Movies
```
GET /movies/trending/all
```

### Streaming

#### Get Channel Stream URL
```
GET /stream/channel/:id
```

#### Get Movie Stream URL
```
GET /stream/movie/:id
```

### Search

#### Global Search
```
GET /search?q=term&type=channels|movies
```

### User Profile

#### Get Profile
```
GET /users/profile
```

#### Update Profile
```
PUT /users/profile
{
  "firstName": "John",
  "lastName": "Doe",
  "avatar": "avatar_url"
}
```

#### Get Watch History
```
GET /users/watch-history
```
