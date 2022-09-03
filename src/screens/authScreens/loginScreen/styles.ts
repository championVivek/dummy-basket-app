import {StyleSheet} from 'react-native';
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
  upperView: {
    borderBottomRightRadius: 200,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.71)',
    height: 250,
  },
  orStyles: {
    flexDirection: 'row',
    flex: 1,
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  hrLine: {
    borderBottomWidth: 1,
    borderColor: Colors.lineColor,
    flex: 0.45,
  },
  title: {
    color: Colors.fontColor,
    fontSize: 32,
    paddingBottom: 10,
    fontFamily: fontFamily['Roboto-Bold'],
  },
  orText: {
    flex: 0.1,
    color: Colors.lineColor,
    height: 18,
    textAlign: 'center',
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
  forgotPass: {
    color: Colors.fontColor,
    fontFamily: fontFamily['Roboto-Bold'],
    fontSize: 14,
  },
  forgotPassContainer: {
    alignSelf: 'flex-end',
    marginTop: 8,
    marginBottom: 40,
  },
});

export default styles;
