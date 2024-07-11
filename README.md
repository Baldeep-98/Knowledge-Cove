# Knowledge-Cove
Knowledge Cove Library Management System

## Introduction
Welcome to Knowledge Cove, a modern library management system designed to enhance the library experience in the digital age. Our platform allows users to issue books and reserve private study rooms at the library. Recognizing the need for digital solutions in today's fast-paced world, Knowledge Cove aims to provide convenient access to library resources and services, addressing the needs of users who may not have the time to visit the library in person.

## Features
- **Book Issuance:** Users can browse and issue books online.
- **Room Reservation:** Users can book private rooms for study at the library.
- **User Management:** Admins can manage user accounts and book inventory.
- **Profile Management:** Users can edit their profile and generate a library card.
- **Subscription Services:** Users can purchase memberships and additional services.

## Tools and Technologies

### Front-end:
- **React.js with Redux:** Used for building the user interface and managing the application state. Redux offers a centralized state management system, making it ideal for large and complex applications.
  - **Reason for Choice:** Centralized state management, performance optimizations, scalability, and ease of development.

### Back-end:
- **Node.js:** Chosen for its ability to handle high server loads, scalability, and fast development. It also supports JSON APIs, making it a perfect fit for our project.

### Database:
- **MongoDB:** A schema-less database model using documents and collections to store data. Known for high performance and flexibility.

## Project Pages and Functionality
We have designed the following six pages to ensure the website is user-friendly for both administrators and users:

1. **Login/Signup Page:**
   - **Administrator:** Can add, edit, and remove books, manage users, and track book checkouts.
   - **User:** Can create a library card and edit their profile.

2. **Catalogue Page:**
   - Users can see all the books that are currently in the library. They can also add that book to their cart by clicking on the add to cart button from this page. Users can also filter the books according to their choice and see the details about the book such as book name, author name, and long and short description of that book.

3. **CheckOut Page:**
   - Allows users to fill out necessary information to purchase a book. Users can also choose to pick up the book from the nearest branch. In this page, there will be a form of user as well as book information and payment method that the user has to complete and place their order.

4. **Rooms Page:**
   - Users can select a private room for their studies and also select the date and time they want to book the room. Once the user books the room, the room will be available for 1 hour to the user. If the user wants to use the room after 1 hour, they have to rebook the room again.

5. **Cart Page:**
   - Users can see all the books that have been added from the catalogue page and can also remove books from their cart or can proceed further with their items in the cart.

6. **User Profile Page:**
   - Users can edit their information (first name, last name, mobile number, billing address) and generate a library card.

7. **Subscription Page:**
   - Users can purchase memberships and additional services.

8. **Admin Page:**
   - Admins can manage all book records and user information through this dashboard and also can perform CRUD operations on the books.

## Installation
To start Knowledge Cove project, follow these steps:

1. Clone the Repository:
    ```sh
    git clone https://github.com/Baldeep-98/Knowledge-Cove.git
    cd knowledge-cove
    ```

2. Install dependencies:
    - For frontend:
        ```sh
        cd frontend
        npm install
        ```
    - For backend:
        ```sh
        cd backend
        npm install
        ```

3. Run the application:
    - For frontend:
        ```sh
        cd frontend
        npm start
        ```
    - For backend:
        ```sh
        cd backend
        npm start
        ```
