import React from 'react'
import { Text, View, Animated, Easing, StyleSheet } from 'react-native'
import { scale, moderateScale, verticalScale} from '../Helpers/scaling_utils';
import RNExitApp from 'react-native-exit-app'


const barHeight = verticalScale(45)
progressDuration = 200


// Affiche la progression en cours pour une zone
// Ce symbole s'affiche dans une vue avec les propriétes Flex : flexDirection: 'column', justifyContent: 'center', alignItems: 'center'

export class ProgressLevelSymbol extends React.Component {


    constructor(props) {
        // console.log("ProgressLevelSymbol Constructor !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!)")
        super(props);

        this.state = {
            progress: new Animated.Value(0),
            progressViewWidth: 0
        }
    }

    componentDidMount() {
        // console.log("Progress Level Symbole ------------------------------------------------> ComponentDidmount")
        this.state.progress.setValue(0) 
        const myWidth = G_ScreenWidth*(100-10-10)/100*80/100 // HORRIBLE VERRUE Pour avoir la largeur de la progressView (puisque OnLayout ne fonstionne pas correctement)
                                                    // 100-3-3-3-3 = les 2x3% de marge de la fenetre englobante + les 2x3% de marge déclarés plus haut
        this.setState({ progressViewWidth: myWidth }) 
        //console.log("Progress Level Symbole - progressViewWidth = ",  myWidth)
    }


    _initProgressAnimation = (oldPoints, maxPoints) => {
        //console.log('Progress Level Symbol oldPoints  = ', oldPoints)
        //console.log('Progress Level Symbol maxPoints  = ', maxPoints)
        this.state.progress.setValue(oldPoints/maxPoints * this.state.progressViewWidth)
    }


    _animateProgress  = () => {
        //console.log("progress Level Symbol : _animateProgress label = ", this.props.label)
        if (this.props.oldPoints == this.props.points) {
            this.props.onEndAnim3()
            return
        }
        this._animateProgress2()
    }

    
    _animateProgress2  = () => {
        //console.log("progress Level Symbol : _animateProgress2  this.props.points ", this.props.points)
        //console.log("progress Level Symbol : _animateProgress2  this.props.points ", this.props.maxPoints)
        //console.log("progress Level Symbol : _animateProgress2  this.state.progressViewWidth ", this.state.progressViewWidth)

        Animated.timing(this.state.progress, {
                toValue: this.props.points/this.props.maxPoints * this.state.progressViewWidth,
                duration: progressDuration, 
                useNativeDriver: true, 
                easing: Easing.linear
        }).start( () =>  {                
            this.props.onEndAnim3()
        })
    }

    _closeAnimations  = () => {
        // console.log("progress Symbol : closeAnimations")
    }

    _onLayout = (e) => {
        //console.log("ProgressLevelSymbol / Dans onLayout, e.nativeEvent.layout.width = ", e.nativeEvent.layout.width)
        const delta =  Math.abs(e.nativeEvent.layout.width/this.state.progressViewWidth-1)
        // console.log("ProgressSymbol Dans onLayout delta entre e.nativeEvent.layout.width et this.state.progressViewWidth ----------->" , delta )
        if (delta > 0.5/100) {
            console.log("ERREUR VERRUE !!!!!!   ARRET DU SOFT ... ProgressLevelSymbol problème de largeur en pixels de la view barre de progression - cf. VERRUE - le layout a du changer - revoir le calcul manuel - le ratio est de ", delta)
            RNExitApp.exitApp()
        }
    }


    render() {

        const label = this.props.label // chaîne de caractères
        const backgroundColor = this.props.backgroundColor
        const foregroundColor = this.props.foregroundColor
        const textColor = this.props.textColor
        // console.log("render ProgressLevelSymbol backgroundColor = ", backgroundColor)
        // console.log("render ProgressSymbol Zone = ", zone, " oldPoints = ", this.props.oldPoints)
        // console.log("render ProgressSymbol Zone = ", zone, " points = ", this.props.points)
        // console.log("render ProgressSymbol Zone = ", zone, " maxPoints = ", this.props.maxPoints)


        return(
            <View onLayout={ this._onLayout } style={{ flexDirection: 'row', height: barHeight, 
                backgroundColor: backgroundColor, borderColor: '#006400', 
                borderWidth: 1, borderRadius: 5,
                overflow: 'hidden' }}>
                    <Animated.View style={{ position: 'absolute', left: '-100%', width: '100%', top: 0, bottom: 0, 
                        borderRadius: 5, backgroundColor: foregroundColor, 
                        transform: [{ translateX: this.state.progress }] }}>
                    </Animated.View>
                    <View style={{  width:'100%', height: '100%', justifyContent:'center', alignItems: 'center', flexDirection:'row' }} > 
                        <Text style={{ color:textColor, fontFamily: 'CapitalesFont_Light',  fontSize: scale(20) }}>{ label }</Text>
                    </View>
            </View>
      )
    }  
}
