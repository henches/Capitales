import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import SeriesResultsStatsList from './SeriesResultsStatsList'


class GeneralStatisticsScreen extends React.Component {

    _goHome = () => {
        console.log("On va à l'écran d'accueil")
        this.props.navigation.navigate('Accueil', {})   
    }

    
    render() {
          return(
            <View style={styles.main_view}>
                <Text style={styles.title_text}>LADIES AND GENT : the STATS !!!</Text>
                <View style={styles.container}>
                    <Text>
                        STATS.....
                    </Text>
                    <View style={styles.progressBar}>
                        <View style={styles.viewInProgressBar}/>
                    </View>
                    <SeriesResultsStatsList/>  
                </View>
                <View style={styles.play_view}>
                    <Button title='Back Home' onPress =  {() => {this._goHome()}}/>
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
export default GeneralStatisticsScreen