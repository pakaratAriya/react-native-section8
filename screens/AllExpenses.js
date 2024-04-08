import { useSelector } from "react-redux";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";

function AllExpensesScreen() {
  const expenses = useSelector((state) => state.expenses);
  return (
    <ExpensesOutput
      expenses={expenses}
      periodName="Total"
      infoText="No registered expenses found!!"
    />
  );
}

export default AllExpensesScreen;
