import { useState, useEffect } from "react";
import { View, StyleSheet, Text, Pressable, SafeAreaView } from "react-native";


function leftPad(str, len, ch = "0") {
  const strLen = str.length;

  if (strLen < len) {
    return ch.repeat(len - strLen) + str;
  } else {
    return str;
  }
}

let interval;
const App = () => {
  const [count, setCount] = useState(0);
  const [status, setStatus] = useState(false);

  useEffect(() => {
    if (status) {
      interval = setInterval(() => setCount((count) => count + 1), 100);
    } else {
      clearInterval(interval);
    }
  }, [status]);

  const milisegundos = count % 10;
  const segundos = Math.floor(count / 10) % 60;
  const minutos = Math.floor(count / 600);
  const fmt =
    minutos > 0
      ? `${leftPad(minutos, 2)}:${leftPad(
          segundos.toString(),
          2
        )}.${milisegundos}`
      : `${segundos}.${milisegundos}`;

  return (
    <View style={styles.container}>
      <Text style={styles.display}>{fmt}</Text>
      <View style={{ flexDirection: "row", marginInline: "auto" }}>
        <Pressable onPress={() => setStatus((status) => !status)}>
          <Text
            style={{
              ...styles.button,
              backgroundColor: status ? "red" : "green",
            }}
          >
            {status ? "Parar" : "Iniciar"}
          </Text>
        </Pressable>
        <Pressable onPress={() => setCount(0)}>
          <Text style={styles.button}>Redefinir</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    marginBlock: 64,
  },
  display: {
    fontSize: 64,
    fontWeight: "bold",
    textAlign: "center",
  },
  button: {
    backgroundColor: "gray",
    color: "white",
    borderRadius: 4,
    width: "max-content",
    minWidth: 75,
    fontFamily: "system-ui",
    textAlign: "center",
    paddingInline: 8,
    paddingBlock: 6,
    marginInline: "auto",
    marginTop: 12,
  },
});

export default App;
