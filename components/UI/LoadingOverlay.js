import { View, ActivityIndicator, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constant/styles";

function LoadingOverlay() {
  return (
    <View style={styles.container}>
      <ActivityIndicator color="white" size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: GlobalStyles.colors.primary700,
    padding: 24,
  },
});

export default LoadingOverlay;
