import React, { useState } from 'react'
import { Text, View, Animated, TouchableOpacity, Easing, Bounce } from 'react-native'
import { scale, moderateScale, verticalScale} from '../Helpers/scaling_utils';
import RNExitApp from 'react-native-exit-app'


const barHeight = verticalScale(18)
const progressDuration = 200
const progressCountDuration = 300

// Affiche la progression en cours pour une zone
// Ce symbole s'affiche dans une vue avec les propriétes Flex : flexDirection: 'column', justifyContent: 'center', alignItems: 'center'

export class ProgressSymbol extends React.Component {

    constructor() {
        // console.log("ProgressSymbol Constructor !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!)")
        super();

        this.state = {
            circleSize : new Animated.Value(1),
            progress : new Animated.Value(barHeight),
            counter: 0,
            progressViewWidth: 0
        }
    }

    componentDidMount() {
        // console.log("ProgressSymbol ComponentDidmount")
        this.setState({ counter: this.props.oldPoints })
        this.state.progress.setValue(barHeight)
        
        // console.log("ProgressSymbol ComponentDidmount this.props.isTypeFull = ", this.props.isTypeFull)

        let percent = this.props.isTypeFull ? 1 : 75/100
        this.setState({ progressViewWidth: G_ScreenWidth*(100-3-3-3-3)/100*percent }) // HORRIBLE VERRUE Pour avoir la largeur de la progressView (puisque OnLayout ne fonstionne pas correctement)
                                                    // 100-3-3-3-3 = les 2x3% de marge de la fenetre englobante + les 2x3% de marge déclarés plus haut

}


    _tick = () => {
        this.setState(prevState => ({
            counter: prevState.counter + 1
        }))
    }

    _initProgressAnimation = (oldPoints, maxPoints) => {
        this.setState({ counter: oldPoints })
        // console.log('Progress Symbol _initProgressAnimation --------------------------------->oldPoints  = ', oldPoints)
        // console.log('Progress Symbol _initProgressAnimation --------------------------------->maxPoints  = ', maxPoints)
        this.state.progress.setValue(Math.max(oldPoints/maxPoints * this.state.progressViewWidth, barHeight))
    }

    _animateProgress  = () => {
        console.log("progress Symbol : _animateProgress zone = ", this.props.zone)
        if (this.props.oldPoints == this.props.points) {
            this.props.onEndAnim3()
            return
        }
        Animated.timing(this.state.circleSize, {
                toValue: 2,
                useNativeDriver: true, // <-- Add this
                duration: progressDuration, 
                easing: Easing.linear
        }).start( () =>  {     
            this._animateProgress2()
        })
    }

    
    _animateProgress2  = () => {
         console.log("progress Symbol : _animateProgress2  zone = ", this.props.zone)
         console.log("progress Symbol : _animateProgress2  Math.max(this.props.points/this.props.maxPoints * this.state.progressViewWidth, barHeight) = ", 
             Math.max(this.props.points/this.props.maxPoints * this.state.progressViewWidth, barHeight))
        this.setState({ counter: this.props.oldPoints })
        this.interval = setInterval(() => this._tick(), progressDuration/(this.props.points-this.props.oldPoints+1));

        Animated.timing(this.state.progress, {
                toValue: Math.max(this.props.points/this.props.maxPoints * this.state.progressViewWidth, barHeight),
                useNativeDriver: true, // <-- Add this
                duration: progressDuration, 
                easing: Easing.linear
        }).start( () =>  {                
            clearInterval(this.interval);
            this.setState({ counter: this.props.points })
            this._animateProgress3()
        })
    }

    _animateProgress3  = () => {
        console.log("progress Symbol : _animateProgress3  zone = ", this.props.zone)
        Animated.timing(this.state.circleSize, {
                toValue: 1,
                duration: progressCountDuration, 
                useNativeDriver: true, // <-- Add this
                easing: Easing.linear
        }).start( () =>  {      
            console.log("progress Symbol : ap)rès animation 3")
            this.props.onEndAnim3()           
        })
    }

