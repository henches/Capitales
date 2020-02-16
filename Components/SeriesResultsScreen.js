import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native'
import { Divider, Icon } from 'react-native-elements'
import { connect } from 'react-redux'
import Emoji from 'react-native-emoji'
import { COLORS, Gstyles } from './Styles'


class SeriesResultsScreen extends React.Component {
    static navigationOptions = {
        title: "Home",
        headerLeft: (
          <Icon
            containerStyle={{ marginLeft: 10 }}
            type='ionicon'
            name='ios-home'
            color='blue'
//            onPress={() => navigation.navigate('HomeScreen', {}) }
          />
        )
    }
    
    
    _goStatView = () => {
        console.log("On va à l'écran des stats du joueur")
       this.props.navigation.navigate('GlobalQuestionStatsScreen', {})   
    }

    _goHomeScreen = () => {
        console.log("On va à l'écran Home")
        this.props.navigation.navigate('HomeScreen', {})   
    }

    _calculateNbOfRightResponses = (queresSeries) => {
        let nb = 0
        for (var i=0; i < queresSeries.length; i++) {
            if (queresSeries[i].isResponseRight)
                nb++
        }
        return nb
    }


    render() {
        // console.log("Serie de réponses [1] ", this.props.GivenResponsesList[1])
        nbRightResponses = this._calculateNbOfRightResponses(this.props.QueresSeries)
        console.log("nbre de bonnes réponses / nombre total de réponses ", nbRightResponses, " / ", this.props.QueresSeries.length)
        return(
                <View style={{ flex: 3, backgroundColor: COLORS.generalBackgroundColor }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 25 }}>BRAVO !!</Text>
                        <Text style={{ fontSize: 20}}>{nbRightResponses} bonnes réponses</Text>
                    </View>
                    <Divider/>
                    <View style={{ flex: 5 }}>
                        <FlatList
                            data={this.props.QueresSeries}
                            renderItem={({ item }) => (
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
                                                backgroundColor: item.isResponseRight ? COLORS.okButtonBackgroundColor : COLORS.nokButtonBackgroundColor, 
                                                padding: 5, marginVertical: 2, marginHorizontal: 8 }}>
                                    <Emoji name={item.isResponseRight ? 'ballot_box_with_check': 'flushed' } style={{ fontSize: 20 }}/>
                                    <Text style={{ fontSize: 15, color: 'white' }}> {item.state} </Text>
                                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'white' }}> {item.givenResponse}</Text>
                                    <Text style={{ fontSize: 15, color: 'white' }}> {item.pointsWon}</Text>
                                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'white' }}> {item.afterResponseTotalPoints}</Text>
                                </View>
                            )}
                            keyExtractor={item => item.id}
                        />
                    </View>
                    <Divider/>
                    <View style={{ flex: 2, flexDirection: 'column', justifyContent: 'center' }}>  
                        <TouchableOpacity style={Gstyles.button}
                                onPress={() => { this._goHomeScreen() }}>
                                <Text style={Gstyles.button_text}>HOME</Text>
                        </TouchableOpacity>
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
    progressBar: {
        height: 20,
        width: '100%',
        backgroundColor: 'white',
        borderColor: '#000',
        borderWidth: 2,
        borderRadius: 5
    },
    button: {
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
        borderBottomColor: 'steelblue',
        borderBottomWidth: 5,
        backgroundColor: 'dodgerblue',
        margin: 5
    },

})



const mapStateToProps = state => {
    return {
        QuestionStatsList: state.HandleQueresStatsReducer.QuestionStatsList,
        QueresSeries: state.HandleQueresSeriesReducer.QueresSeries
    }
}

export default connect(mapStateToProps)(SeriesResultsScreen)
