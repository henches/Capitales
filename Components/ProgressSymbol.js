import React from 'react'
import { Text, View, Animated, TouchableOpacity, Easing, Bounce } from 'react-native'
import { scale, moderateScale, verticalScale} from '../Helpers/scaling_utils';


const barHeight = verticalScale(18)
progressDuration = 300
progressCountDuration = 500


// Affiche la progression en cours pour une zone
// Ce symbole s'affiche dans une vue avec les propriétes Flex : flexDirection: 'column', justifyContent: 'center', alignItems: 'center'

export class ProgressSymbol extends React.Component {


    constructor() {
        console.log("ProgressSymbol Constructor !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!)")
        super();

        this.state = {
            circleSize : new Animated.Value(1),
            progress : new Animated.Value(0),
            minWidth: 0,
            counter : 0
        }
    }

    componentDidMount() {
        console.log("ComponentDidmount")
        this.setState({ counter: this.props.oldPoints })
        this.state.progress.setValue(0)
    }


    _tick = () => {
        this.setState(prevState => ({
            counter: prevState.counter + 1
          }))
    }

    _initProgressAnimation = (oldPoints, maxPoints) => {
        this.setState({ counter: oldPoints })
        console.log('Progress Symbol _initProgressAnimation : minWidth = ', this.state.minWidth)
        console.log('Progress Symbol oldPoints  = ', oldPoints)
        console.log('Progress Symbol maxPoints  = ', maxPoints)
        this.state.progress.setValue(Math.max(oldPoints/maxPoints, this.state.minWidth ))
    }


   _animateProgress  = () => {
        console.log("progress Symbol : _animateProgress zone = ", this.props.zone)
        if (this.props.oldPoints == this.props.points) {
            this.props.onEndAnim3()
            return
        }
        Animated.timing(this.state.circleSize, {
                toValue: 2,
                duration: progressDuration, 
                easing: Easing.linear
        }).start( () =>  {     
            this._animateProgress2()
        })
    }

    
    _animateProgress2  = () => {
        console.log("progress Symbol : _animateProgress2  zone = ", this.props.zone)

        this.setState({ counter: this.props.oldPoints })
        this.interval = setInterval(() => this._tick(), progressDuration/(this.props.points-this.props.oldPoints+1));

        Animated.timing(this.state.progress, {
                toValue: Math.max(this.props.points/this.props.maxPoints, this.state.minWidth),
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
                easing: Easing.linear
        }).start( () =>  {      
            this.props.onEndAnim3()           
        })
    }

    _closeAnimations  = () => {
        console.log("progress Symbol : closeAnimations")
    }

    _onLayout = (e) => {
        if (e.nativeEvent.layout.width != 0) {
            let myMinWidth = barHeight/e.nativeEvent.layout.width
            this.setState({ minWidth: myMinWidth })
            console.log('Progress Symbol _onLayout : e.nativeEvent.layout.width = ', e.nativeEvent.layout.width)
            console.log('Progress Symbol _onLayout : % = ', myMinWidth)
        }
        else 
            console.log('Progress Symbol _onLayout : e.nativeEvent.layout.width = 0')

      }
  

    render() {

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
        let myFontWeight = 'normal'
            if (this.props.isTypeFull) {
            myViewMarginLeft = '3%'
            myViewMarginRight = '3%'
            myProgressMarginLeft = '0%'
            myProgressWidth = '100%'
            myFlexDirection = 'column-reverse'
            myJustifyContent = 'center'
            myFontSize = 20
            myFontWeight = 'bold'
        }

        return(
            <View style={{ flex: myFlex, flexDirection: myFlexDirection, justifyContent: myJustifyContent, alignItems: 'center', marginRight: myViewMarginRight, marginLeft: myViewMarginLeft }}>
                <Text style={{ fontSize: scale(myFontSize), fontWeight: myFontWeight }}>{ zone }</Text>
                <View onLayout={ this._onLayout } style={{ marginLeft:myProgressMarginLeft, flexDirection: 'row', justifyContent:'flex-start', alignItems: 'center', backgroundColor: 'lightskyblue', borderRadius: 10, height: barHeight, width: myProgressWidth }}>
                    <Text style={{ position: 'absolute', left: '95%', fontSize: scale(10), color: 'black' }}> { this.props.maxPoints } </Text>
                    <Animated.View style={{ flexDirection: 'row', justifyContent: 'flex-end', backgroundColor: 'blue', borderRadius: 10, height: barHeight, 
                            width: this.state.progress.interpolate({ inputRange: [0,1], outputRange: ["0%","100%"] }) }}>      
                        <Animated.View style={{ transform: [{ scale: this.state.circleSize }] }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: 'blue', borderRadius: 50, height: barHeight, width: barHeight }}>
                                <Text style={{ fontSize: scale(11), fontWeight: 'bold', color: 'white' }}> { this.state.counter } </Text>
                            </View>   
                        </Animated.View>
                    </Animated.View>
                </View>
            </View>
      )
    }  
}
