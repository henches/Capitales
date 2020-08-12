import React from 'react'
import { Keyboard, Animated, Alert, KeyboardAvoidingView, Platform, StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback, Modal, Image, ImageEditor } from 'react-native'
import { connect } from 'react-redux'
import { COLORS, Gstyles } from './Styles'
import { G_GetImageForLevel } from '../Helpers/PointsManager'
import { QuestionLevelSymbol } from './QuestionLevelSymbol'
import { TextInput } from 'react-native';
import { playSound } from '../Helpers/SoundFunctions'
import { scale, moderateScale, verticalScale} from '../Helpers/scaling_utils'



const SMALL_IMAGE_RATIO = 0.5

    
class SeriesScreen extends React.Component {


    constructor() {
        console.log('SERIES SCREEN CONSTRUCTOR ')
        super()
        this.imageHeight = new Animated.Value(1);
    }

     componentDidMount() {
        console.log("SERIES SCREEN DID MOUNT !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!)")


    }

    componentDidMount () {
        if (Platform.OS == "ios") {
            this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow)
            this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide)
        }
        else {
            this.keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow)
            this.keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide)
        }
    }
    
    componentWillUnmount() {
       if (Platform.OS == "ios") {
            this.keyboardWillShowSub.remove()
            this.keyboardWillHideSub.remove()
       }
       else {
            this.keyboardDidShowSub.remove()
            this.keyboardDidHideSub.remove()
       }
    }

    keyboardWillShow = (event) => {
        console.log("keyboardShow")
        Animated.timing(this.imageHeight, {
          duration: 500,
          useNativeDriver: true, // <-- Add this
          toValue: SMALL_IMAGE_RATIO,
        }).start()
    }
    
    keyboardWillHide = (event) => {
        console.log("keyboardWillHide")
        Animated.timing(this.imageHeight, {
          duration: 500,
          useNativeDriver: true, // <-- Add this
          toValue: 1,
        }).start()
    }
  
    keyboardDidShow = (event) => {
        console.log("keyboardDidShow")
        Animated.timing(this.imageHeight, {
          duration: 500,
          useNativeDriver: true, // <-- Add this
          toValue: SMALL_IMAGE_RATIO,
        }).start()
    }
    
    keyboardDidHide = (event) => {
        console.log("keyboardDidHide")
        Animated.timing(this.imageHeight, {
          duration: 500,
          toValue: 1,
          useNativeDriver: true
        }).start()
    }

    
    static navigationOptions = {
        headerShown: false,
    }

    state = {
        modalVisible: false,
        inputResponse: "",   // Réponse saisie au clavier
    }

    _goSeriesScreen = () => {

        // console.log("ON LANCE LA QUESTION SUIVANTE OU ON S'ARRETE SI ON ATTEINT LA FIN DE LA Series")
        if (this.props.navigation.state.params.indexInSeries < this.props.QueresSeries.length - 1) {
            // console.log("-> On continue la Series")
            this.props.navigation.push('SeriesScreen', { indexInSeries: this.props.navigation.state.params.indexInSeries+1 })
        }
        else {
            // console.log("> On arrête la série")
            this.props.dispatch({ type: "QUERES_STATS-UPDATE", value: this.props.QueresSeries })   // on met à jour la liste de stats de questions globale
//            console.log("PROOOOOOOOOPS = ", this.props)
            this.props.navigation.navigate('SeriesResultsScreen', {})
        }
    }

    _goHomeScreen = () => {
        let { routeName } = this.props.navigation.state;      
        console.log("On va à l'écran Home routeName = ", routeName)
        this.props.navigation.navigate('HomeScreen', { lastScreen: routeName })   
    }


    _displayResponseResults = (qr, myResponse, level) => {
        // console.log('*****************************   go Popup ****************************')
        let isMyResponseRight = false
        let myIsTypo = false
        if (level == 2) {
            const levenshtein = require('js-levenshtein')
            let lev = levenshtein(qr.capital, myResponse.capital.trim()) 
            if (lev <= 2) {
                isMyResponseRight = true
                myIsTypo =  (lev != 0)
            }
            else
                isMyResponseRight = false
        } 
        else {
            isMyResponseRight = (myResponse.capital.localeCompare(qr.capital) == 0)
        }

       const action = { type: 'QUERES_SERIES-ADD_ANSWER', value: { index : this.props.navigation.state.params.indexInSeries, isResponseRight: isMyResponseRight, givenResponse: myResponse.capital, isTypo: myIsTypo } }
       this.props.dispatch(action)


        if (this.props.soundsActive) {
            if (isMyResponseRight) {
                if (level < 2)
                    playSound(0) // success
                else 
                    playSound(1) // level == 2 (Atteinte du niveau 2)
            }
            else 
                playSound(2) // echec
        }
        this.setState({ modalVisible: true })
    }

    __hideResponseResults = () => {
        // console.log('*****************************   Quit Popup ****************************')
 
       this.setState({ modalVisible: false })
       this._goSeriesScreen();
    }

    _showAlertQuitSeries() {  
        if (this.props.navigation.state.params.indexInSeries > 0) {
            Alert.alert(  
                'Es-tu sûr de vouloir quitter ?',  
                'Tous les progrès dans cette session seront perdus',  
                [  
                    {  
                        text: 'Annuler',  
                        onPress: () => console.log('Annuler Pressed'),  
                        style: 'cancel',  
                    },  
                    {text: 'Quitter', onPress: () => this._goHomeScreen()},  
                ]  
            )
        }
        else 
            this._goHomeScreen()
    }


    render() {
        console.log('SeriesScreen : Render SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS')


        const indexInSeries = this.props.navigation.state.params.indexInSeries
        const queres = this.props.QueresSeries[indexInSeries]

        const level = queres.level
        const afterResponseLevel = queres.afterResponseLevel
        const levelChanged = (afterResponseLevel != level)
        const capitalImage = queres.image

        // let imageUrl = 'file:../Helpers/capital_images/' + this.props.QueresSeries[this.props.QuestionsCounter].capital.toLowerCase() + '.jpeg'

        // Progress bar for the series of tests
        let progressWidth = ((indexInSeries) / G_Config.SeriesLength)*100+'%'

        // Popup Elements 
        // Popup CSS
        
        // const afterResponseRNbForNextLevel = queres.afterResponseRNbForNextLevel
        const levelForImage = levelChanged ? afterResponseLevel : level 
        let imageLevelHeightTab = [25,25,25,25,60]
        let imageLevelWidthRatio = [1,2.1,3.2,4.3,2]
        let imageLevelHeight = verticalScale(imageLevelHeightTab[levelForImage])
        let imageLevelWidth = imageLevelHeight*imageLevelWidthRatio[levelForImage]

        let popupVerdict = ''
        let pointsWon = 0

        if (queres.isResponseRight) {
            popupVerdict = "BRAVO !"
            pointsWon = queres.pointsWon
            popupPointsWon = "+ "+pointsWon+" pt"+(pointsWon>1?"s":"")+" !"
            popupBackgroundColor = COLORS.okBackgroundColor
            popupTextColor = COLORS.okTextColor
            popupButtonBackgroundColor = COLORS.okButtonBackgroundColor
            popupButtonBorderBottomColor = COLORS.okButtonBorderBottomColor
        }
        else {
            popupVerdict = "Attention !"
            popupPointsWon = ""
            popupBackgroundColor = COLORS.nokBackgroundColor
            popupTextColor = COLORS.nokTextColor
            popupButtonBackgroundColor = COLORS.nokButtonBackgroundColor
            popupButtonBorderBottomColor = COLORS.nokButtonBorderBottomColor
        }
        
        // Popup Texts
        let popupConfirmationText = "La capitale "+queres.prefixe
        let typoWarningText = ""
        let popupFlexSize = 7
        if (level >= 3) {
            popupFlexSize = 5
        }
        let popupCheeringText = ""
        let popupCheeringText2 = ""
        let complexityText = "Degré de"
        let complexityText2 = "connaissance"
        let cheeringView = <View style={{ flex: 1 }}></View>

        if (queres.isResponseRight) {
            if (queres.isTypo) 
                typoWarningText = "(attention : il y a une faute de frappe)"
             if (level == 2) {
                popupCheeringText = "Capitale CONNUE !"
                popupCheeringText2 = "(elle ne vous sera plus demandée)"
                cheeringView = 
                    <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center', borderColor: 'green', borderRadius: 10, borderWidth: 1, backgroundColor: 'chartreuse' }}>
                        <Text style={{  color: popupTextColor, fontFamily: 'CapitalesFont_Medium',  fontSize: scale(23) }}>{popupCheeringText}</Text>
                        <Text style={{  color: popupTextColor, fontFamily: 'CapitalesFont_Light',  fontSize: scale(17) }}>{popupCheeringText2}</Text>
                    </View>
        
            }
        }
        else {
            popupCheeringText = ""
        }
         
    
        // Popup Cheering View

        // End of Popup View

        // Response View
        let responses = queres.proposedResponses
        let responseView = <View> <Text> fake </Text> </View> // juste pour intialiser la variable
        let question  = queres.state
        let questionIntro = "Capitale "
        let answer = queres.capital
        if (level == 0) {
            responseView = 
            <View style={styles.response_view}>
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
                    <TouchableOpacity style={Gstyles.button}
                        onPress={() => { this._displayResponseResults(queres, responses[0], level) }}>
                        <Text style={Gstyles.ans_button_text}> {responses[0].capital} </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={Gstyles.button}
                        onPress={() => { this._displayResponseResults(queres, responses[1], level) }}>
                        <Text style={Gstyles.ans_button_text}> {responses[1].capital} </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={Gstyles.button}
                        onPress={() => { this._displayResponseResults(queres, responses[2], level) }}>
                        <Text style={Gstyles.ans_button_text}> {responses[2].capital} </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={Gstyles.button}
                        onPress={() => { this._displayResponseResults(queres, responses[3], level) }}>
                        <Text style={Gstyles.ans_button_text}> {responses[3].capital} </Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <TouchableOpacity style={Gstyles.button}
                        onPress={() => { this._displayResponseResults(queres, responses[4], level) }}>
                        <Text style={Gstyles.ans_button_text}> {responses[4].capital} </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={Gstyles.button}
                        onPress={() => { this._displayResponseResults(queres, responses[5], level) }}>
                        <Text style={Gstyles.ans_button_text}> {responses[5].capital} </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={Gstyles.button}
                        onPress={() => { this._displayResponseResults(queres, responses[6], level) }}>
                        <Text style={Gstyles.ans_button_text}> {responses[6].capital} </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={Gstyles.button}
                        onPress={() => { this._displayResponseResults(queres, responses[7], level) }}>
                        <Text style={Gstyles.ans_button_text}> {responses[7].capital} </Text>
                    </TouchableOpacity>
                </View>
            </View>
        }
        else if (level == 1) {
            question = queres.capital
            questionIntro = "Quel est le pays dont la capitale est "
            answer = queres.state
            responseView = 
            <View style={styles.response_view}>
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
                    <TouchableOpacity style={Gstyles.button}
                        onPress={() => { this._displayResponseResults(queres, responses[0], level) }}>
                        <Text style={Gstyles.ans_button_text}> {responses[0].state} </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={Gstyles.button}
                        onPress={() => { this._displayResponseResults(queres, responses[1], level) }}>
                        <Text style={Gstyles.ans_button_text}> {responses[1].state} </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={Gstyles.button}
                        onPress={() => { this._displayResponseResults(queres, responses[2], level) }}>
                        <Text style={Gstyles.ans_button_text}> {responses[2].state} </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={Gstyles.button}
                        onPress={() => { this._displayResponseResults(queres, responses[3], level) }}>
                        <Text style={Gstyles.ans_button_text}> {responses[3].state} </Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
                    <TouchableOpacity style={Gstyles.button}
                        onPress={() => { this._displayResponseResults(queres, responses[4], level) }}>
                        <Text style={Gstyles.ans_button_text}> {responses[4].state} </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={Gstyles.button}
                        onPress={() => { this._displayResponseResults(queres, responses[5], level) }}>
                        <Text style={Gstyles.ans_button_text}> {responses[5].state} </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={Gstyles.button}
                        onPress={() => { this._displayResponseResults(queres, responses[6], level) }}>
                        <Text style={Gstyles.ans_button_text}> {responses[6].state} </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={Gstyles.button}
                        onPress={() => { this._displayResponseResults(queres, responses[7], level) }}>
                        <Text style={Gstyles.ans_button_text}> {responses[7].state} </Text>
                    </TouchableOpacity>
                </View>
            </View>
        }
        else if (level == 2) { // Text input
            if (this.state.inputResponse.localeCompare("") == 0) {
                checkButtonStyle = Gstyles.button_inactive
                checkTextButtonStyle = Gstyles.check_text_inactive
            }
            else {
                checkButtonStyle = Gstyles.button
                checkTextButtonStyle = Gstyles.button_text
            }
            responseView = 
                //<KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={{ flex: 7, flexDirection: 'column', justifyContent: 'flex-start', paddingTop: verticalScale(15) }}>
                <View style={{ flex: 7, flexDirection: 'column', justifyContent: 'flex-start', width: '90%', 
                    marginTop: verticalScale(15) }}>
                        <TextInput
                            style={{ fontFamily: 'CapitalesFont_Light',  fontSize:scale(20), height: verticalScale(50),
                                backgroundColor: 'gainsboro', borderColor: 'darkgray', 
                                borderWidth: 2, borderRadius: 10, paddingLeft: scale(5), paddingRight: scale(5), marginLeft: scale(5), marginRight: scale(5)  }}
                                placeholder='Ecris la capitale'
                                placeholderTextColor='dimgrey'
                                onChangeText={(text) => this.setState({inputResponse: text})}
                        />
                        <TouchableOpacity style={ checkButtonStyle } 
                            onPress={() => { this._displayResponseResults(queres, { state : queres.state, capital: this.state.inputResponse }, level) }}>
                            <Text style={checkTextButtonStyle}> Vérifier </Text>
                        </TouchableOpacity>
                        <View style={{ height: verticalScale(60) }}>
                        </View>
                </View>
        }

        levelSquareDim = 20

        return (
            <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={ Gstyles.main_view }>
                <View style={ styles.quitAndProgressBar_view }>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <TouchableOpacity onPress={()=> this._showAlertQuitSeries() }>
                            <Image style={{ width: scale(25), height: verticalScale(25) }} source={require('../Images/quit-screen.png')} />
                        </TouchableOpacity>
                    </View>
                    <View style={ styles.progressBar_view  }>
                        <View style={{ flexDirection: 'row', backgroundColor: 'gainsboro', borderRadius: 10, height: 10 }}>
                            <View style={{ backgroundColor: '#78c800', borderRadius: 10, position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, width: progressWidth}}>
                            </View>        
                        </View>      
                    </View>
                </View>
                <View style={ styles.question_view }>
                    <Text style={{ fontFamily: 'CapitalesFont_Medium',  fontSize: scale(16) }}>{ questionIntro }</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontFamily: 'CapitalesFont_Medium',  fontSize: scale(16) }}>{ level == 1 ? "" : queres.prefixe+"  " }</Text>
                        <Text style={{ fontFamily: 'CapitalesFont_Medium',  fontSize: scale(36) }}>{ question } ?</Text>
                    </View>
                </View>
                <View style={styles.image_view}>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                    </View>
                    <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}>
                        <Animated.Image style={{ height: verticalScale(200), width: verticalScale(200), transform: [{ scale: this.imageHeight }] }} source={ capitalImage } />
                    </View>
                    <View style={{ flex: 2, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <QuestionLevelSymbol squareDim= { 20 } level= { levelForImage }/>
                        <Text style={{ fontFamily: 'CapitalesFont_Light',  fontSize: verticalScale(13) }}> { complexityText } </Text>
                        <Text style={{ fontFamily: 'CapitalesFont_Light',  fontSize: verticalScale(13) }}> { complexityText2 } </Text>
                   </View>
                </View>
                { responseView }
                <View style={styles.ad_view} >
                    <Text style={styles.title_text}></Text>
                </View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        console.log('Modal has been closed')
                    }}>
                    <View style={{ flex: 1 }}>
                        <View style={{ flex: 1 }}></View>
                        <View style={{ flex: 1 }}></View>
                        <View style={{ flex: 1 }}></View>
                        <View style={{ flex: 6 }}></View>
                        <TouchableWithoutFeedback onPress={() => { this.__hideResponseResults() }}>
                            <View style={{ flex: popupFlexSize, flexDirection: 'column', backgroundColor: popupBackgroundColor, padding: scale(10) }}>
                                    <View style={{ flex: 3, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ color: popupTextColor, fontFamily: 'CapitalesFont_Medium',  fontSize: verticalScale(30) }}>{ popupVerdict }</Text>
                                        <Text style={{ color: popupTextColor, fontFamily: 'CapitalesFont_Medium',  fontSize: verticalScale(20) }}>{ popupConfirmationText } { queres.state } est</Text>
                                        <Text style={{ color: popupTextColor, fontFamily: 'CapitalesFont_Medium',  fontSize: verticalScale(25) }}>{ queres.capital }</Text>
                                        <Text style={{ color: popupTextColor, fontFamily: 'CapitalesFont_Light',  fontSize: verticalScale(15) }}>{ typoWarningText }</Text>
                                    </View>
                                    { cheeringView }
                                    <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                                        <TouchableOpacity onPress={() => { this.__hideResponseResults() }} style={[Gstyles.button, { backgroundColor:popupButtonBackgroundColor, borderBottomColor:popupButtonBorderBottomColor }]}  >
                                            <Text style={ Gstyles.button_text }>OK</Text>
                                        </TouchableOpacity>
                                    </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </Modal>
            </KeyboardAvoidingView>
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
        flex: 3, 
        justifyContent: 'center', 
        alignItems: 'center'  
    },
    image_view: {
        flex: 5, 
        flexDirection: 'row', 
        justifyContent: 'center'
    },
    response_view: {
        flexDirection: 'row', 
        flex: 7, 
    },
    text_response_view: {
        flex: 7,
        flexDirection: 'column', 
        justifyContent: 'flex-end', 
        paddingTop: verticalScale(15)
    },
    ad_view: {
        flex: 1, 
    },
    title_text: {
        height: verticalScale(50)
    },
    progressBar_view: {
        flex: 6, 
        justifyContent: 'center' 
    },
    progressBar: {
        position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, height: verticalScale(20),
        width: '40%',
        borderColor: '#000',
        borderWidth: 4,
        borderRadius: 5,
        backgroundColor: "#8BED4F"
       },
    modal_view: {
        backgroundColor: "#fff",
        width: scale(300),
        height: verticalScale(300)
    },
})

const mapStateToProps = state => {
    return {
        QuestionStatsList: state.HandleQueresStatsReducer.QuestionStatsList,
        QueresSeries: state.HandleQueresSeriesReducer.QueresSeries,
        PlayerLevel: state.HandleQueresStatsReducer.PlayerLevel,
        soundsActive: state.HandleUserPrefsReducer.soundsActive,
    }
}

export default connect(mapStateToProps)(SeriesScreen)
