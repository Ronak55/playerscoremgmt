import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { editPlayer } from '../store/reducers/PlayerReducer';

const EditPlayerScreen = ({ route, navigation }) => {
  const { playerId } = route.params;
  const dispatch = useDispatch();

  const player = useSelector(state => state.player.players.find(player => player.id === playerId));

  const [editedPlayer, setEditedPlayer] = useState({ ...player });

  const handleSave = () => {
    if (!editedPlayer.name || !editedPlayer.country || editedPlayer.score === '') {
      Alert.alert('Error', 'All fields are required');
      return;
    }

    const scoreInt = parseInt(editedPlayer.score);
    if (isNaN(scoreInt) || scoreInt < 0) {
      Alert.alert('Error', 'Invalid score');
      return;
    }

    if (editedPlayer.name.length > 15) {
      Alert.alert('Error', 'Name should not exceed 15 characters');
      return;
    }

    if (editedPlayer.country.length !== 2) {
      Alert.alert('Error', 'Country code should be two letters');
      return;
    }

    Alert.alert(
      'Confirm',
      'Do you want to save these changes?',
      [
        { text: 'No', style: 'cancel' },
        { text: 'Yes', onPress: () => savePlayerChanges() },
      ],
      { cancelable: true }
    );
  };

  const savePlayerChanges = () => {
    dispatch(editPlayer(editedPlayer)); 

    Alert.alert('Success', 'Player details updated successfully', [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={editedPlayer.name}
        onChangeText={name => setEditedPlayer({ ...editedPlayer, name })}
        maxLength={15}
      />
      <TextInput
        style={styles.input}
        placeholder="Country"
        value={editedPlayer.country}
        onChangeText={country => setEditedPlayer({ ...editedPlayer, country })}
        maxLength={2}
      />
      <TextInput
        style={styles.input}
        placeholder="Score"
        value={editedPlayer.score.toString()}
        onChangeText={score => setEditedPlayer({ ...editedPlayer, score })}
        keyboardType="numeric"
      />
      <Button title="Save Changes" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 20,
    borderRadius: 8,
    fontSize: 16,
  },
});

export default EditPlayerScreen;
