![alt text](public/International_Pokémon_logo.svg)

##
# Pokémon Search App

This is a simple Pokémon search app built using Next.js, TypeScript, Tailwind CSS, and the Pokémon API.

## Features

- List Display: Display the names of the first 20 Pokémon in a vertical list.
- View detailed information about each Pokémon when selected from the list.
- Search for a Pokémon by name and when hitting submit, view detailed information about this Pokémon.
- Load more button: A button at the bottom of the list that when clicked it fetches next set of 20 Pokémon and appends them results to the existing list.
- Type-based color changes for Pokémon names in details page.
- Responsive design using Tailwind CSS
- Custom 404 error page if the endpoint returns no data.

## Tech Stack

- **Next.js:** 13.5.6
- **Node.js:** 20.11.1
- **TypeScript**
- **Tailwind CSS**
- **Pokémon API**

## Setup

1. Clone the repository
2. Run `npm install` to install the dependencies
3. Run `npm run dev` to start the development server
4. Navigate to `http://localhost:3000` to see the app.
