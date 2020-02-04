import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Modal, Alert, Image } from 'react-native'
import { connect } from 'react-redux'
import { Divider } from 'react-native-elements'
import { COLORS, Gstyles } from './Styles'
import { storeQuestionStats } from '../Helpers/StorageFunctions'
import { G_GetLevelFromRightResponsesNb } from '../Helpers/GlobalFunctions'
import { TextInput } from 'react-native';
import { playSound } from '../Helpers/SoundFunctions'





class SeriesScreen extends React.Component {

    constructor() {
        console.log('*************************************************** Constructor Series Screen *************************************************************************************')
        super()
     }
    
    static navigationOptions = {
        headerShown: false,
    }

    state = {
        modalVisible: false,
        chosenResponse: "",
        inputResponse: "",
        isResponseRight: true,
        isTypo: false,
        levelImage: null
    }

    _goSeriesScreen = () => {

        // console.log("ON LANCE LA QUESTION SUIVANTE OU ON S'ARRETE SI ON ATTEINT LA FIN DE LA Series")
        if (this.props.navigation.state.params.indexInSeries < G_Config.SeriesLength - 1) {
            // console.log("-> On continue la Series")
            this.props.navigation.push('SeriesScreen', { indexInSeries: this.props.navigation.state.params.indexInSeries+1 })
        }
        else {
            // console.log("> On arrête la série")
            this.props.dispatch({ type: "QUERES_STATS-UPDATE", value: this.props.QueresSeries })   // on met à jour la liste de stats de questions globale
//            console.log("PROOOOOOOOOPS = ", this.props)
            storeQuestionStats(this.props.QuestionStatsList) // on sauvegarde cette liste sur le storage
            .then(myList => {
                console.log('fin de l\'écriture de la liste')
            })
            this.props.navigation.navigate('SeriesResultsScreen', {})
        }
    }

    _displayResponseResults = (qr, myResponse, level) => {
        // console.log('*****************************   go Popup ****************************')
        this.setState({ chosenResponse: myResponse.capital })
        if (level == 3) {
            const levenshtein = require('js-levenshtein')
            lev = levenshtein(qr.capital, myResponse.capital) 
            if (lev <= 2) {
                isResponseRight = true
                this.setState({ isTypo: (lev != 0) })
            }
            else
                isResponseRight = false
        } 
        else {
            isResponseRight = (myResponse.capital.localeCompare(qr.capital) == 0)
        }

        playSound(isResponseRight)

        this.setState({ isResponseRight: isResponseRight })
        this.setState({ modalVisible: true })
    }

    __hideResponseResults = () => {
        // console.log('*****************************   Quit Popup ****************************')
        const action = { type: 'QUERES-SERIES-ADD_ANSWER', value: { index : this.props.navigation.state.params.indexInSeries, isResponseRight: this.state.isResponseRight, chosenResponse: this.state.chosenResponse } }
        this.props.dispatch(action)
        this.setState({ modalVisible: false })
        this._goSeriesScreen();
    }

