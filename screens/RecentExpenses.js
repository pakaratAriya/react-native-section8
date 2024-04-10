import { useSelector, useDispatch } from "react-redux";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { getDateBeforeNumberOfDays } from "../utils/date";
import { useEffect, useState } from "react";
import { fetchExpenses } from "../utils/http";
import { expenseActions } from "../store/redux/expenseSlice";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

function RecentExpensesScreen() {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();
  const expenses = useSelector((state) => state.expenses);
  const dispatch = useDispatch();
  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true);
      try {
        const fetchedExpenses = await fetchExpenses();
        dispatch(expenseActions.setExpense(fetchedExpenses));
      } catch (err) {
        setError("Could not fetch the expenses!");
      }
      setIsFetching(false);
    }
    getExpenses();
  }, []);

  const recentExpenses = expenses.filter((expense) => {
    const today = new Date();
    const date7DaysBefore = getDateBeforeNumberOfDays(today, 7);
    const expenseDate = new Date(expense.date);
    return expenseDate > date7DaysBefore;
  });

  function confirmErrorHandler() {
    setError(null);
  }
  if (isFetching) {
    return <LoadingOverlay />;
  }

  if (error && !isFetching) {
    return <ErrorOverlay message={error} onConfirm={confirmErrorHandler} />;
  }
  return (
    <ExpensesOutput
      expenses={recentExpenses}
      periodName="Last 7 Days"
      infoText="No registered expenses found in last 7 days!!"
    />
  );
}

export default RecentExpensesScreen;
