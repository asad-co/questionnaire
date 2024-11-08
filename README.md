# Full Stack Application

## Overview

This full-stack application is designed to record survey based on questions. This app is a 4 step survey that uses email as its primary element. It is built using modern web technologies to ensure a seamless user experience and efficient performance.

## Features

- **Responsive Design**: Works on all devices, from mobile to desktop.


## Technologies Used

### Frontend

- **Vite-React**: For building the user interface.
- **Context API**: For state management.
- **React Router**: For navigation.
- **Fetch API**: For making HTTP requests.

### Backend

- **Node.js**: For server-side logic.
- **Express**: For building the RESTful API.
- **Supabase**: For temporary survey record storage while its in progress.
- **MongoDB**: For final survey record storage.
- **Mongoose**: For object data modeling (ODM).

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/asad-co/questionnaire.git
   ```

2. **Navigate to the project directory**:
   ```bash
   cd questionnaire
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Set up environment variables**:
   Create a `.env` file in the root directory and add the following:
   ```
   VITE_BACKEND_URL=node-js backend url
   ```

5. **Run the application**:
   ```bash
   npm start
   ```
6. **For backend navigate to the api directory**:
   ```bash
   cd api
   ```

3. **Install dependencies**:
   ```bash
   npm install
   npm install nodemon -g
   ```

4. **Set up environment variables**:
   Create a `.env` file in the root directory and add the following:
   ```
   DB_Name=YourMongoDBName
   DB_SET_NAME=YourMongoDBSetName
   DB_USERNAME=YourMongoDBUsername
   DB_PASSWORD=YourMongoDBPassword
   SUPABASE_URL=YourSupabaseURL
   SUPABASE_PUBLIC_ANON_KEY=YourSupabasePublicAnonKey
   ```

5. **Run the application**:
   ```bash
   npm run serve
   ```

## Usage

- **Access the application**: Open your browser and go to `http://localhost:3000`.
- **Enter Email**: Enter your email address.
- **Complete the survey**: Choose shoes color and rate them, you can also edit your survey later.


## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any questions or feedback, please contact me at [syedasadm2001@gmail.com].