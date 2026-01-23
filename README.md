### 📚 BookVault
*BookVault is a book-management web application built using the MERN stack (MongoDB, Express, React, Node.js). It offers features such as adding books, author management, and secure encrypted login using JWT.*

### Features
- *Add Books: Easily add and manage books in your collection.**
- *Edit Books: Modify book details as needed.*
- *Remove Books: Delete books from your collection.*
- *Author Management: Keep track of book authors.*
- *Secure Login: Authentication using JWT for secure login and session management.*
- *Upload Books: Users can upload books with metadata.*
- *User Management: Manage user roles and permissions.*
- *Interactive UI: Built with React.js for a responsive and interactive user interface.*
- *State Management: Utilizes Redux for efficient state management.*
- *Routing: Client-side routing with react-router-dom.*
- *API: RESTful API built with Express.js and MongoDB.*

### Tech Stack
- *Frontend: React, Redux, HTML, CSS, JavaScript*
- *Backend: Node.js, Express.js*
- *Database: MongoDB*
- *Authentication: JWT (jsonwebtoken)*
- *Password Encryption: bcryptjs*
- *Middleware: express-async-handler*
- *HTTP Client: axios*
- *Environment Variables: dotenv*
- *Development Tools: nodemon, concurrently*

### Directory Structure

```plaintext
BookVault/
├── backend/
│   ├── config/
│   │   └── db.js              # Database configuration
│   ├── controllers/
│   │   ├── bookController.js  # Book controller
│   │   ├── authController.js  # Authentication controller
│   │   └── userController.js  # User controller
│   ├── models/
│   │   ├── bookModel.js       # Book model
│   │   ├── userModel.js       # User model
│   │   └── authorModel.js     # Author model
│   ├── routes/
│   │   ├── bookRoutes.js      # Book routes
│   │   ├── authRoutes.js      # Authentication routes
│   │   └── userRoutes.js      # User routes
│   ├── middleware/
│   │   └── authMiddleware.js  # Authentication middleware
│   ├── server.js              # Entry point for the backend
│   └── .env                   # Environment variables
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── BookList.js    # Component to list books
│   │   │   ├── BookForm.js    # Component to add/edit books
│   │   │   ├── LoginForm.js   # Component for user login
│   │   │   ├── AuthorList.js  # Component to list authors
│   │   │   └── UserList.js    # Component to list users
│   │   ├── pages/
│   │   │   ├── HomePage.js    # Home page
│   │   │   ├── BookPage.js    # Book details page
│   │   │   └── ProfilePage.js # User profile page
│   │   ├── redux/
│   │   │   ├── actions/
│   │   │   ├── reducers/
│   │   │   └── store.js
│   │   ├── App.js
│   │   ├── index.js
│   └── package.json           # Frontend dependencies and scripts
├── package.json               # Project dependencies and scripts
├── README.md                  # Project documentation
└── .gitignore                 # Git ignore file
```
 
