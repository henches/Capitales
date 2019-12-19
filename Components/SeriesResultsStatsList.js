import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';

const DATA = [
  {
    id: '0',
    state: 'FRANCE',
    capital: 'PARIS',
    Percentage: '80%'
  },
  {
    id: '1',
    state: 'ITALIE',
    capital: 'ROME',
    Percentage: '60%'
  },
  {
    id: '2',
    state: 'ALLEMAGNE',
    capital: 'BERLIN',
    Percentage: '20%'
  },
  {
    id: '3',
    state: 'BELGIQUE',
    capital: 'BERLIN',
    Percentage: '20%'
  },
  {
    id: '4',
    state: 'HOLLANDE',
    capital: 'BERLIN',
    Percentage: '12%'
  },
  {
    id: '5',
    state: 'SUISSE',
    capital: 'BERLIN',
    Percentage: '95%'
  },
  {
    id: '6',
    state: 'ZOKUIE',
    capital: 'BERLIN',
    Percentage: '100%'
  },
  {
    id: '7',
    state: 'TdsqkjCHEQUIE',
    capital: 'BERLIN',
    Percentage: '60%'
  },
  {
    id: '8',
    state: 'YHYTCHEQUIE',
    capital: 'BERLIN',
    Percentage: '1%'
  },
  {
    id: '9',
    state: 'TCsqHEQUIE',
    capital: 'BERLIN',
    Percentage: '50%'
  },
  {
    id: '10',
    state: 'TCHEQUIE',
    capital: 'BERLIN',
    Percentage: '50%'
  },
];

_statItemStyle = (myWidth) => {
    console.log("StatItem Style")
    return {
        position: 'absolute',
        left: 0,
        right:0,
        top:0,
        bottom: 0,
        backgroundColor: "#8BED4F",
        width: myWidth,
    }
}

class SeriesResultsStatsList extends React.Component {
    render () {
        console.log("Dans Render de SeriesResultsStatsList")
        return (
            <View>
                <Text>C'est moi !</Text>
                <FlatList
                    data={DATA}
                    renderItem={({ item }) => (
                        <View style={styles.item}>
                            <Text style={styles.state}>{item.state}</Text>
                            <View style={styles.progressBar}>
                                <View style = {_statItemStyle(item.Percentage)}
                                />         
                            </View>
                        </View>
                    )}
                    keyExtractor={item => item.id}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  state: {
    fontSize: 32,
  },
  progressBar: {
    height: 20,
    width: '100%',
    backgroundColor: 'white',
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 5
  },
});

export default SeriesResultsStatsList