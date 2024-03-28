import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import { Text, View } from "react-native";

function ManageExpenseScreen({ route }) {
  const editedExpensedId = route.params?.expensedId;
  const navigation = useNavigation();
  const isEditing = !!editedExpensedId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);
  return (
    <View>
      <Text>Manage Expenses Screen</Text>
    </View>
  );
}

export default ManageExpenseScreen;
