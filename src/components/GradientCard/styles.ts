import { StyleSheet } from 'react-native'
import Colors from '../../common/Colors'
import fontFamily from '../../common/fontFamily'

const styles = StyleSheet.create({
    container: {
        flex: 0,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        position: "relative",
      },
    gradientStyle: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 25,
      },
      offerWrapper: {
        backgroundColor: Colors.progressBarColor,
        width: "45%",
        padding: 15,
        borderRadius: 20,
        position: "absolute",
        zIndex: 21,
        right: 30,
        top: -23,
      },
      offerTitle: {
        textAlign: "center",
        color: "#fff",
        fontFamily: fontFamily["Roboto-Regular"],
        fontSize: 12,
      },
})

export default styles