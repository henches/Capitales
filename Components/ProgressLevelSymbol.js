import React from 'react'
import { Text, View, Animated, Easing, StyleSheet } from 'react-native'
import { scale, moderateScale, verticalScale} from '../Helpers/scaling_utils';


const barHeight = verticalScale(45)
progressDuration = 200


// Affiche la progression en cours pour une zone
// Ce symbole s'affiche dans une vue avec les propriétes Flex : flexDirection: 'column', justifyContent: 'center', alignItems: 'center'

export class ProgressLevelSymbol extends React.Component {


    constructor(props) {
        console.log("ProgressLevelSymbol Constructor !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!)")
        super(props);

        this.state = {
            progress : new Animated.Value(0),
            myWidth : 0,
            oldPoints : 0,
            maxPoints : 1,
        }
    }

    componentDidMount() {
        console.log("Progress Level Symbole ------------------------------------------------> ComponentDidmount")
        this.state.progress.setValue(0)
    }


    _initProgressAnimation = (oldPoints, maxPoints) => {
        console.log('Progress Level Symbol oldPoints  = ', oldPoints)
        console.log('Progress Level Symbol maxPoints  = ', maxPoints)
        console.log('Progress Level Symbol this.state.myWidth  = ', this.state.myWidth)
        this.setState({ oldPoints: oldPoints })
        this.setState({ maxPoints: maxPoints })
        if (this.state.myWidth)
            this.state.progress.setValue(oldPoints/maxPoints * this.state.myWidth)
    }


    _animateProgress  = () => {
        console.log("progress Level Symbol : _animateProgress label = ", this.props.label)
        if (this.props.oldPoints == this.props.points) {
            this.props.onEndAnim3()
            return
        }
        this._animateProgress2()
    }

    
    _animateProgress2  = () => {
        console.log("progress Level Symbol : _animateProgress2  this.props.points ", this.props.points)
        console.log("progress Level Symbol : _animateProgress2  this.props.points ", this.props.maxPoints)
        console.log("progress Level Symbol : _animateProgress2  this.state.myWidth ", this.state.myWidth)
        console.log("progress Level Symbol : _animateProgress2  this.props.points/this.props.maxPoints * this.state.myWidth = ", 
            this.props.points/this.props.maxPoints * this.state.myWidth)

        Animated.timing(this.state.progress, {
                toValue: this.props.points/this.props.maxPoints * this.state.myWidth,
                duration: progressDuration, 
                useNativeDriver: true, 
                easing: Easing.linear
        }).start( () =>  {                
            this.props.onEndAnim3()
        })
    }

    _closeAnimations  = () => {
        console.log("progress Symbol : closeAnimations")
    }

    _onLayout = (e) => {
        this.setState({ myWidth: e.nativeEvent.layout.width })
        console.log("ProgressLevelSymbol / Dans onLayout, myWidth = ", e.nativeEvent.layout.width)
        this.state.progress.setValue(this.state.oldPoints/this.state.maxPoints * this.state.myWidth)
    }

    render() {

        const label = this.props.label // chaîne de caractères
        const backgroundColor = this.props.backgroundColor
        const foregroundColor = this.props.foregroundColor
        const textColor = this.props.textColor
        console.log("render ProgressLevelSymbol backgroundColor = ", backgroundColor)
        // console.log("render ProgressSymbol Zone = ", zone, " oldPoints = ", this.props.oldPoints)
        // console.log("render ProgressSymbol Zone = ", zone, " points = ", this.props.points)
        // console.log("render ProgressSymbol Zone = ", zone, " maxPoints = ", this.props.maxPoints)


        return(
            <View onLayout={ this._onLayout } style={{ flexDirection: 'row', width: '90%', height: barHeight, 
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
