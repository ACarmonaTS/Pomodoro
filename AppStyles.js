import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    width: "100%",
    height: 120,

    flexDirection: "row",
    alignItems: "center",

    marginTop: -18,
    paddingTop: 10,
    
    backgroundColor: "black",
  },

  containerLogo: {
    width: 50,
    height: 50,

    alignItems: "center",
    justifyContent: "center",

    borderRadius: 10,

    backgroundColor: "white",
  },

  logo: {
    width: 40,
    height: 40,
  },

  text: {
    fontSize: 40,
    fontWeight: "600",
    color: "white",

    marginLeft: 10,
  },

  button: {
    width: "70%",
    
    padding: 15,
    marginTop: 15,

    borderRadius: 15,

    alignItems: "center",
  },
});

export default styles
