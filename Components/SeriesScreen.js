import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Modal, Alert, Image } from 'react-native'
import { connect } from 'react-redux'
import { Divider } from 'react-native-elements'
import COLORS from './Styles'
import { storeQuestionStats } from '../Helpers/StorageFunctions'





class SeriesScreen extends React.Component {
    static navigationOptions = {
        headerTitle: "CAPITALES",
        headerStyle: {
            backgroundColor: 'whitesmoke',
            fontWeight: 'bold',
            fontSize: 35
        },
        headerLeft: null,
    }

    state = {
        modalVisible: false,
        givenAnswer: {},
        isAnswerRight: true
    }

    _goSeriesScreen = () => {
        // console.log("ON LANCE LA QUESTION SUIVANTE OU ON S'ARRETE SI ON ATTEINT LA FIN DE LA Series")
        if (this.props.QuestionsCounter < G_SeriesLength - 1) {
            // console.log("-> On continue la Series")
            const action = { type: "INITIATE-NEXT-QUESTION-OF-THE-SERIES", value: this.props.QuestionsCounter + 1 }
            this.props.dispatch(action)
            this.props.navigation.push('SeriesScreen', {})
        }
        else {
            // console.log("> On arrête la série")
            this.props.dispatch({ type: "UPDATE-QUESTION-STATS", value: this.props.GivenAnswersList })   // on met à jour la liste de stats de questions globale
            console.log("PROOOOOOOOOPS = ", this.props)
            storeQuestionStats(this.props.QuestionStatsList) // on sauvegarde cette liste sur le storage
            .then(myList => {
                console.log('fin de l\'écriture de la liste')
            })
            this.props.navigation.navigate('SeriesResultsScreen', {})
        }
    }

    _displayAnswerResults = (myAnswer) => {
        // console.log('*****************************   go Popup ****************************')
        // console.log('go Popup : myAnswer = ', myAnswer)
        // console.log('go Popup : RightAnswer = ', this.props.RightAnswer)
        isAnswerRight = (myAnswer.capital.localeCompare(this.props.RightAnswer.capital) == 0)
        this.setState({ givenAnswer: myAnswer })
        this.setState({ isAnswerRight: isAnswerRight })
        this.setState({ modalVisible: true })
    }

    __hideAnswerResults = () => {
        // console.log('*****************************   Quit Popup ****************************')
        const action = { type: "ADD-ANSWERED-QUESTION", value: { isAnswerRight: this.state.isAnswerRight, rightAnswer: this.props.RightAnswer, givenAnswer: this.state.givenAnswer } }
        this.props.dispatch(action)
        this.setState({ modalVisible: false })
        this._goSeriesScreen();
    }


