import { createSlice } from "@reduxjs/toolkit"; 
const initialState = {
  // get the flashcards from local storage 
  flashcards: localStorage.getItem("flashcards") 
  // parse the flashcards if they exist
    ? JSON.parse(localStorage.getItem("flashcards")) 
    : [], // if the flashcards don't exist, initialize an empty array
};

export const flashcardSlice = createSlice({ 
  name: "flashcard", // give the slice the name "flashcard"
  initialState, // defined  initial state for the slice
  reducers: {
    setFlashCard(state, action) { // the `setFlashCard` action handler
      state.flashcards.push({ // pushes a new flashcard to the `flashcards` array
        card: action.payload, // the new flashcard is the payload of the `action`
      });
   
      localStorage.setItem("flashcards", JSON.stringify(state.flashcards)); // set the flashcards in local storage
    },
  },
});

export const { setFlashCard } = flashcardSlice.actions; // export the `setFlashCard` action creator

export default flashcardSlice.reducer;