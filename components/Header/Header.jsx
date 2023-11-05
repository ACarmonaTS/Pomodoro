import { View, Text, TouchableOpacity } from "react-native";
import styles from "./HeaderStyles";

const options = ["Pomodoro", "Short Break", "Long Break"];

export default function Header({ currentTime, setCurrentTime, setTime }) {
  function handlePress(index) {
    const newTime = index === 0 ? 25 : index === 1 ? 5 : 15;
    setCurrentTime(index);
    setTime(newTime * 60);
  }
  return (
    <View style={{ flexDirection: "row" }}>
      {options.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handlePress(index)}
          style={[
            styles.itemStyle,
            currentTime !== index
              ? { backgroundColor: "black" }
              : {
                  backgroundColor: "white",
                  borderTopLeftRadius: 15,
                  borderTopRightRadius: 15,
                },
          ]}
        >
          <Text
            style={[
              styles.itemText,
              currentTime !== index ? { color: "white" } : { color: "black" },
            ]}
          >
            {item}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
