import { useEffect, useState } from "react";

import { StatusBar } from "expo-status-bar";
import {
  Platform,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { Audio } from "expo-av";

import Header from "./components/Header/Header";
import Timer from "./components/Timer/Timer";

import styles from "./AppStyles";

export default function App() {
  // const colors = ["#2FAD00", "#0094AC", "#A5016F"];
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
    <SafeAreaView style={[styles.container, { backgroundColor: "black" }]}>
      <View
        style={{
          flex: 1,
          paddingHorizontal: 20,
          paddingTop: Platform.OS === "android" && 40,
        }}
      >
        <View style={styles.title}>
          <View style={styles.containerLogo}>
            <Image
              style={styles.logo}
              source={require("./assets/images/logo.png")}
            />
          </View>
          <Text style={styles.text}>Pomodoro</Text>
        </View>
        <View
          style={{
            flex: 1,
          }}
        >
          <Header
            currentTime={currentTime}
            setCurrentTime={setCurrentTime}
            setTime={setTime}
          />
          <Timer style={styles.text} time={time} />
          <View>
            <TouchableOpacity
              onPress={handleStartStop}
              style={[
                styles.button,
                isActive
                  ? { backgroundColor: "#C20303" }
                  : { backgroundColor: "#2FAD00" },
              ]}
            >
              <Text
                style={{ color: "white", fontWeight: "bold", fontSize: 30 }}
              >
                {isActive ? "STOP" : "START"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <StatusBar backgroundColor="black" style="light" />
      </View>
    </SafeAreaView>
  );
}
