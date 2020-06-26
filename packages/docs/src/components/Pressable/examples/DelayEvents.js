import React from 'react';
import { StyleSheet, Text, Pressable, View } from 'react-native';

export default function DelayEvents() {
  const [eventLog, updateEventLog] = React.useState([]);

  const handlePress = eventName => {
    return () => {
      const limit = 6;
      updateEventLog(state => {
        const nextState = state.slice(0, limit - 1);
        nextState.unshift(eventName);
        return nextState;
      });
    };
  };

  return (
    <View>
      <View>
        <Pressable
          delayLongPress={800}
          delayPressIn={400}
          delayPressOut={1000}
          onLongPress={handlePress('longPress: 800ms delay')}
          onPress={handlePress('press')}
          onPressIn={handlePress('pressIn: 400ms delay')}
          onPressOut={handlePress('pressOut: 1000ms delay')}
        >
          <View>
            <Text style={styles.touchableText}>Pressable</Text>
          </View>
        </Pressable>
      </View>
      <View style={styles.eventLogBox}>
        {eventLog.map((e, ii) => (
          <Text key={ii}>{e}</Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  touchableText: {
    borderRadius: 8,
    padding: 5,
    borderWidth: 1,
    borderColor: 'black',
    color: '#007AFF',
    borderStyle: 'solid',
    textAlign: 'center'
  },
  eventLogBox: {
    padding: 10,
    marginTop: 10,
    height: 120,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#f0f0f0',
    backgroundColor: '#f9f9f9'
  }
});
