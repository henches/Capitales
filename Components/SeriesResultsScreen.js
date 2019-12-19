import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import SeriesResultsStatsList from './SeriesResultsStatsList'


class SeriesResultsScreen extends React.Component {
    
    constructor() {
        super();
        global.RunningSeries = [];
        global.G_SeriesLength=3;
    }
 
    _goStatView = () => {
        console.log("On va à l'écran des stats du joueur")
        this.props.navigation.navigate('GeneralStatisticsScreen', {})   
    }


    render() {
          return(
            <View style={styles.main_view}>
                <Text style={styles.title_text}>BRAVO !!</Text>
                <View style={styles.stats_view}>
                    <Text style={styles.stats_text}>Vous connaissez x bonnes réponses sur 10</Text>
                </View>
                <View style={styles.play_view}>
                    <Button title='Voici les stats'/>
                </View>                     
                <View style={styles.container}>
                    <Text>
                        STATS.....
                    </Text>
                    <View style={styles.progressBar}>
                        <View style={styles.viewInProgressBar}/>
                    </View>
                </View>
                <View style={styles.play_view}>
                    <Button title='Go Stats Joueur' onPress={() => {this._goStatView()}}/>
                </View>                     
            </View>  
        )
    }
}

const styles = StyleSheet.create({
    main_view: {
        flex: 1,
        marginTop: 30
    },
    title_view: {
        flex:1
    },
    title_text: {
        height: 50
    },
    stats_view: {
        flex:1
    },
    stats_text: {
        height: 50
    },
    play_view: {
        flex:1
    },
    play_button: {
        height: 50
    },
    


})
export default SeriesResultsScreen