import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native'
import { Divider, Icon } from 'react-native-elements'
import { connect } from 'react-redux'
import { COLORS, Gstyles } from './Styles'
import { LevelSymbol } from './LevelSymbol'




class GlobalQuestionStatsScreen extends React.Component {
    static navigationOptions = {
        headerShown: false,
    }
   
    constructor() {
        console.log('LEVEL SCREEN CONSTRUCTOR *************************************************************************************')
        super()
     }

    _goHomeScreen = () => {
        let { routeName } = this.props.navigation.state;      
        console.log("On va à l'écran Home routeName = ", routeName)
        this.props.navigation.navigate('HomeScreen', { lastScreen: routeName })   
    }

   
    render() {
        return(
                <View style={{ flex: 1, backgroundColor: COLORS.generalBackgroundColor, marginTop: 20 }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 30, fontWeight: 'bold'}}>NIVEAU</Text>
                    </View>
                    <View style={{ flex: 8, justifyContent: 'center' }}>
                        <LevelSymbol playerLevel = { this.props.PlayerLevel } />
                    </View>
                    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>  
                        <TouchableOpacity style={Gstyles.button}  onPress={() => { this._goHomeScreen() }}>
                                <Icon
                                    containerStyle={{ marginLeft: 10 }}
                                    size={ 30 }
                                    type='ionicon'
                                    name='ios-home'
                                    color='white'
                                />
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
        PlayerLevel: state.HandleQueresStatsReducer.PlayerLevel
    }
}

export default connect(mapStateToProps)(GlobalQuestionStatsScreen)
