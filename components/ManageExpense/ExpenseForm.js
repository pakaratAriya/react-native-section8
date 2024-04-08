import { Alert, StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import Input from "./Input";
import Button from "../UI/Button";
import { getFormattedDate } from "../../utils/date";
import { GlobalStyles } from "../../constant/styles";

function ExpenseForm({ submitButtonLabel, onSubmit, onCancel, defaultValues }) {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : "",
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : "",
      isValid: true,
    },
  });
  function valueChangeHandler(inputType, enteredValue) {
    setInputs((prev) => ({
      ...prev,
      [inputType]: { value: enteredValue, isValid: true },
    }));
  }

  function submitHandler() {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };
    const isAmountValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const isDateValid = expenseData.date.toString() !== "Invalid Date";
    const isDescriptionValid =
      expenseData.description && expenseData.description.trim().length > 0;

    if (!isAmountValid || !isDateValid || !isDescriptionValid) {
      setInputs((prev) => ({
        amount: { value: prev.amount.value, isValid: isAmountValid },
        date: { value: prev.date.value, isValid: isDateValid },
        description: {
          value: prev.description.value,
          isValid: isDescriptionValid,
        },
      }));
      return;
    }
    onSubmit(expenseData);
  }

  const formIsInValid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;
  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          style={styles.rowInput}
          label="Amount"
          isInvalid={!inputs.amount.isValid}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: valueChangeHandler.bind(this, "amount"),
            value: inputs.amount.value,
          }}
        />
        <Input
          style={styles.rowInput}
          label="Date"
          isInvalid={!inputs.date.isValid}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: valueChangeHandler.bind(this, "date"),
            value: inputs.date.value,
          }}
        />
      </View>
      <Input
        label="Description"
        isInvalid={!inputs.description.isValid}
        textInputConfig={{
          multiline: true,
          onChangeText: valueChangeHandler.bind(this, "description"),
          value: inputs.description.value,
          // autoCapitalize: 'none',
          // autoCorrect: false
        }}
      />
      {formIsInValid && (
        <Text style={styles.invalidText}>
          Invalid input values - please check your entered data!
        </Text>
      )}
      <View style={styles.bottonsContainer}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
}

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 80,
  },
  title: {
    color: "white",
    fontSize: 24,
    marginVertical: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  bottonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  invalidText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    marginBottom: 16,
  },
});
