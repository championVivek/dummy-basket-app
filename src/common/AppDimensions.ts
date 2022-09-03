import { Dimensions } from "react-native";

export const SCREEN_WIDTH = Dimensions.get("window").width
export const SCREEN_HEIGHT = Dimensions.get("window").height
export const heightLessNum = SCREEN_HEIGHT < 750;
export const heightGreaterNum = SCREEN_HEIGHT > 750;
