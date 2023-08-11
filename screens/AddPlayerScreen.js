import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { addPlayer } from '../store/reducers/PlayerReducer';


const AddPlayerScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [score, setScore] = useState('');

  const handleSave = () => {
    if (!name || !country || !score) {
      Alert.alert('Error', 'All fields are required');
      return;
    }

    const scoreInt = parseInt(score);
    if (isNaN(scoreInt) || scoreInt < 0) {
      Alert.alert('Error', 'Invalid score');
      return;
    }

    if (name.length > 15) {
      Alert.alert('Error', 'Name should not exceed 15 characters');
      return;
    }

    if (country.length !== 2) {
      Alert.alert('Error', 'Country code should be two letters');
      return;
    }

    Alert.alert(
      'Confirm',
      'Do you want to save this player?',
      [
        { text: 'No', style: 'cancel' },
        { text: 'Yes', onPress: () => savePlayer(name, country, scoreInt) },
      ],
      { cancelable: true }
    );
  };

  const savePlayer = (name, country, score) => {
  

    dispatch(addPlayer({name, country, score })); 

    Alert.alert('Success', 'Player added successfully!', [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        onChangeText={setName}
        maxLength={15}
      />
      <TextInput
        style={styles.input}
        placeholder="Country"
        onChangeText={setCountry}
        maxLength={2}
      />
      <TextInput
        style={styles.input}
        placeholder="Score"
        onChangeText={setScore}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 20,
    borderRadius: 8,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddPlayerScreen;
