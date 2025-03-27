import React, { useState } from 'react';
import { View, Text, Button, TextInput, Alert } from 'react-native';

export default function TicketValidationApp() {
  const [customTime, setCustomTime] = useState('');
  const [totalCost, setTotalCost] = useState(0);
  const [isInputVisible, setInputVisible] = useState(false);

  const handleOneMinuteTicket = () => {
    setTotalCost(3); // 1 minuto custa R$ 3,00
  };

  const handleTwoMinutesTicket = () => {
    setTotalCost(5); // 2 minutos custam R$ 5,00
  };

  const handleCustomTimeTicket = () => {
    setInputVisible(true); // Exibe o input para o usuário digitar o tempo
  };

  const handleTimeInput = () => {
    const timeInMinutes = parseInt(customTime, 10);

    if (isNaN(timeInMinutes) || timeInMinutes < 2) {
      Alert.alert('Erro', 'O tempo deve ser maior que 2 minutos!');
      return;
    }

    let cost = 5; // Os 2 primeiros minutos custam R$ 5,00

    // Se o tempo for maior que 2 minutos, o custo adicional será R$ 1,50 por minuto
    if (timeInMinutes > 2) {
      const additionalMinutes = timeInMinutes - 2;
      cost += additionalMinutes * 1.5;
    }

    // Desconto a cada 10 minutos
    const discountMultiplier = Math.floor(timeInMinutes / 10) * 0.05;
    cost *= (1 - discountMultiplier); // Aplica o desconto no custo

    if (timeInMinutes > 30) {
      Alert.alert('Erro', 'O limite de tempo por cliente é de 30 minutos!');
      return;
    }

    setTotalCost(cost.toFixed(2)); // Atualiza o custo total com duas casas decimais
    setInputVisible(false); // Esconde o input após calcular o preço
    setCustomTime(''); // Reseta o tempo inserido
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Validação de Tickets</Text>

      <Button title="1 Minuto - R$ 3,00" onPress={handleOneMinuteTicket} />
      <Button title="2 Minutos - R$ 5,00" onPress={handleTwoMinutesTicket} />
      <Button title="Tempo Indeterminado" onPress={handleCustomTimeTicket} />

      {isInputVisible && (
        <View style={{ marginTop: 20 }}>
          <Text>Digite o tempo desejado (em minutos):</Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: '#ccc',
              padding: 8,
              marginVertical: 10,
              fontSize: 16,
            }}
            keyboardType="numeric"
            value={customTime}
            onChangeText={setCustomTime}
          />
          <Button title="Calcular" onPress={handleTimeInput} />
        </View>
      )}

      <Text style={{ marginTop: 20, fontSize: 18 }}>
        Custo Total: R$ {totalCost}
      </Text>
    </View>
  );
}
