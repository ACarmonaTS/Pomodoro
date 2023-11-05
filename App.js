import { useEffect, useState } from "react";

import { StatusBar } from "expo-status-bar";
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { Audio } from "expo-av";

import Header from "./components/Header";
import Timer from "./components/Timer";

export default function App() {
  const colors = ["#F7DC6F", "#A2D9CE", "#D7BDE2"];
  const optionsTimes = { 0: 25, 1: 5, 2: 15 };

  const [isWorking, setIsWorking] = useState(true);
  const [time, setTime] = useState(25 * 60);
  const [currentTime, setCurrentTime] = useState("WORK" | "SHORT" | "LONG");
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setTime(time - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    if (time === 0) {
      setIsActive(false);
      setIsWorking(!isWorking);
      setTime(optionsTimes[currentTime] * 60);
    }

    return () => clearInterval(interval);
  }, [isActive, time]);

  function handleStartStop() {
    playSound();
    setIsActive((prev) => !prev);
  }

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("./assets/sounds/buzzer.mp3")
    );
    await sound.playAsync();
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors[currentTime] }]}
    >
      <View
        style={{
          flex: 1,
          paddingHorizontal: 15,
          paddingTop: Platform.OS === "android" && 30,
        }}
      >
        <Text style={styles.text}>Pomodoro</Text>
        <Header
          currentTime={currentTime}
          setCurrentTime={setCurrentTime}
          setTime={setTime}
        />
        <Timer style={styles.text} time={time} />
        <TouchableOpacity style={styles.button} onPress={handleStartStop}>
          <Text style={{ color: "white", fontWeight: "bold" }}>
            {isActive ? "STOP" : "START"}
          </Text>
        </TouchableOpacity>
        <StatusBar backgroundColor="green" style="light" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  text: {
    fontSize: 32,
    fontWeight: "bold",
  },

  button: {
    backgroundColor: "#333333",

    padding: 15,
    marginTop: 15,

    borderRadius: 15,

    alignItems: "center",
  },
});