    _closeAnimations  = () => {
        // console.log("progress Symbol : closeAnimations")
    }

    _onLayout = (e) => {
        //console.log("ProgressSymbol Dans onLayout, e.nativeEvent.layout.width = --------------------------------->", e.nativeEvent.layout.width)
        //console.log("ProgressSymbol Dans onLayout Différence entre e.nativeEvent.layout.width et this.state.progressViewWidth ----------->" , e.nativeEvent.layout.width-this.state.progressViewWidth )
        const delta =  Math.abs(e.nativeEvent.layout.width/this.state.progressViewWidth-1)
        // console.log("ProgressSymbol Dans onLayout delta entre e.nativeEvent.layout.width et this.state.progressViewWidth ----------->" , delta )
        if (delta > 0.5/100) {
            console.log("ProgressSymbol problème de largeur en pixels de la view barre de progression - cf. VERRUE - le layout a du changer - revoir le calcul manuel - le ratio est de ", delta)
            RNExitApp.exitApp()
        }
    }
  
    render() {

        // console.log("ProgressSymbol -----------------------------------------------------> Render")

        const myFlex = this.props.myFlex // chaine de caractères
        const zone = this.props.zone // chaine de caractères
        // console.log("render ProgressSymbol Zone = ", zone, " oldPoints = ", this.props.oldPoints)
        // console.log("render ProgressSymbol Zone = ", zone, " points = ", this.props.points)
        // console.log("render ProgressSymbol Zone = ", zone, " maxPoints = ", this.props.maxPoints)

        let myViewMarginLeft = '3%'
        let myViewMarginRight = '3%'
        let myProgressMarginLeft = '3%'
        let myProgressWidth = '75%'
        let myFlexDirection = 'row'
        let myJustifyContent = 'flex-end'
        let myFontSize = 16
        if (this.props.isTypeFull) {
            myViewMarginLeft = '3%'
            myViewMarginRight = '3%'
            myProgressMarginLeft = '0%'
            myProgressWidth = '100%'
            myFlexDirection = 'column-reverse'
            myJustifyContent = 'center'
            myFontSize = 20
        }


        return(
            <View onLayout={ this._onLayoutEnglobant }  style={{ flex: myFlex, flexDirection: myFlexDirection, justifyContent: myJustifyContent, alignItems: 'center', marginRight: myViewMarginRight, marginLeft: myViewMarginLeft }}>
                <Text style={{ fontFamily: 'CapitalesFont_Light',  fontSize: scale(myFontSize) }}>{ zone }</Text>
                <View onLayout={ this._onLayout } style={{ marginLeft:myProgressMarginLeft, flexDirection: 'row', justifyContent:'flex-start', 
                        alignItems: 'center', backgroundColor: 'lightskyblue', borderRadius: 10, height: barHeight, width: myProgressWidth,
                        overflow: 'hidden' }}>
                    <View style={{ flexDirection: 'row', justifyContent:'flex-end', alignItems: 'center', width: '100%' }}>
                        <Text style={{ fontFamily: 'CapitalesFont_Light',  fontSize: scale(10), color: 'black' }}> { this.props.maxPoints } </Text>
                    </View>
                    <Animated.View style={{ position: 'absolute', left: '-100%', width: '100%', top: 0, bottom: 0,
                            paddingLeft: 0, flexDirection: 'row', justifyContent: 'flex-end', 
                            backgroundColor: 'blue', borderRadius: 10, height: barHeight, 
                            transform: [{ translateX: this.state.progress}] }}>      
                        <Animated.View style={{ transform: [{ scale: this.state.circleSize }] }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: 'blue', 
                                    borderRadius: 50, height: barHeight, width: barHeight }}>
                                <Text style={{ fontFamily: 'CapitalesFont_Light',  fontSize: verticalScale(11), color: 'white' }}> { this.state.counter } </Text>
                            </View>   
                        </Animated.View>
                    </Animated.View>
                </View>
            </View>
        )
    }  
}
