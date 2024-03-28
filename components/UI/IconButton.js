import { Pressable, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function IconButton({ icon, size, color, onPress }) {
  return (
    <Pressable
      style={({ pressed }) => (pressed ? styles.pressed : null)}
      onPress={onPress}
    >
      <View>
        <Ionicons
          style={styles.iconStyle}
          name={icon}
          size={size}
          color={color}
        />
      </View>
    </Pressable>
  );
}

export default IconButton;

const styles = StyleSheet.create({
  iconStyle: {
    borderRadius: 24,
    padding: 6,
    marginHorizontal: 8,
    marginVertical: 2,
  },
  pressed: {
    opacity: 0.75,
  },
});
