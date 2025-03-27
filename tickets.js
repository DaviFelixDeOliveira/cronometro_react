import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, Alert } from 'react-native';

export default function TicketValidationApp() {
  // Estado para controlar o tempo personalizado inserido pelo usuário
  const [customTime, setCustomTime] = useState('');

  // Estado para controlar o custo total do ticket
  const [totalCost, setTotalCost] = useState(0);

  // Estado para controlar a visibilidade do campo de input de tempo personalizado
  const [isInputVisible, setInputVisible] = useState(false);

  // Estado para armazenar o tempo acumulado
  const [accumulatedTime, setAccumulatedTime] = useState(0);

  // Estado para controlar se o cronômetro está ativo ou não
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Função que é chamada quando o usuário clica no botão de 1 minuto
  const handleOneMinuteTicket = () => {
    setTotalCost(prevCost => prevCost + 3); // Adiciona R$ 3,00 para 1 minuto
    addTimeToTimer(1); // Adiciona 1 minuto ao cronômetro
  };

  // Função que é chamada quando o usuário clica no botão de 2 minutos
  const handleTwoMinutesTicket = () => {
    setTotalCost(prevCost => prevCost + 5); // Adiciona R$ 5,00 para 2 minutos
    addTimeToTimer(2); // Adiciona 2 minutos ao cronômetro
  };

  // Função que exibe o campo de input para o usuário inserir o tempo desejado
  const handleCustomTimeTicket = () => {
    setInputVisible(true); // Torna o campo de input visível
  };

  // Função que lida com o cálculo do custo quando o usuário insere o tempo personalizado
  const handleTimeInput = () => {
    const timeInMinutes = parseInt(customTime, 10);

    // Verifica se o tempo inserido é um número válido e maior ou igual a 2 minutos
    if (isNaN(timeInMinutes) || timeInMinutes < 2) {
      Alert.alert('Erro', 'O tempo deve ser maior que 2 minutos!');
      return;
    }

    let cost = 5; // O custo dos primeiros 2 minutos é fixo em R$ 5,00

    // Se o tempo inserido for maior que 2 minutos, calcula o custo adicional
    if (timeInMinutes > 2) {
      const additionalMinutes = timeInMinutes - 2;
      cost += additionalMinutes * 1.5; // Cada minuto adicional custa R$ 1,50
    }

    // Calcula o desconto baseado no tempo inserido
    // A cada 10 minutos adicionais, o custo por minuto diminui 5%
    const discountMultiplier = Math.floor(timeInMinutes / 10) * 0.05;
    cost *= (1 - discountMultiplier); // Aplica o desconto ao custo total

    // Verifica se o tempo inserido é superior ao limite de 30 minutos
    if (timeInMinutes > 30) {
      Alert.alert('Erro', 'O limite de tempo por cliente é de 30 minutos!');
      return;
    }

    // Atualiza o custo total do ticket com as regras aplicadas
    setTotalCost(prevCost => prevCost + cost); // Adiciona ao custo total

    // Adiciona o tempo ao cronômetro
    addTimeToTimer(timeInMinutes);

    // Esconde o campo de input de tempo personalizado após calcular o preço
    setInputVisible(false);

    // Reseta o valor do campo de input para limpar a tela
    setCustomTime('');
  };

  // Função que adiciona o tempo ao cronômetro
  const addTimeToTimer = (timeInMinutes) => {
    // Converte minutos para segundos e soma ao tempo acumulado
    setAccumulatedTime(prevTime => prevTime + timeInMinutes * 60);
    if (!isTimerRunning) {
      startTimer(); // Inicia o cronômetro se não estiver rodando
    }
  };

  // Função que inicia o cronômetro
  const startTimer = () => {
    setIsTimerRunning(true); // Marca o cronômetro como ativo

    // Define um intervalo para atualizar o cronômetro a cada segundo
    const timerInterval = setInterval(() => {
      setAccumulatedTime(prevTime => {
        // Quando o tempo acumulado atinge 0, para o cronômetro
        if (prevTime <= 0) {
          clearInterval(timerInterval);
          setIsTimerRunning(false); // Para o cronômetro
          return prevTime;
        }
        return prevTime - 1; // Decrementa 1 segundo
      });
    }, 1000); // Atualiza o cronômetro a cada 1 segundo
  };

  // Converte o tempo acumulado (em segundos) para minutos e segundos
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  // Função para fechar o campo de input
  const handleCloseInput = () => {
    setInputVisible(false); // Fecha o campo de input
    setCustomTime(''); // Limpa o valor do input
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Validação de Tickets</Text>

      {/* Botões para selecionar os tickets de 1 e 2 minutos */}
      <Button title="1 Minuto - R$ 3,00" onPress={handleOneMinuteTicket} />
      <Button title="2 Minutos - R$ 5,00" onPress={handleTwoMinutesTicket} />
      
      {/* Botão para exibir o campo de input para tempo indeterminado */}
      <Button title="Tempo Indeterminado" onPress={handleCustomTimeTicket} />

      {/* Campo de input visível apenas quando o usuário escolhe o tempo personalizado */}
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
            keyboardType="numeric" // Restringe o input para números
            value={customTime} // Valor do campo de input controlado pelo state
            onChangeText={setCustomTime} // Atualiza o state quando o usuário digita algo
          />
          {/* Botões para calcular o custo e fechar o input */}
          <Button title="Calcular" onPress={handleTimeInput} />
          <Button title="Fechar" onPress={handleCloseInput} color="red" />
        </View>
      )}

      {/* Exibe o cronômetro com o tempo acumulado */}
      <Text style={{ marginTop: 20, fontSize: 18 }}>
        Tempo Acumulado: {formatTime(accumulatedTime)}
      </Text>

      {/* Exibe o custo total calculado */}
      <Text style={{ marginTop: 20, fontSize: 18 }}>
        Custo Total: R$ {totalCost.toFixed(2)}
      </Text>
    </View>
  );
}
