import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native'
import { Divider, Icon } from 'react-native-elements'
import { connect } from 'react-redux'
import { COLORS, Gstyles } from './Styles'



class GlobalQuestionStatsScreen extends React.Component {
    static navigationOptions = {
        title: "Home",
        headerLeft: (
          <Icon
            containerStyle={{ marginLeft: 10 }}
            type='ionicon'
            name='ios-home'
            color='blue'
  //          onPress={() => navigation.navigate('HomeScreen', {}) }
          />
        )
    }
    
    constructor() {
        console.log('GLOBAL QUESTION STATS CONSTRUCTOR *************************************************************************************')
        super()
     }

    componentDidMount() {
        console.log("GLOBAL QUESTION STATS SCREEN DID MOUNT !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!)")

    }

    _goHomeScreen = () => {
        let { routeName } = this.props.navigation.state;      
        console.log("On va à l'écran Home routeName = ", routeName)
        this.props.navigation.navigate('HomeScreen', { lastScreen: routeName })   
    }

   
    render() {
        return(
                <View style={{ flex: 1, backgroundColor: COLORS.generalBackgroundColor }}>
                    <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                    </View>
                    <View style={{ flex: 10, justifyContent: 'center' }}>
                        <FlatList
//                            data={this.props.QuestionStatsList}
                            data={this.props.QuestionStatsList.sort((a,b) => { return (b.totalPoints - a.totalPoints)})}
                            renderItem={({ item }) => (
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center',
                                                backgroundColor: '#2F4F4F', 
                                                padding: 5, marginVertical: 2, marginHorizontal: 8 }}>
                                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                        <Text style={{ fontSize: 20, color: 'white' }}> {item.Queres.state}</Text>
                                        <Text style={{ fontSize: 20, color: 'white' }}> {item.Queres.capital}</Text>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                                        <Text style={{ fontSize: 20, color: 'white' }}> {item.level}</Text>
                                    </View>
                                </View>
                            )}
                            keyExtractor={item => item.id}
                        />
                    </View>
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
        QuestionStatsList: state.HandleQueresStatsReducer.QuestionStatsList
    }
}

export default connect(mapStateToProps)(GlobalQuestionStatsScreen)
