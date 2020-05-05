import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native'
import { Divider, Icon } from 'react-native-elements'
import { connect } from 'react-redux'
import Emoji from 'react-native-emoji'
import { COLORS, Gstyles } from './Styles'
import { scale, moderateScale, verticalScale} from '../Helpers/scaling_utils';


class SeriesResultsScreen extends React.Component {
    static navigationOptions = {
        title: "Home",
        headerLeft: (
          <Icon
            containerStyle={{ marginLeft: scale(10) }}
            type='ionicon'
            name='ios-home'
            color='blue'
//            onPress={() => navigation.navigate('HomeScreen', {}) }
          />
        )
    }
    
    constructor() {
        console.log('SERIES RESULTS SCREEN CONSTRUCTOR')
        super()
     }

    componentDidMount() {
        console.log("SERIES RESULTS SCREEN DID MOUNT !!!!!!!!)")

    }


    
    _goStatView = () => {
        console.log("On va à l'écran des stats du joueur")
       this.props.navigation.navigate('GlobalQuestionStatsScreen', {})   
    }

    _goHomeScreen = () => {
        let { routeName } = this.props.navigation.state;      
        console.log("On va à l'écran Home routeName = ", routeName)
        this.props.navigation.navigate('HomeScreen', { lastScreen: routeName })   
    }

    _calculateNbOfRightResponses = (queresSeries) => {
        let nb = 0
        for (var i=0; i < queresSeries.length; i++) {
            if (queresSeries[i].isResponseRight)
                nb++
        }
        return nb
    }

    _calculatePointsWon = (queresSeries) => {
        let pointsWon = 0
        for (var i=0; i < queresSeries.length; i++) {
            pointsWon += queresSeries[i].pointsWon
        }
        return pointsWon
    }


    render() {
        // console.log("Serie de réponses [1] ", this.props.GivenResponsesList[1])
        nbRightResponses = this._calculateNbOfRightResponses(this.props.QueresSeries)
        ratio = nbRightResponses / this.props.QueresSeries.length
        pointsWon = this._calculatePointsWon(this.props.QueresSeries)
        cheeringText = ""
        scoreProgressText = "Votre score s'améliore de "+pointsWon+" points !"
        if (ratio == 0) {
            cheeringText = "Aucune bonne réponse : essayez encore !"
            scoreProgressText = "Pas d'amélioration du score"
        } 
        else if (ratio < 0.5) {
            cheeringText = "C'est encourageant !"
        }
        else {
            if (ratio == 1)
                cheeringText = "Carton plein !! BRAVO !!!"
            else
                cheeringText = "Super résultat ! Bravo !!"
        }
        console.log("nbre de bonnes réponses / nombre total de réponses ", nbRightResponses, " / ", this.props.QueresSeries.length)
        return(
                <View style={{ flex: 1, backgroundColor: COLORS.generalBackgroundColor }}>
                    <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: scale(20) }}>{nbRightResponses} bonnes réponses</Text>
                        <Text style={{ fontSize: scale(20) }}>{cheeringText}</Text>
                    </View>
                    <Divider/>
                    <View style={{ flex: 5, flexDirection: 'column', justifyContent: 'center'}}>
                        <FlatList
                            data={this.props.QueresSeries}
                            renderItem={({ item }) => (
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
                                                backgroundColor: item.isResponseRight ? COLORS.okButtonBackgroundColor : COLORS.nokButtonBackgroundColor, 
                                                padding: 5, marginVertical: verticalScale(2), marginHorizontal: scale(8) }}>
                                    <Emoji name={item.isResponseRight ? 'ballot_box_with_check': 'flushed' } style={{ fontSize: scale(20) }}/>
                                    <Text style={{ fontSize: scale(15), color: 'white' }}> {item.state} </Text>
                                    <Text style={{ fontSize: scale(15), fontWeight: 'bold', color: 'white' }}> {item.givenResponse}</Text>
                                    <Text style={{ fontSize: scale(15), color: 'white' }}> {item.pointsWon}</Text>
                                    <Text style={{ fontSize: scale(15), fontWeight: 'bold', color: 'white' }}> {item.afterResponseTotalPoints}</Text>
                                </View>
                            )}
                            keyExtractor={item => item.id}
                        />
                    </View>
                    <Divider/>
                    <View style={{ flex: 3, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>  
                        <Text style={{ fontSize: scale(20)}}>{scoreProgressText}</Text>
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
        marginTop: verticalScale(30)
    },
    title_view: {
        flex:1
    },
    title_text: {
        height: verticalScale(50)
    },
    stats_view: {
        flex:1
    },
    stats_text: {
        height: verticalScale(50)
    },
    play_view: {
        flex:1
    },
    play_button: {
        height: verticalScale(50)
    },
    progressBar: {
        height: verticalScale(20),
        width: '100%',
        backgroundColor: 'white',
        borderColor: '#000',
        borderWidth: 2,
        borderRadius: 5
    },
    button: {
        height: verticalScale(50),
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
        borderBottomColor: 'steelblue',
        borderBottomWidth: 5,
        backgroundColor: 'dodgerblue',
        margin: scale(5)
    },

})



const mapStateToProps = state => {
    return {
        QuestionStatsList: state.HandleQueresStatsReducer.QuestionStatsList,
        QueresSeries: state.HandleQueresSeriesReducer.QueresSeries
    }
}

export default connect(mapStateToProps)(SeriesResultsScreen)
