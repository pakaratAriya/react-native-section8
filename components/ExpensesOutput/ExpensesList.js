import { FlatList } from "react-native";
import ExpenseItem from "./ExpenseItem";

function renderedExpenseList(itemData) {
  return <ExpenseItem {...itemData.item} />;
}

function ExpensesList({ expenses }) {
  return (
    <FlatList
      data={expenses}
      renderItem={renderedExpenseList}
      keyExtractor={(item) => item.id}
    />
  );
}

export default ExpensesList;
