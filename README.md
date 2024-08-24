# Connect 5

Connect 5 is an engaging daily guessing game where players attempt to identify a football (soccer) team based on five of its players. This project is built using Remix, React, and TypeScript, offering a fun and challenging experience for football enthusiasts.

## Features

- Daily challenge: A new team is selected each day for players to guess.
- Progressive reveal: Players see one player at a time, with a new player revealed after each incorrect guess.
- Team selection: Users can choose from a list of teams, with incorrect guesses being removed from the options.
- Persistence: The game tracks whether a user has played on a given day using local storage.
- Responsive design: The game is playable on both desktop and mobile devices.

## Technical Overview

- **Frontend**: Built with React and TypeScript, utilizing Remix for server-side rendering and routing.
- **State Management**: Uses React hooks (useState, useEffect) for local state management.
- **Styling**: Employs Tailwind CSS for responsive and customizable styling.
- **Data**: Player and team data is stored in JSON format.
- **Game Logic**:
  - Team selection is randomized, ensuring a different experience each day.
  - Players are shuffled and sorted based on the number of clubs they've played for.
  - Game states are pre-generated and selected based on the current date.

## Key Components

- `Index`: The main game component, handling game state and user interactions.
- `PlayerBand`: Displays the player cards, revealing them progressively.
- `TeamSelect`: Allows users to select a team from the available options.
- `HoverHelp`: Provides information about how to play the game.

## Utilities

- `index_utils.ts`: Contains core game logic, including team selection and game state management.
- `gameState.ts`: Manages available teams and resets the game when all teams have been used.

## Testing

The project includes Jest tests for core utility functions, ensuring the reliability of game state calculations and date handling.

## Getting Started

1. Clone the repository
2. Install dependencies with `npm install`
3. Run the development server with `npm run dev`
4. Visit `localhost:3000` in your browser to play the game

## License

This project is open source and available under the [MIT License](LICENSE).
