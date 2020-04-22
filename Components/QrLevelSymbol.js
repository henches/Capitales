import React from 'react'
import { Image, View } from 'react-native'
import { G_GetLevelFromRightResponsesNb } from '../Helpers/PointsManager'
import { COLORS, Gstyles } from './Styles'


export class QrLevelSymbol extends React.Component {

    /*
    static propTypes = {
        status: PropTypes.number.isRequired,
        rightResponsesNb: PropTypes.number.isRequired,
        symbolHeight : PropTypes.number.isRequired,
        maxRightResponses : PropTypes.number.isRequired,
    }

    */

    render() {
        // cette classe  les props
        // level : de 0 à 4
        // rightResponsesNb : Nombre de bonnes réponses de 0 à n
        // maxRightResponses : NombreMaximum de bonnes réponses
        // symbolHeight : hauteur du symbole

        const rightResponsesNb = this.props.rightResponsesNb
        const maxRightResponses = this.props.maxRightResponses
        const symbolHeight = this.props.symbolHeight

        const elt = G_GetLevelFromRightResponsesNb(rightResponsesNb)
        const level = elt.level

        const levelSize = symbolHeight/(maxRightResponses)

        const levelImageSize = levelSize*0.3
        const progress = levelSize*Math.min(rightResponsesNb, maxRightResponses)

        const decX = 5
        const decY = -2


        const yFirstImageLevelPos = symbolHeight-levelSize-decY
        const ySecondImageLevelPos = symbolHeight-levelSize*2-decY
        const yThirdImageLevelPos = symbolHeight-levelSize*3-decY
        const yFourthImageLevelPos = symbolHeight-levelSize*4-decY

        
        const left = -levelImageSize/2+decX

        let image1 = G_Config.Level[1].NotReachedImage
        let image2 = G_Config.Level[2].NotReachedImage
        let image3 = G_Config.Level[3].NotReachedImage
        let image4 = G_Config.Level[4].NotReachedImage

        if (level == 1) {
            image1 = G_Config.Level[1].Image
        }
        else if (level == 2) {
            image1 = null
            image2 = G_Config.Level[2].Image
        }
        else if (level == 3) {
            image1 = null
            image2 = null
            image3 = G_Config.Level[3].Image
        }
        else if (level == 4) {
            image1 = null
            image2 = null
            image3 = null
            image4 = G_Config.Level[4].Image

        }

        /*
                <View style={[{ backgroundColor: 'lawngreen', borderRadius: 10, position: 'absolute', left: 0, right: 0, top: symbolHeight-progress, bottom: 0 }, { height: progress }]}>
                </View>         
        */

        console.log("status = " + level + " rightResponsesNb : " + rightResponsesNb + " symbolHeight : ", symbolHeight, " progress : ", progress, " levelSize: ",  levelSize, " yFirstImageLevelPos : ", yFirstImageLevelPos)
        console.log(" G_Config.Level[0] : ", G_Config.Level[0])
        return(
            <View style={{ marginTop: 0, height: symbolHeight, alignSelf: 'center'}}>
                    <Image  style={{ position: 'absolute', top: yFirstImageLevelPos, bottom: 0, width: levelImageSize+30, height: levelImageSize+40 }} source={image1} />
                    <Image  style={{ position: 'absolute', top: ySecondImageLevelPos, bottom: 0, width: levelImageSize+30, height: levelImageSize+40 }} source={image2} />
                    <Image  style={{ position: 'absolute', top: yThirdImageLevelPos, bottom: 0, width: levelImageSize+30, height: levelImageSize+40 }} source={image3} />
                    <Image  style={{ position: 'absolute', top: yFourthImageLevelPos, bottom: 0, width: levelImageSize+30, height: levelImageSize+40 }} source={image4} />
            </View>
        )
    }  
    /*                    <View style={{ backgroundColor: 'aqua', marginTop: 0, borderRadius: 10, height: symbolHeight, width:11, alignSelf: 'center'}}>
                        <View style={[{ backgroundColor: 'dodgerblue', borderRadius: 10, height: 10, position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }, { height: progress }]}></View>         
                    </View>

    */
}
