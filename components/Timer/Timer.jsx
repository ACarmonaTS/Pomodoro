import { Text, View } from "react-native";
import styles from "./TimerStyles";

export default function Timer({ time }) {
  const formattedTime = `${Math
    .floor(time / 60)
    .toString()
    .padStart(2, "0")}:${(time % 60)
    .toString()
    .padStart(2, "0")}`;
  return (
    <View style={styles.container}>
      <Text style={styles.time}>{formattedTime}</Text>
    </View>
  );
}

