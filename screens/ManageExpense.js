import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";
import { GlobalStyles } from "../constant/styles";
import IconButton from "../components/UI/IconButton";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/UI/Button";
import { expenseActions } from "../store/redux/expenseSlice";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";

function ManageExpenseScreen({ route }) {
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

  function deleteHandler() {
    dispatch(expenseActions.removeExpense({ id: editedExpensedId }));
    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack();
  }

  function confirmHandler(expenseData) {
    if (isEditing) {
      dispatch(
        expenseActions.updateExpense({ ...expenseData, id: editedExpensedId })
      );
    } else {
      dispatch(
        expenseActions.addExpense({
          ...expenseData,
          id: Math.floor(Math.random() * 100),
        })
      );
    }
    navigation.goBack();
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
