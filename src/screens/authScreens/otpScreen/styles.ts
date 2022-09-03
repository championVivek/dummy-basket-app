import { StyleSheet } from 'react-native';
import Colors from '../../../common/Colors';
import fontFamily from '../../../common/fontFamily';

const styles = StyleSheet.create({
  phNumberText: {
    color: Colors.btnColor,
    fontFamily: fontFamily['Roboto-Bold'],
    fontSize: 14,
  },
  otpText: {
    color: Colors.lineColor,
    fontFamily: fontFamily['Roboto-Regular'],
    fontSize: 14,
  },
  links: {
    color: Colors.btnColor,
    fontFamily: fontFamily['Roboto-Bold'],
    fontSize: 18,
    paddingVertical: 15,
  },
  otpContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 40,
  },
  underlineStyleBase: {
    width: 50,
    height: 80,
    borderWidth: 1,
    textAlign: 'center',
    borderColor: Colors.btnColor,
    backgroundColor: Colors.btnColor,
    borderRadius: 5,
    color: 'white',
    fontFamily: fontFamily['Roboto-Bold'],
    fontSize: 50
  },
});

export default styles;
