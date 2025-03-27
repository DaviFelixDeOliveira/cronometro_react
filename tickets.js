import React, { useState } from 'react';
import { View, Text, Button, TextInput, Alert, StyleSheet } from 'react-native';

const App = () => {
  const [minutes, setMinutes] = useState(0);
  const [customMinutes, setCustomMinutes] = useState('');
  const [price, setPrice] = useState(0);
  
  const calculatePrice = (inputMinutes) => {
    if (inputMinutes <= 2) {
      return 5; // Para 2 minutos obrigatórios
    } else if (inputMinutes > 2 && inputMinutes <= 30) {
      let additionalMinutes = inputMinutes - 2;
      let basePrice = 5 + additionalMinutes * 1.5;
      
      // Desconto por tempo
      let discount = 0;
      if (additionalMinutes >= 10) {
        discount += Math.floor(additionalMinutes / 10) * 5;
      }
      
      let finalPrice = basePrice - (basePrice * discount / 100);
      return finalPrice;
    } else {
      return -1; // Caso o tempo seja superior a 30 minutos
    }
  };

  const handleTicketButtonClick = (time) => {
    const calculatedPrice = calculatePrice(time);
    if (calculatedPrice !== -1) {
      setMinutes(time);
      setPrice(calculatedPrice);
    } else {
      Alert.alert('Erro', 'Você não pode selecionar mais de 30 minutos.');
    }
  };

  const handleCustomInput = () => {
    const inputTime = parseInt(customMinutes);
    if (isNaN(inputTime) || inputTime < 2) {
      Alert.alert('Erro', 'O tempo deve ser maior que 2 minutos.');
    } else if (inputTime > 30) {
      Alert.alert('Erro', 'O tempo não pode ser superior a 30 minutos.');
    } else {
      const calculatedPrice = calculatePrice(inputTime);
      setMinutes(inputTime);
      setPrice(calculatedPrice);
    }
    setCustomMinutes('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Validação de Tickets</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="1 minuto (R$ 3,00)"
          onPress={() => handleTicketButtonClick(1)}
        />
        <Button
          title="2 minutos (R$ 5,00)"
          onPress={() => handleTicketButtonClick(2)}
        />
        <Button
          title="Tempo personalizado"
          onPress={() => setCustomMinutes('')}
        />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Insira o tempo desejado (minutos)"
        keyboardType="numeric"
        value={customMinutes}
        onChangeText={setCustomMinutes}
        onSubmitEditing={handleCustomInput}
      />
      <Text style={styles.result}>Tempo: {minutes} minutos</Text>
      <Text style={styles.result}>Preço: R$ {price.toFixed(2)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    marginBottom: 20,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    width: '80%',
    padding: 10,
    marginBottom: 20,
    textAlign: 'center',
  },
  result: {
    fontSize: 18,
    marginTop: 10,
  },
});

export default App;
