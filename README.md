# MERN E-Commerce Application

---
This project aims to develop skills in MERN stack technologies while integrating various libraries. The focus is on building both server-side and client-side applications, consuming REST APIs. Key Technology used are: JWT, Gravatar, react-bootstrap, redux-toolkit, react-toastify.

## How to Run 
1.  Clone this project.



## The client

1.  Run `cd client`. Update `.env` with your details.
     ```shell
    REACT_APP_EXPRESS_SERVER_URL="http://localhost:9000"
    REACT_APP_CLOUDINARY_CLOUD_NAME="dkziw6hud"
    REACT_APP_CLOUDINARY_UPLOAD_PRESET="vxpkzkfj"
    ```
2.  Run `npm install`
3.  Run `npm start`

This should connect the server to the mongoDB and start the backend application.

### The server
1.  Run `cd server`. Update `.env` with your details.
    ```shell
    EXPRESS_APP_MONGO_DB_CLOUD_URL="mongodb+srv://amritcsadhikari:ewXvtYKTg3hqUFVn@e-commerce-cluster.x0087.mongodb.net/?retryWrites=true&w=majority&appName=e-commerce-cluster"
    EXPRESS_APP_MONGO_DB_DATABASE_NAME="react-e-commerce"
    EXPRESS_APP_JWT_SECRET_KEY="3ddMmA8GGtuQSJgBfO";
    EXPRESS_APP_JWT_TOKEN_KEY="x-auth-token";
    ```
2.  Run `npm install`
3.  Run `npm start`