    render() {
        //        console.log('state', this.state)
        //        console.log('state.givenAnswer', this.state.givenAnswer)
        //        console.log('Render props', this.props)

        const popupAnswerIsOK = "BRAVO !"
        const popupAnswerIsKO = "ATTENTION !"
        const answerList = this.props.PossibleResponsesList

        let imageUrl = 'file:../Helpers/capital_images/' + this.props.RightAnswer.capital.toLowerCase() + '.jpeg'
        let progressWidth = ((this.props.QuestionsCounter+1) / G_SeriesLength)*100+'%'
        popupAnswer = ''
        if (this.state.isAnswerRight) {
            popupAnswer = popupAnswerIsOK
            popupBackgroundColor = COLORS.okBackgroundColor
            popupTextColor = COLORS.okTextColor
            popupButtonBackgroundColor = COLORS.okButtonBackgroundColor
            popupButtonBorderBottomColor = COLORS.okButtonBorderBottomColor
        }
        else {
            popupAnswer = popupAnswerIsKO
            popupBackgroundColor = COLORS.nokBackgroundColor
            popupTextColor = COLORS.nokTextColor
            popupButtonBackgroundColor = COLORS.nokButtonBackgroundColor
            popupButtonBorderBottomColor = COLORS.nokButtonBorderBottomColor
        }


        return (
            <View style={{ flex: 1, backgroundColor: COLORS.generalBackgroundColor}}>
                <View style={{ flex: 1, justifyContent: 'center', paddingLeft: '3%', paddingRight: '3%' }}>
                    <View style={{ flexDirection: 'row', backgroundColor: 'gainsboro', borderRadius: 10, height: 10 }}>
                        <View style={{ backgroundColor: '#78c800', borderRadius: 10, position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, width: progressWidth}}>
                        </View>        
                    </View>      
                </View>
                <Divider/>
                <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center'  }}>
                    <Text style={{ fontSize: 40, fontWeight: 'bold'}}> {this.props.RightAnswer.state} </Text>
                </View>
                <Divider/>
                <View style={{ flex: 7, justifyContent: 'center', alignItems: 'center' }}>
                    <Image style={{ width: 220, height: 220 }} source={this.props.RightAnswer.image} />
                </View>
                <Divider/>
                <View style={{ flex: 8, flexDirection: 'row', justifyContent: 'center' }}>
                    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
                        <TouchableOpacity style={styles.button}
                            onPress={() => { this._displayAnswerResults(answerList[0]) }}>
                            <Text style={styles.button_text}> {answerList[0].capital} </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}
                            onPress={() => { this._displayAnswerResults(answerList[1]) }}>
                            <Text style={styles.button_text}> {answerList[1].capital} </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}
                            onPress={() => { this._displayAnswerResults(answerList[2]) }}>
                            <Text style={styles.button_text}> {answerList[2].capital} </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}
                            onPress={() => { this._displayAnswerResults(answerList[3]) }}>
                            <Text style={styles.button_text}> {answerList[3].capital} </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <TouchableOpacity style={styles.button}
                            onPress={() => { this._displayAnswerResults(answerList[4]) }}>
                            <Text style={styles.button_text}> {answerList[4].capital} </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}
                            onPress={() => { this._displayAnswerResults(answerList[5]) }}>
                            <Text style={styles.button_text}> {answerList[5].capital} </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}
                            onPress={() => { this._displayAnswerResults(answerList[6]) }}>
                            <Text style={styles.button_text}> {answerList[6].capital} </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}
                            onPress={() => { this._displayAnswerResults(answerList[7]) }}>
                            <Text style={styles.button_text}> {answerList[7].capital} </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Divider/>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Text style={styles.title_text}></Text>
                </View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed')
                    }}>
                    <View style={{ flex: 1 }}>
                        <View style={{ flex: 1 }}></View>
                        <View style={{ flex: 1 }}></View>
                        <View style={{ flex: 2 }}></View>
                        <View style={{ flex: 7 }}></View>
                        <View style={{ flex: 8, backgroundColor: popupBackgroundColor, padding: 10}}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{  color: popupTextColor, fontSize: 25, fontWeight: 'bold' }}>{popupAnswer}</Text>
                            </View>
                            <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: popupTextColor, fontSize: 25, fontWeight: 'bold', margin: 10 }}>La capitale de {this.props.RightAnswer.state} est</Text>
                                <Text style={{ color: popupTextColor, fontSize: 50, fontWeight: 'bold' }}>{this.props.RightAnswer.capital}</Text>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity style={[styles.button, { backgroundColor:popupButtonBackgroundColor, borderBottomColor:popupButtonBorderBottomColor }]} onPress={() => { this.__hideAnswerResults() }}>
                                    <Text style={{ padding: 10, fontSize: 25, color: 'white' }}>OK</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
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
        flex: 1
    },
    title_text: {
        height: 50
    },
    Series_infos_view: {
        flex: 1
    },
    Series_info_text: {
        height: 50
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
    progressBar: {
     position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, height: 20,
     width: '40%',
     borderColor: '#000',
     borderWidth: 4,
     borderRadius: 5,
     backgroundColor: "#8BED4F"
    },
    button_text: {
        fontSize: 25,
        color: 'white',
        padding: 10
    },
    question_view: {
        flex: 2
    },
    question_text: {
        height: 50
    },
    choices_view: {
        flex: 4
    },
    modal_view: {
        backgroundColor: "#fff",
        width: 300,
        height: 300
    }
})

const mapStateToProps = state => {
    return {
        PossibleResponsesList: state.HandleNextQuestionReducer.PossibleResponsesList,
        RightAnswer: state.HandleNextQuestionReducer.RightAnswer,
        QuestionsCounter: state.HandleNextQuestionReducer.QuestionsCounter,
        GivenAnswersList: state.HandleAnswersListReducer.GivenAnswersList,
        QuestionStatsList: state.HandleListOfQuestionStatsReducer.QuestionStatsList
    }
}

export default connect(mapStateToProps)(SeriesScreen)
