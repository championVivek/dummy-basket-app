import * as React from 'react';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';

interface Iprops {
  children: JSX.Element
}
 
const HideKeyboard: React.FC<Iprops> = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

export default HideKeyboard;
