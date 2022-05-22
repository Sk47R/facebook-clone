# Facebook Clone

- This is a simple facebook clone web app with functionality like user login, signup, basic CRUD operations, image upload and along with that you can chat with friends that you have followed. It is an application built with the MERN stack.

# Pre-requisite

- Node.js
- MongoDb

# Usage

1. Clone the repository

```
git clone https://github.com/Sk47R/facebook-clone.git
```

2. Navigate to the repository

```
cd facebook-clone
```

3. Install the dependencies

```
cd frontend
npm install
cd ../backend
npm install
```

4. Create a .env file inside the root folder of the backend and setup the environmental variables like below.

```
MONGO_URL = mongodb+srv://<password>@cluster0.2c3uu.mongodb.net/<databaseName>?retryWrites=true&w=majority

SECRET_KEY = "Super_Scret_Key"
```

5. To run the app you have to open 3 integrated terminals and navigate to folders.

```
// in one terminal
cd frontend
npm start

// in second terminal
cd backend
npm start

// in third terminal
cd socket
npm start
```
