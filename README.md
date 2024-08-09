# FE NC News

This is a news application built with React for the frontend, using React Router for navigation and Context API for state management. Axios is used for API calls. The platform allows users to read and interact with articles on various topics.

## Deployed Version

You can access the deployed version of the app here: [FE NC News](https://fe-nc-news-gui8.onrender.com/)

## Backend Repository

The backend for this project is available at: [BE NC News](https://github.com/filosoho/nc-news)

## General Information

FE NC News is a frontend application that allows users to view articles, vote on them and add comments. The app provides different categories of articles and users can filter articles by topics. Users can also log in to interact more deeply with the content.

### Key Features

- View a list of articles
- Filter articles by topic
- View individual articles with detailed content
- Vote on articles
- Add and delete comments on articles

## Node Version

The minimum version of Node required to run this project locally is `v16.0.0`.

## Running the Project Locally

To run this project locally, follow these steps:

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-repo/fe-nc-news.git
   ```

2. Navigate to the project directory

   ```bash
   cd fe-nc-news
   ```

3. Install the dependencies

   ```bash
   npm install
   ```

4. Create a .env file in the root of your project.

   If you are adding your own API, please make sure you are following the documentation on how to structure it [here](https://nc-news-api-backend.onrender.com/api). You can find there a detailed information on available endpoints, request methods, and examples.

   Recommended extension to view JSON files [JSON Viewer Pro](https://chromewebstore.google.com/detail/json-viewer-pro/eifflpmocdbdmepbjaopkkhbfmdgijcc).

   And add either the nc-news backend API as below or your own API base URL.

   ```bash
   VITE_API_URL=https://nc-news-api-backend.onrender.com/api
   ```

5. Run the development server

   ```bash
   npm run dev
   ```

6. Build the project for production

   ```bash
   npm run build
   ```

7. Preview the production build

   ```bash
    npm run preview
   ```

## Additional Information

This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by [Northcoders](https://northcoders.com/).
