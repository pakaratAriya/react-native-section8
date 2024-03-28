import { Pressable, View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constant/styles";
import { getFormattedDate } from "../../utils/date";
import { useNavigation } from "@react-navigation/native";

function ExpenseItem({ id, description, date, amount }) {
  const navigation = useNavigation();
  function expensePressHandler() {
    navigation.navigate("ManageExpense", { expensedId: id });
  }
  return (
    <Pressable
      onPress={expensePressHandler}
      style={({ pressed }) => (pressed ? styles.pressed : null)}
    >
      <View style={styles.expenseItem}>
        <View>
          <Text style={[styles.textBase, styles.description]}>
            {description}
          </Text>
          <Text style={styles.textBase}>{getFormattedDate(date)}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={[styles.textBase, styles.amount]}>
            {amount.toFixed(2)}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

export default ExpenseItem;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  expenseItem: {
    padding: 12,
    marginVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 3,
    backgroundColor: GlobalStyles.colors.primary500,
    borderRadius: 6,
    shadowColor: GlobalStyles.colors.gray500,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  textBase: {
    color: GlobalStyles.colors.primary50,
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    minWidth: 80,
  },
  amount: {
    color: GlobalStyles.colors.primary500,
    fontWeight: "bold",
  },
});
