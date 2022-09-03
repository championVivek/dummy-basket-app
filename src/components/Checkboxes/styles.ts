import { StyleSheet } from 'react-native';
import fontFamily from '../../common/fontFamily';

const styles = StyleSheet.create({
  chkContainer: {
    padding: 15,
    borderWidth: 1.5,
    borderRadius: 20,
    marginHorizontal: 10,
    marginVertical: 5,
    marginLeft: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  text: {
    fontFamily: fontFamily['Roboto-Regular'],
    fontSize: 18,
    paddingRight: 20
  }
});

export default styles;