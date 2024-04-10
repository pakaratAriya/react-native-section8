import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const expenseSlice = createSlice({
  name: "expenses",
  initialState: initialState,
  reducers: {
    addExpense(state, action) {
      state.unshift(action.payload);
      return state;
    },
    setExpense(state, action) {
      return action.payload.reverse();
    },
    removeExpense(state, action) {
      return state.filter((expense) => expense.id !== action.payload.id);
    },
    updateExpense(state, action) {
      const expenseIndex = state.findIndex(
        (expense) => expense.id == action.payload.id
      );
      if (expenseIndex !== -1) {
        state[expenseIndex] = action.payload;
      }
      return state;
    },
  },
});

export const expenseReducer = expenseSlice.reducer;
export const expenseActions = expenseSlice.actions;
