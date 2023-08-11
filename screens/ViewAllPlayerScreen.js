import React from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { deletePlayer } from '../store/reducers/PlayerReducer';

const ViewAllPlayersScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const players = useSelector(state => state.player.players);

  return (
    <View style={styles.container}>
      {players.length === 0 ? (
        <Text style={styles.emptyText}>The player list is empty.</Text>
      ) : (
        <FlatList
          data={players}
          keyExtractor={(item) => (item.id ? item.id.toString() : 'fallback_key')}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.playerItem}
              disabled={true}
  
            >
              <Text style={styles.playerName}>{item.name}</Text>
              <View style={styles.playerDetails}>
                <Text style={styles.detailText}>{`Country: ${item.country.toUpperCase()}`}</Text>
                <Text style={styles.detailText}>{`Score: ${item.score}`}</Text>
              </View>
              
              <View style={styles.editdelete}>
              <Button
                styles={styles.edit}
                title="Edit"
                onPress={() =>
                 {navigation.navigate('EditPlayer', { playerId: item.id})}
                }
              />
                <View style={{ marginTop: 8 }} />
                 <Button
                title="Delete"
                onPress={() =>
                  Alert.alert('Confirm Deletion', `Do you want to delete player ${item.name}?`, [
                    { text: 'Yes', onPress: () => { 
                      console.log('Deleting player with ID:', item.id);
                      dispatch(deletePlayer(item.id)) }},
                    { text: 'No' },
                  ])
                }
              />
              </View>
            
            </TouchableOpacity>
          )}
        />
      )}
        
         <Button title="Add Player" onPress={() => navigation.navigate('AddPlayer')} style={styles.addButton} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  emptyText: {
    flex: 1,
    top:300,
    left:100,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 14,
    fontWeight:'bold'
  },
  playerItem: {
    backgroundColor:"white",
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 8,
  },
  playerName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  playerDetails: {
    position:'absolute',
    left: 140
  },
  detailText: {
    fontSize: 14,
    color: 'grey',
  },
  addButton: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  editdelete:{

   

  }

});

export default ViewAllPlayersScreen;
