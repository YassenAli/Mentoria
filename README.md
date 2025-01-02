# <div style="display: flex;"><img src="https://github.com/user-attachments/assets/27508675-a803-4e56-ba23-45a784429362" alt="logo">


# Online Course Platform (Mentoria)🏫
![p1](https://github.com/user-attachments/assets/ca049c85-4cdf-43f3-8cc2-f17748602b0a)

![p2](https://github.com/user-attachments/assets/ac7cdc0c-a287-45dd-be6c-b5b37a3265b4)


## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [Contact](#contact)
<!-- - [Project Structure](#project-structure) -->
<!-- - [Environment Variables](#environment-variables) -->

## Project Overview

This project is an **Online Course Platform** that allows instructors to create courses and students to enroll in and review courses. The backend is built with **Node.js** and **MongoDB**, with **JWT-based authentication** and integration with **Amazon S3** for file uploads. The frontend team uses **TypeScript** for the client-side development.

## Features

- **User Authentication with JWT Refresh Tokens:**
  - User registration and login with email and password.
  - JWT-based authentication with access and refresh tokens.
  - OAuth login with Google and Facebook.

- **Course Management:**
  - Instructors can create, update, and delete courses.
  - Students can enroll in and review courses.
  - Course search functionality with filters.

- **File Uploads to Amazon S3:**
  - Instructors can upload course materials (e.g., videos, PDFs).
  - Files are securely stored in Amazon S3, and URLs are saved in MongoDB.

- **Track Course Progress:**
  - Students can track their progress in courses.

## Technologies Used

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB with Mongoose
  - JSON Web Tokens (JWT) for authentication
  - Passport.js for OAuth (Google, Facebook)
  - Amazon S3 for file storage

- **Frontend:**
  - TypeScript
  - React.js

- **DevOps:**
  - Git & GitHub for version control

<!-- ## Project Structure -->

## Getting Started

### Prerequisites

- **Node.js** and **npm** installed on your local machine.
- **MongoDB** database setup (local or cloud).
- **Amazon S3** bucket for storing course materials.
- **Google** and **Facebook** OAuth credentials (Client ID & Secret).

## API Documentation

API documentation for the Online Course Platform is available through **Swagger**. You can view the API documentation by running the server and visiting the following URL in your browser:

```bash
    http://localhost:5000/api-docs
```

Swagger will provide detailed information on the available endpoints, including request methods, parameters, and example responses. You can also use Swagger to interact with the API directly from your browser.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a Pull Request.

## Contact

This project is maintained by:

- **Yassin Ali** - Backend Developer (Node JS)
- **Youssef Ali** - Frontend Developer (TypeScript, React.js)

For any inquiries, feel free to reach out:

- **Yassin Ali** - [LinkedIn](https://www.linkedin.com/in/yassin-ali-10497a252/) | Email: yassinalilearning77076@gmail.com
- **Youssef Ali** - [LinkedIn](https://www.linkedin.com/in/youssef-ali-840227217/) | Email: aliy94476@gmail.com
