import { useSelector } from "react-redux";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { getDateBeforeNumberOfDays } from "../utils/date";

function RecentExpensesScreen() {
  const expenses = useSelector((state) => state.expenses);
  const recentExpenses = expenses.filter((expense) => {
    const today = new Date();
    const date7DaysBefore = getDateBeforeNumberOfDays(today, 7);
    return expense.date > date7DaysBefore;
  });
  return (
    <ExpensesOutput
      expenses={recentExpenses}
      periodName="Last 7 Days"
      infoText="No registered expenses found in last 7 days!!"
    />
  );
}

export default RecentExpensesScreen;
