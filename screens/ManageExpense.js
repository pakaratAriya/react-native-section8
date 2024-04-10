import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { GlobalStyles } from "../constant/styles";
import IconButton from "../components/UI/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { expenseActions } from "../store/redux/expenseSlice";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { deleteExpense, storeExpense, updateExpense } from "../utils/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

function ManageExpenseScreen({ route }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();
  const editedExpensedId = route.params?.expensedId;
  const navigation = useNavigation();
  const isEditing = !!editedExpensedId;
  const dispatch = useDispatch();
  const allExpenses = useSelector((state) => state.expenses);
  const selectedExpense = allExpenses.find(
    (expense) => expense.id === editedExpensedId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  async function deleteHandler() {
    setIsSubmitting(true);
    try {
      await deleteExpense(editedExpensedId);
      dispatch(expenseActions.removeExpense({ id: editedExpensedId }));
      navigation.goBack();
    } catch (err) {
      setError("Could not delete the expense!");
    }
  }

  function cancelHandler() {
    navigation.goBack();
  }

  function confirmErrorHandler() {
    setError(null);
  }

  async function confirmHandler(expenseData) {
    setIsSubmitting(true);
    try {
      if (isEditing) {
        await updateExpense(editedExpensedId, expenseData);
        dispatch(
          expenseActions.updateExpense({ ...expenseData, id: editedExpensedId })
        );
      } else {
        const id = await storeExpense(expenseData);
        dispatch(
          expenseActions.addExpense({
            ...expenseData,
            id: id,
          })
        );
      }
      navigation.goBack();
    } catch (err) {
      setIsSubmitting(false);
      setError(`Could not ${isEditing ? "update" : "add"} the expense!`);
    }
  }

  if (isSubmitting) {
    return <LoadingOverlay />;
  }
  if (error && !isSubmitting) {
    return <ErrorOverlay message={error} onConfirm={confirmErrorHandler} />;
  }
  return (
    <View style={styles.container}>
      <ExpenseForm
        submitButtonLabel={isEditing ? "Update" : "Add"}
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
        defaultValues={selectedExpense}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteHandler}
          />
        </View>
      )}
    </View>
  );
}

export default ManageExpenseScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },

  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
