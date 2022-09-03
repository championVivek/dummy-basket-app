import {StyleSheet} from 'react-native';
import Colors from '../../common/Colors';
import fontFamily from '../../common/fontFamily';

const styles = StyleSheet.create({
  btnContainer: {
    backgroundColor: Colors.btnColor,
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
  },
});

export default styles;
