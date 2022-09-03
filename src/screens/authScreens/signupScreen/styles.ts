import { Dimensions, StyleSheet, useWindowDimensions } from 'react-native';
import Colors from '../../../common/Colors';
import fontFamily from '../../../common/fontFamily';

const styles = StyleSheet.create({
  imageContainer:{
    alignSelf:'center',
    marginVertical:20,
    height:'30%'
  },
  image:{
    resizeMode:'contain'
  },
  title: {
    color: Colors.fontColor,
    fontSize: 32,
    paddingBottom: 10,
    fontFamily: fontFamily['Roboto-Bold'],
  },
  conditionText: {
    color: '#85858580',
    fontSize: 12,
    lineHeight: 20,
    fontFamily: fontFamily['Roboto-Regular'],
  },
  conditionLink: {
    color: Colors.fontColor,
    fontSize: 12,
    textAlign: 'center',
    fontFamily: fontFamily['Roboto-Regular'],
  },
  conditionContainer: {
    paddingVertical: 10,
  },
  registerContainer: {
    alignSelf: 'center',
    paddingTop: 25,
    flexDirection: 'row',
    alignItems: 'center',
  },
  registerLinkText: {
    color: Colors.lineColor,
    fontFamily: fontFamily['Roboto-Regular'],
    fontSize: 18,
  },
  registerLink: {
    color: Colors.fontColor,
    fontFamily: fontFamily['Roboto-Bold'],
    fontSize: 18,
  },
});

export default styles;
