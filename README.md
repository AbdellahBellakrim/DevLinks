# DevLinks

DevLinks is a modern link-sharing application that allows users to manage and share their favorite links effortlessly. The app features functionalities such as link CRUD operations, profile management, drag-and-drop reordering, and responsive design. It is built with a powerful tech stack including Hasura Cloud, PostgreSQL, Auth0, React, Apollo Client, TailwindCSS, and NextUI.

## Live Demo

You can find a live version of DevLinks hosted at:

[https://dev-links-beta-five.vercel.app/](https://dev-links-beta-five.vercel.app/)

Feel free to explore the application and its features!

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup and Installation](#setup-and-installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)

## Features

- **CRUD Operations for Links**: Create, read, update, and delete links.
- **Link Validations**: Validate URL patterns and mandatory fields.
- **Drag and Drop**: Reorder links via drag and drop.
- **Profile Management**: Add and update profile details such as profile picture, first name, last name, and email.
- **Profile Preview**: Preview and copy your DevLinks profile link.
- **Responsive Design**: Optimal layout for different screen sizes.
- **Interactive States**: Hover and focus states for all interactive elements.
- **Full-Stack Capabilities**:
  - **Bonus**: Save details to a database.
  - **Bonus**: User authentication with account creation and login.

## Tech Stack

### Backend

- **Hasura Cloud**: GraphQL API
- **PostgreSQL**: Database
- **Auth0**: Authentication

### Frontend

- **React**: UI Library
- **Apollo Client**: State management and GraphQL client
- **TailwindCSS**: Utility-first CSS framework
- **NextUI**: Component library
- **External Libraries**:
  - `react-hook-form`: Form handling
  - `zod`: Schema validation
  - `react-hot-toast`: Notifications

## Setup and Installation

### Prerequisites

- Node.js
- npm
- PostgreSQL database
- Auth0 account
- Hasura Cloud account
- Cloudinary account

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/devlinks.git
cd devlinks

```

1. Rename `.env.example` to `.env` and add your credentials:

```bash
mv .env.example .env

```

1. Install dependencies:

```bash
npm install

```

1. Run the development server:

```bash
npm run dev

```

1. Open your browser and navigate to `http://localhost:3000`.

## Environment Variables

Ensure you set up the following environment variables in your `.env` file:

```
plaintextCopy code
NEXT_PUBLIC_HASURA_GRAPHQL_URL=<Your Hasura GraphQL URL>
NEXT_PUBLIC_AUTH0_DOMAIN=<Your Auth0 Domain>
NEXT_PUBLIC_AUTH0_CLIENT_ID=<Your Auth0 Client ID>
NEXT_PUBLIC_AUTH0_REDIRECT_URI=<Your Auth0 Redirect URI>
NEXT_PUBLIC_AUTH0_AUDIENCE=<Your Auth0 Audience>
NEXT_PUBLIC_POSTGRESQL_URL=<Your PostgreSQL URL>

```

## Usage

Once the application is running, you can:

- Create, read, update, and delete links.
- Drag and drop links to reorder them.
- Add and update profile details.
- Preview your profile and copy the link.
- Register and log in to manage your links and profile.

## Contact

Feel free to reach out if you have any questions, suggestions, or feedback about this project. I'm always open to discussing DevLinks and potential improvements or collaborations.
