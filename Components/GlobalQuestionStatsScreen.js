import React from 'react'
import { StyleSheet, Text, View, Button, FlatList } from 'react-native'
import { Divider, Icon } from 'react-native-elements'
import { connect } from 'react-redux'
import COLORS from './Styles'



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
    
   
    
    render() {
        return(
                <View style={{ flex: 1, backgroundColor: COLORS.generalBackgroundColor }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 25 }}>Stats Générales !!</Text>
                    </View>
                    <Divider/>
                    <View style={{ flex: 10 }}>
                        <FlatList
//                            data={this.props.QuestionStatsList}
                            data={this.props.QuestionStatsList.sort((a,b) => a.RightAnswersNb < b.RightAnswersNb)}
                            renderItem={({ item }) => (
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center',
                                                backgroundColor: COLORS.okButtonBackgroundColor, 
                                                padding: 5, marginVertical: 2, marginHorizontal: 8 }}>
                                    <Text style={{ fontSize: 20, color: 'white' }}> {item.id} </Text>
                                    <Text style={{ fontSize: 20, color: 'white' }}> {item.QueRes.capital}</Text>
                                    <Text style={{ fontSize: 20, color: 'white' }}> {item.RightAnswersNb}</Text>
                                    <Text style={{ fontSize: 20, color: 'white' }}> {item.WrongAnswersNb}</Text>
                                </View>
                            )}
                            keyExtractor={item => item.id}
                        />
                    </View>
                    <Divider/>
                    <View style={{ flex: 1 }}>
                        <Button title='Marge' onPress={() => { this.props.navigation.navigate('HomeScreen', {}) }}/>
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
        QuestionStatsList: state.HandleListOfQuestionStatsReducer.QuestionStatsList
    }
}

export default connect(mapStateToProps)(GlobalQuestionStatsScreen)
