import { StyleSheet } from 'react-native'
import Colors from '../../common/Colors'
import fontFamily from '../../common/fontFamily'

const styles = StyleSheet.create({
    skipText: {
        fontFamily: fontFamily['Roboto-Regular'],
        color: 'black',
        fontSize: 16
    },
    skipContainer: {
        alignItems: 'flex-end',
        paddingRight: 20,
        flex: 0.1,
        marginTop:30,
        justifyContent: 'flex-end'
    },
})

export default styles