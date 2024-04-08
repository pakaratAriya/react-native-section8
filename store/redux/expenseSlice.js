import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: "e1",
    description: "A pair of shoes",
    amount: 59.99,
    date: new Date("2021-03-24"),
  },
  {
    id: "e2",
    description: "A pair of trousers",
    amount: 89.29,
    date: new Date("2022-01-24"),
  },
  {
    id: "e3",
    description: "Some bananas",
    amount: 5.99,
    date: new Date("2021-12-01"),
  },
  {
    id: "e4",
    description: "A book",
    amount: 14.99,
    date: new Date("2022-02-10"),
  },
  {
    id: "e5",
    description: "A book",
    amount: 18.59,
    date: new Date("2023-11-19"),
  },
  {
    id: "e6",
    description: "A pair of shoes",
    amount: 59.99,
    date: new Date("2021-03-24"),
  },
  {
    id: "e7",
    description: "A pair of trousers",
    amount: 89.29,
    date: new Date("2022-04-24"),
  },
  {
    id: "e8",
    description: "Some bananas",
    amount: 5.99,
    date: new Date("2021-12-01"),
  },
  {
    id: "e9",
    description: "A book",
    amount: 14.99,
    date: new Date("2022-02-10"),
  },
  {
    id: "e10",
    description: "A book",
    amount: 18.59,
    date: new Date("2024-04-01"),
  },
];

const expenseSlice = createSlice({
  name: "expenses",
  initialState: initialState,
  reducers: {
    addExpense(state, action) {
      state.push(action.payload);
      return state;
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
