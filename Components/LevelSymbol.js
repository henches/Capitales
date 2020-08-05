import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { array } from 'prop-types'
import { scale, moderateScale, verticalScale} from '../Helpers/scaling_utils';

var BoxHeight = verticalScale(30)
var boxStyle = []


export class LevelSymbol extends React.Component {


    constructor() {
        console.log("LevelSymbol Constructor !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!)")

        for (let i = 0; i < G_Config.MaxPlayerLevelNumber; i++)
            boxStyle.push({ fontFamily: 'CapitalesFont_Light',  fontSize: scale(20), color: 'transparent', borderWidth : 2, boxHeight : BoxHeight })

        super();

    }



    render() {
        for (let i = 0; i < G_Config.MaxPlayerLevelNumber; i++)
            boxStyle[i] = { fontFamily: 'CapitalesFont_Light',  fontSize: scale(20), color: 'transparent', borderWidth : 2, boxHeight : BoxHeight, marginTop: scale(5) }

        boxStyle[this.props.playerLevel].fontSize = scale(25)
        boxStyle[this.props.playerLevel].color = 'blue'
        boxStyle[this.props.playerLevel].borderWidth = 6
        boxStyle[this.props.playerLevel].boxHeight = BoxHeight*1.8
        boxStyle[this.props.playerLevel].fontFamily = 'CapitalesFont_Medium'

        return(
            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', marginRight: '8%', marginLeft: '8%' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={ [styles.triangle, { borderLeftColor: boxStyle[10].color }]}></View>
                    <View style={ [styles.levelBox, { backgroundColor: PlayerLevelStyle[10].backgroundColor, borderWidth: boxStyle[10].borderWidth, height: boxStyle[10].boxHeight }] }>
                        <Text style={{ fontFamily: boxStyle[10].fontFamily,  fontSize: boxStyle[10].fontSize, color: PlayerLevelStyle[10].textColor }}> 10. { PlayerLevelStyle[10].text } </Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={ [styles.triangle, { borderLeftColor: boxStyle[9].color }]}></View>
                    <View style={ [styles.levelBox, { backgroundColor: PlayerLevelStyle[9].backgroundColor, borderWidth: boxStyle[9].borderWidth, height: boxStyle[9].boxHeight, marginTop:1, marginBottom: 1 }] }>
                        <Text style={{ fontFamily: boxStyle[9].fontFamily,  fontSize: boxStyle[9].fontSize, color: PlayerLevelStyle[9].textColor }}> 9. { PlayerLevelStyle[9].text } </Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={ [styles.triangle, { borderLeftColor: boxStyle[8].color }]}></View>
                    <View style={ [styles.levelBox, { backgroundColor: PlayerLevelStyle[8].backgroundColor, borderWidth: boxStyle[8].borderWidth, height: boxStyle[8].boxHeight }] }>
                        <Text style={{ fontFamily: boxStyle[8].fontFamily,  fontSize: boxStyle[8].fontSize, color: PlayerLevelStyle[8].textColor }}> 8. { PlayerLevelStyle[8].text } </Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={ [styles.triangle, { borderLeftColor: boxStyle[7].color }]}></View>
                    <View style={ [styles.levelBox, { backgroundColor: PlayerLevelStyle[7].backgroundColor, borderWidth: boxStyle[7].borderWidth, height: boxStyle[7].boxHeight }] }>
                        <Text style={{ fontFamily: boxStyle[7].fontFamily,  fontSize: boxStyle[7].fontSize, color: PlayerLevelStyle[7].textColor }}> 7. { PlayerLevelStyle[7].text } </Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={ [styles.triangle, { borderLeftColor: boxStyle[6].color }]}></View>
                    <View style={ [styles.levelBox, { backgroundColor: PlayerLevelStyle[6].backgroundColor, borderWidth: boxStyle[6].borderWidth, height: boxStyle[6].boxHeight }] }>
                        <Text style={{ fontFamily: boxStyle[6].fontFamily,  fontSize: boxStyle[6].fontSize, color: PlayerLevelStyle[6].textColor }}> 6. { PlayerLevelStyle[6].text } </Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={ [styles.triangle, { borderLeftColor: boxStyle[5].color }]}></View>
                    <View style={ [styles.levelBox, { backgroundColor: PlayerLevelStyle[5].backgroundColor, borderWidth: boxStyle[5].borderWidth, height: boxStyle[5].boxHeight }] }>
                        <Text style={{ fontFamily: boxStyle[5].fontFamily,  fontSize: boxStyle[5].fontSize, color: PlayerLevelStyle[5].textColor }}> 5. { PlayerLevelStyle[5].text } </Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={ [styles.triangle, { borderLeftColor: boxStyle[4].color }]}></View>
                    <View style={ [styles.levelBox, { backgroundColor: PlayerLevelStyle[4].backgroundColor, borderWidth: boxStyle[4].borderWidth, height: boxStyle[4].boxHeight }] }>
                        <Text style={{ fontFamily: boxStyle[4].fontFamily,  fontSize: boxStyle[4].fontSize, color: PlayerLevelStyle[4].textColor }}> 4. { PlayerLevelStyle[4].text } </Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={ [styles.triangle, { borderLeftColor: boxStyle[3].color }]}></View>
                    <View style={ [styles.levelBox, { backgroundColor: PlayerLevelStyle[3].backgroundColor, borderWidth: boxStyle[3].borderWidth, height: boxStyle[3].boxHeight }] }>
                        <Text style={{ fontFamily: boxStyle[3].fontFamily,  fontSize: boxStyle[3].fontSize, color: PlayerLevelStyle[3].textColor }}> 3. { PlayerLevelStyle[3].text } </Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={ [styles.triangle, { borderLeftColor: boxStyle[2].color }]}></View>
                    <View style={ [styles.levelBox, { backgroundColor: PlayerLevelStyle[2].backgroundColor, borderWidth: boxStyle[2].borderWidth, height: boxStyle[2].boxHeight }] }>
                        <Text style={{ fontFamily: boxStyle[2].fontFamily,  fontSize: boxStyle[2].fontSize, color: PlayerLevelStyle[2].textColor }}> 2. { PlayerLevelStyle[2].text } </Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={ [styles.triangle, { borderLeftColor: boxStyle[1].color }]}></View>
                    <View style={ [styles.levelBox, { backgroundColor: PlayerLevelStyle[1].backgroundColor, borderWidth: boxStyle[1].borderWidth, height: boxStyle[1].boxHeight }] }>
                        <Text style={{ fontFamily: boxStyle[1].fontFamily,  fontSize: boxStyle[1].fontSize, color: PlayerLevelStyle[1].textColor }}> 1. { PlayerLevelStyle[1].text } </Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={ [styles.triangle, { borderLeftColor: boxStyle[0].color }]}></View>
                    <View style={ [styles.levelBox, { backgroundColor: PlayerLevelStyle[0].backgroundColor, borderWidth: boxStyle[0].borderWidth, height: boxStyle[0].boxHeight }] }>
                        <Text style={{ fontFamily: boxStyle[0].fontFamily,  fontSize: boxStyle[0].fontSize, color: PlayerLevelStyle[0].textColor }}> 0. { PlayerLevelStyle[0].text } </Text>
                    </View>
                </View>
            </View>
      )
    }  
}

const styles = StyleSheet.create({
    levelBox: {
        justifyContent: 'center', 
        alignItems: 'center', 
        borderStyle: 'solid', 
        borderColor : 'black', 
        borderRadius: 5, 
        height: BoxHeight, 
        width: '100%',
        marginTop: verticalScale(4),
        marginBottom: verticalScale(4)
    },
    triangle: {
        overflow: 'hidden',
        width: 0,
        height: 0,
        borderBottomColor: 'transparent',
        borderBottomWidth: BoxHeight*2/3,
        borderTopColor: 'transparent',
        borderTopWidth: BoxHeight*2/3,
        borderLeftWidth: BoxHeight,
        marginRight: scale(4)
  // borderRadius: 10
    },
    stats_view: {
        flex:1
    },
    stats_text: {
        height: verticalScale(50)
    },
    play_view: {
        flex:1
    },
    play_button: {
        height: verticalScale(50)
    },
    
})