import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function HomeScreen({ navigation }) {
  return (
    <ImageBackground source={require('./assets/wizad.jpeg')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.title}>
          Welcome to Arithmetica's Magical Math Training!
        </Text>
        <Text style={styles.instructions}>
          Arithmetica needs your help to pass her challenging math exam and become a true wizard! 
          Solve math problems to cast spells and defeat magical creatures!
        </Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('GameScreen')}>
          <Text style={styles.buttonText}>Start Training</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

function GameScreen({ navigation }) {
  const [question, setQuestion] = useState({ num1: 5, num2: 3, operator: '+' });
  const [answer, setAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30); // Tcode for time limit set in seconds
  const [difficulty, setDifficulty] = useState('Apprentice');
  const [timeWarpActive, setTimeWarpActive] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prevTime => timeWarpActive ? prevTime - 0.5 : prevTime - 1); // wrap slows down time
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft, timeWarpActive]);

  const handleAnswerSubmit = () => {
    const correctAnswer = eval(`${question.num1} ${question.operator} ${question.num2}`);
    if (parseInt(answer) === correctAnswer) {
      setScore(score + 10);
      setTimeLeft(timeLeft + 5); // time added for correct answers
      // the generation of new questions is this piece of code
      setQuestion({ num1: Math.floor(Math.random() * 10), num2: Math.floor(Math.random() * 10), operator: '+' });
    } else {
      setTimeLeft(timeLeft - 5); // Penalty for wrong answer
    }
    setAnswer('');
  };

  return (
    <ImageBackground source={require('./assets/wizad2.jpeg')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.difficulty}>Difficulty: {difficulty}</Text>
        <Text style={styles.score}>Score: {score}</Text>
        <Text style={styles.question}>
          Solve: {question.num1} {question.operator} {question.num2}
        </Text>
        <TextInput
          value={answer}
          onChangeText={setAnswer}
          keyboardType="numeric"
          style={styles.input}
        />
        <TouchableOpacity style={styles.button} onPress={handleAnswerSubmit}>
          <Text style={styles.buttonText}>Submit Answer</Text>
        </TouchableOpacity>
        <Text style={styles.timeLeft}>Time Left: {Math.ceil(timeLeft)}s</Text>
        <TouchableOpacity style={styles.button} onPress={() => setTimeWarpActive(!timeWarpActive)}>
          <Text style={styles.buttonText}>Activate Time Warp</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ResultScreen', { score })}>
          <Text style={styles.buttonText}>End Game</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

function ResultScreen({ route, navigation }) {
  const { score } = route.params;

  const feedback = score > 50 ? 'Well done, Arithmetica! You are shaping your way into becoming a powerful wizard!' : 'Keep practicing, young wizard! You can do even better!';

  return (
    <ImageBackground source={require('./assets/wizad3.jpeg')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.score}>Final Score: {score}</Text>
        <Text style={styles.feedback}>{feedback}</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('GameScreen')}>
          <Text style={styles.buttonText}>Continue Training</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="GameScreen" component={GameScreen} />
        <Stack.Screen name="ResultScreen" component={ResultScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', 
  },
  title: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'it'
  },
  instructions: {
    marginVertical: 20,
    fontSize: 16,
    lineHeight: 22,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'it'

  },
  difficulty: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'it'
  },
  score: {
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'it'
  },
  question: {
    fontSize: 24,
    marginVertical: 20,
    color: 'white',
    fontFamily: 'it'
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginVertical: 20,
    fontSize: 18,
    backgroundColor: 'white',
  },
  timeLeft: {
    fontSize: 24,
    marginVertical: 20,
    color: 'white',
  },
  feedback: {
    fontSize: 20,
    marginVertical: 20,
    color: 'white',
    fontFamily: 'it'
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10,
    
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'it'
  },
});
