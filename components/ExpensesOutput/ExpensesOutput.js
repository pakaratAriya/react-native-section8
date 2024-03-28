import { StyleSheet, View } from "react-native";
import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";
import { GlobalStyles } from "../../constant/styles";

const DUMMY_EXPENSES = [
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
    date: new Date("2023-11-19"),
  },
];

function ExpensesOutput({ expenses, periodName }) {
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={periodName} />
      <ExpensesList expenses={DUMMY_EXPENSES} />
    </View>
  );
}

export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 8,
    backgroundColor: GlobalStyles.colors.primary700,
  },
});
