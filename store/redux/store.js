import { configureStore } from "@reduxjs/toolkit";
import { expenseReducer } from "./expenseSlice";

export const expenseStore = configureStore({
  reducer: { expenses: expenseReducer },
  middleware: () => [],
});
