import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { View, Text, ActivityIndicator } from 'react-native'; // Import ActivityIndicator
import AppNavigator from './navigation/AppNavigator';
import { store, persistor } from './store/Store';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate
        loading={(
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#007BFF" />
            <Text>Loading...</Text>
          </View>
        )}
        persistor={persistor}
      >
        <AppNavigator />
      </PersistGate>
    </Provider>
  );
};

export default App;
