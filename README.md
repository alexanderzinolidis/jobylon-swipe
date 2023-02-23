# Jobylon Job List

This is a simple React app that fetches job listings from Jobylon's API and allows the user to swipe through them in a Tinder like UI. Each job is displayed as a card that shows its title, company, location, experience required, and employment type.

## Getting started

To get started with this project, you'll need to have Node.js installed. I used `pnpm` to manage the dependencies, but you can use `npm` or `yarn` if you prefer.

1. Clone this repository.
2. Run `pnpm install` to install the dependencies.
3. Run `pnpm start` to start the development server.
4. Open http://localhost:3000 in your web browser to see the app.

## Running tests

To run the tests, run `pnpm test`. This will run the tests in watch mode. To run the tests once, run `pnpm test -- --watchAll=false`.

## Project structure

The main source files for this project are located in the src/ directory. The following is an overview of the most important files and directories:

-   `src/components`: Components in this directory are meant to be generic and reusable. They are used in the `src/pages` directory. No side effects should be performed in these components.

-   `src/pages`: Containers for the pages that make up the app. Components are used to build the structure of a page. The containers
    may contain business logic and interact with the outer world (e.g. by fetching data from an API).

-   `src/types`: This directory contains TypeScript types that are used throughout the app. It's fine to have small types in the same file as the component that uses them, but if a type is used in multiple places, it should be moved to this directory.

-   `src/App.tsx`: Main entry point for the app. This file contains the root wrapper and the router.

## Technologies used

This app uses the following technologies:

-   `React`
-   `Tailwind CSS` for styling
-   `tw-classed` for css-in-js that has great Tailwind support
-   `framer-motion` for the card animations

## TODO

Here are some improvements that could be made to this app:

-   Add filtering UI to the job list page.

-   Clicking on a job card should open a modal with more details.

-   Make the loading state nicer, with a spinner or something.

-   Implement the swipe callbacks on the `SwipeableStack` component.

-   Expose a `useSwipeableStack` hook that allows for programmatic swiping and other actions.

-   Get the jobs API endpoint from an environment variable.

-   Make the 404 page look nicer.
