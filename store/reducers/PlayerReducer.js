import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  players: [], // Initial state for players
};

let playerIdCounter = 1;

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {

       // Add a new player to the players array

    addPlayer: (state, action) => {

      const { name, country, score } = action.payload;
      
      const newPlayer = {
        id: Date.now() + playerIdCounter++,
        name,
        country,
        score,
      };

      state.players.push(newPlayer);
  
   
    },

       // Edit a player to the players array

    editPlayer: (state, action) => {
      const { id, name, country, score } = action.payload;

      const playerIndex = state.players.findIndex(player => player.id === id);
      if (playerIndex !== -1) {
        state.players[playerIndex] = { id, name, country, score }; // Update player details
      }

    },

    // Delete a player from the players array

    deletePlayer: (state, action) => {
      const playerId = action.payload;
      state.players = state.players.filter(player => player.id !== playerId); 
    },
  },
});

export const { addPlayer, editPlayer, deletePlayer } = playerSlice.actions;

export default playerSlice.reducer;