    render() {
        // console.log('SeriesScreen : state', this.state)
        // console.log('SeriesScreen : Render props', this.props)
        console.log('SeriesScreen : Render ')
        console.log("SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS")


        indexInSeries = this.props.navigation.state.params.indexInSeries
        queres = this.props.QueresSeries[indexInSeries]
        levelElements = G_GetLevelFromRightResponsesNb(queres.rightResponsesNb)
        console.log("G_GetLevelFromRightResponsesNb levelElements = ", levelElements)
        level = levelElements.level
        rNbForNextLevel = levelElements.responsesNbForNextLevel
        // level = 3 // A fins de TEST du level 3
        // rNbForNextLevel = 6 // A fins de TEST du level 3

        levelImage = levelElements.image


        // let imageUrl = 'file:../Helpers/capital_images/' + this.props.QueresSeries[this.props.QuestionsCounter].capital.toLowerCase() + '.jpeg'

        // Progress bar for the series of tests
        let progressWidth = ((indexInSeries+1) / G_Config.SeriesLength)*100+'%'

        // Popup Elements 
        // Popup CSS
        popupVerdict = ''
        if (this.state.isResponseRight) {
            popupVerdict = "BRAVO !"
            popupBackgroundColor = COLORS.okBackgroundColor
            popupTextColor = COLORS.okTextColor
            popupButtonBackgroundColor = COLORS.okButtonBackgroundColor
            popupButtonBorderBottomColor = COLORS.okButtonBorderBottomColor
        }
        else {
            popupVerdict = "ATTENTION !"
            popupBackgroundColor = COLORS.nokBackgroundColor
            popupTextColor = COLORS.nokTextColor
            popupButtonBackgroundColor = COLORS.nokButtonBackgroundColor
            popupButtonBorderBottomColor = COLORS.nokButtonBorderBottomColor
        }
        
        // Popup Texts
        popupConfirmationText = "textconfirm à définir"
        popupCheeringText = ""
        typoWarningText = ""
        popupFlexSize = 7
        console.log("level= ", level, " rNbForNextLevel=", rNbForNextLevel)
        if (level == 0) {
            popupConfirmationText = "La capitale de "
            if (rNbForNextLevel == 1 && this.state.isResponseRight) {
                popupCheeringText = "Vous avez atteint le niveau"
                levelElements = G_GetLevelFromRightResponsesNb(queres.rightResponsesNb+1)
                popupLevelImage =  levelElements.image
            }
            else if (this.state.isResponseRight) {
                popupCheeringText = "plus que " + (rNbForNextLevel-1)+ " bonnes réponses pour le niveau 1"
            }
        }
        else if (level == 1) {
            popupConfirmationText = "La capitale de "
            if (rNbForNextLevel == 1 && this.state.isResponseRight) {
                popupCheeringText = "Vous avez atteint le niveau"
                levelElements = G_GetLevelFromRightResponsesNb(queres.rightResponsesNb+1)
                popupLevelImage =  levelElements.image
            }
            else if (this.state.isResponseRight) {
                popupCheeringText = "plus que " + (rNbForNextLevel-1) + " bonnes réponses pour le niveau 2"
            }
        }
        else if (level == 2) {
            popupConfirmationText = "Le pays de "
            if (rNbForNextLevel == 1  && this.state.isResponseRight) {
                popupCheeringText = "Vous avez atteint le niveau"
                levelElements = G_GetLevelFromRightResponsesNb(queres.rightResponsesNb+1)
                popupLevelImage =  levelElements.image
            }
            else if (this.state.isResponseRight) {
                popupCheeringText = "plus que " + (rNbForNextLevel-1) + " bonnes réponses pour le niveau 3"
            }
        }
        else if (level == 3) {
            popupFlexSize = 5
            popupConfirmationText = "La capitale de "
            if (this.state.isResponseRight && this.state.isTypo) {
                typoWarningText = "(attention : il y a une faute de frappe)"
            }
            if (rNbForNextLevel == 1  && this.state.isResponseRight) {
                popupCheeringText = "Vous avez atteint le niveau"
                levelElements = G_GetLevelFromRightResponsesNb(queres.rightResponsesNb+1)
                popupLevelImage =  levelElements.image
            }
            else if (this.state.isResponseRight) {
                popupCheeringText = "plus que " + (rNbForNextLevel-1) + " bonnes réponses pour le niveau 4"
            }
        }
        else if (level == 4) { // Should Never Happen
            popupConfirmationText = "Level4 : shoud never Happen"
            if (rNbForNextLevel == 1  && this.state.isResponseRight)
                popupCheeringText = "Level4 : shoud never Happen my dear"
            else if (this.state.isResponseRight) {
                popupCheeringText = "Bravo mais ne doit jamais arriver !"
            }
        }

    
        // Popup Cheering View
        cheeringView = 
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{  color: popupTextColor, fontSize: 16, fontWeight: 'bold' }}>{popupCheeringText}</Text>
        </View>
        if (rNbForNextLevel == 1  && this.state.isResponseRight)
            cheeringView = 
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{  color: popupTextColor, fontSize: 20, fontWeight: 'bold' }}>{popupCheeringText} </Text>
                    <Image style={{ width: 70, height: 70 }} source={popupLevelImage} />
                </View>
        else if (this.state.isResponseRight) 
            cheeringView = 
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{  color: popupTextColor, fontSize: 16, fontWeight: 'bold' }}>{popupCheeringText}</Text>
                </View>

        // End of Popup View

        // Response View
        responses = queres.proposedResponses
        responseView = <View> <Text> fake </Text> </View> // juste pour intialiser la variable
        question  = ""
        if (level == 0) { 
            question = queres.state
            responseView = 
            <View style={styles.response_view}>
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
                    <TouchableOpacity style={Gstyles.button}
                        onPress={() => { this._displayResponseResults(queres, responses[0], level) }}>
                        <Text style={Gstyles.button_text}> {responses[0].capital} </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={Gstyles.button}
                        onPress={() => { this._displayResponseResults(queres, responses[1], level) }}>
                        <Text style={Gstyles.button_text}> {responses[1].capital} </Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
                    <TouchableOpacity style={Gstyles.button}
                        onPress={() => { this._displayResponseResults(queres, responses[2]), level }}>
                        <Text style={Gstyles.button_text}> {responses[2].capital} </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={Gstyles.button}
                        onPress={() => { this._displayResponseResults(queres, responses[3]), level }}>
                        <Text style={Gstyles.button_text}> {responses[3].capital} </Text>
                    </TouchableOpacity>
                </View>
            </View>
        }
        else if (level == 1) {
            question = queres.state
            responseView = 
            <View style={styles.response_view}>
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
                    <TouchableOpacity style={Gstyles.button}
                        onPress={() => { this._displayResponseResults(queres, responses[0], level) }}>
                        <Text style={Gstyles.button_text}> {responses[0].capital} </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={Gstyles.button}
                        onPress={() => { this._displayResponseResults(queres, responses[1], level) }}>
                        <Text style={Gstyles.button_text}> {responses[1].capital} </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={Gstyles.button}
                        onPress={() => { this._displayResponseResults(queres, responses[2], level) }}>
                        <Text style={Gstyles.button_text}> {responses[2].capital} </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={Gstyles.button}
                        onPress={() => { this._displayResponseResults(queres, responses[3], level) }}>
                        <Text style={Gstyles.button_text}> {responses[3].capital} </Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <TouchableOpacity style={Gstyles.button}
                        onPress={() => { this._displayResponseResults(queres, responses[4], level) }}>
                        <Text style={Gstyles.button_text}> {responses[4].capital} </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={Gstyles.button}
                        onPress={() => { this._displayResponseResults(queres, responses[5], level) }}>
                        <Text style={Gstyles.button_text}> {responses[5].capital} </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={Gstyles.button}
                        onPress={() => { this._displayResponseResults(queres, responses[6], level) }}>
                        <Text style={Gstyles.button_text}> {responses[6].capital} </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={Gstyles.button}
                        onPress={() => { this._displayResponseResults(queres, responses[7], level) }}>
                        <Text style={Gstyles.button_text}> {responses[7].capital} </Text>
                    </TouchableOpacity>
                </View>
            </View>
        }
        else if (level == 2) {
            question = queres.capital
            responseView = 
            <View style={styles.response_view}>
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
                    <TouchableOpacity style={Gstyles.button}
                        onPress={() => { this._displayResponseResults(queres, responses[0], level) }}>
                        <Text style={Gstyles.button_text}> {responses[0].state} </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={Gstyles.button}
                        onPress={() => { this._displayResponseResults(queres, responses[1], level) }}>
                        <Text style={Gstyles.button_text}> {responses[1].state} </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={Gstyles.button}
                        onPress={() => { this._displayResponseResults(queres, responses[2], level) }}>
                        <Text style={Gstyles.button_text}> {responses[2].state} </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={Gstyles.button}
                        onPress={() => { this._displayResponseResults(queres, responses[3], level) }}>
                        <Text style={Gstyles.button_text}> {responses[3].state} </Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
                    <TouchableOpacity style={Gstyles.button}
                        onPress={() => { this._displayResponseResults(queres, responses[4], level) }}>
                        <Text style={Gstyles.button_text}> {responses[4].state} </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={Gstyles.button}
                        onPress={() => { this._displayResponseResults(queres, responses[5], level) }}>
                        <Text style={Gstyles.button_text}> {responses[5].state} </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={Gstyles.button}
                        onPress={() => { this._displayResponseResults(queres, responses[6], level) }}>
                        <Text style={Gstyles.button_text}> {responses[6].state} </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={Gstyles.button}
                        onPress={() => { this._displayResponseResults(queres, responses[7], level) }}>
                        <Text style={Gstyles.button_text}> {responses[7].state} </Text>
                    </TouchableOpacity>
                </View>
            </View>
        }
        else if (level == 3) { // Text input
            question = queres.state
            if (this.state.inputResponse.localeCompare("") == 0) {
                checkButtonStyle = Gstyles.button_inactive
                checkTextButtonStyle = Gstyles.check_text_inactive
            }
            else {
                checkButtonStyle = Gstyles.button
                checkTextButtonStyle = Gstyles.button_text
            }
            responseView = 
            <View style={styles.text_response_view}>
                    <TextInput
                        style={{ fontSize:20, height: 40, backgroundColor: 'gainsboro', borderColor: 'darkgray', borderWidth: 2, borderRadius: 10, marginLeft: 10, marginRight: 10, paddingLeft: 5, paddingRight:5 }}
                        placeholder='Ecris la capitale'
                        placeholderTextColor='dimgrey'
                        onChangeText={(text) => this.setState({inputResponse: text})}
                    />
                    <TouchableOpacity style={checkButtonStyle}
                        onPress={() => { this._displayResponseResults(queres, { state : queres.state, capital: this.state.inputResponse }, level) }}>
                        <Text style={checkTextButtonStyle}> Vérifier </Text>
                    </TouchableOpacity>
            </View>
        }

        return (
            <View style={ Gstyles.main_view }>
                <View style={ styles.quitAndProgressBar_view }>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                         <Image style={{ width: 35, height: 35 }} source={require('../Images/quit-screen.png')} />
                    </View>
                    <View style={ styles.progressBar_view }>
                        <View style={{ flexDirection: 'row', backgroundColor: 'gainsboro', borderRadius: 10, height: 10 }}>
                            <View style={{ backgroundColor: '#78c800', borderRadius: 10, position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, width: progressWidth}}>
                            </View>        
                        </View>      
                    </View>
                </View>
                <Divider/>
                <View style={ styles.question_view }>
                    <Text style={{ fontSize: 40, fontWeight: 'bold'}}> {question} </Text>
                    <Text style={{ fontSize: 10, fontWeight: 'bold'}}> rr={queres.rightResponsesNb} level={level}  </Text>

                </View>
                <Divider/>
                <View style={styles.image_view}>
                    <View style={{ flex: 2, justifyContent: 'center' }}>
                    </View>
                    <View style={{ flex: 5, justifyContent: 'center' }}>
                         <Image style={{ width: 220, height: 220 }} source={require('../Helpers/capital_images/paris.jpeg')} />
                    </View>
                    <View style={{ flex: 2, justifyContent: 'center' }}>
                         <Image style={{ width: 70, height: 70 }} source={levelImage} />
                    </View>
                </View>
                <Divider/>
                { responseView }
                <Divider/>
                <View style={styles.ad_view} >
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
                        <View style={{ flex: 1 }}></View>
                        <View style={{ flex: 6 }}></View>
                        <View style={{ flex: popupFlexSize, backgroundColor: popupBackgroundColor, padding: 10}}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{  color: popupTextColor, fontSize: 25, fontWeight: 'bold' }}>{popupVerdict}</Text>
                            </View>
                            <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: popupTextColor, fontSize: 25, fontWeight: 'bold', margin: 10 }}>{popupConfirmationText} {queres.state} est</Text>
                                <Text style={{ color: popupTextColor, fontSize: 50, fontWeight: 'bold' }}>{queres.capital}</Text>
                                <Text style={{ color: popupTextColor, fontSize: 14, fontWeight: 'bold' }}>{typoWarningText}</Text>
                            </View>
                            { cheeringView }
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity style={[Gstyles.button, { backgroundColor:popupButtonBackgroundColor, borderBottomColor:popupButtonBorderBottomColor }]} onPress={() => { this.__hideResponseResults() }}>
                                    <Text style={Gstyles.button_text}>OK</Text>
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
    quitAndProgressBar_view: {
        flex: 1,
        flexDirection: 'row', 
        justifyContent: 'center', 
        paddingLeft: '3%', 
        paddingRight: '3%' 
    },
    question_view: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'  
    },
    image_view: {
        flex: 6, 
        flexDirection: 'row', 
        justifyContent: 'space-evenly'
    },
    response_view: {
        flexDirection: 'row', 
        flex: 7, 
    },
    text_response_view: {
        flex: 7,
        flexDirection: 'column', 
        justifyContent: 'flex-start', 
        paddingTop: 15
    },
    ad_view: {
        flex: 1, 
    },
    title_text: {
        height: 50
    },
    progressBar_view: {
        flex: 6, 
        justifyContent: 'center' 
    },
    progressBar: {
        position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, height: 20,
        width: '40%',
        borderColor: '#000',
        borderWidth: 4,
        borderRadius: 5,
        backgroundColor: "#8BED4F"
       },
    modal_view: {
        backgroundColor: "#fff",
        width: 300,
        height: 300
    },
})

const mapStateToProps = state => {
    return {
        QuestionStatsList: state.HandleQueresStatsReducer.QuestionStatsList,
        QueresSeries: state.HandleQueresSeriesReducer.QueresSeries
    }
}

export default connect(mapStateToProps)(SeriesScreen)
