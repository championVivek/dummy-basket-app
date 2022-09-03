import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { KeyboardTypeOptions } from "react-native";

interface customStyle {
  [key: string]: any;
}

export type Props = NativeStackScreenProps<any, any>;

export interface ProgressProps {
  pageIndex?: number | undefined;
  changePage: (e: number) => void;
  navigation?: any;
  data?: { title: string; field: any; skipable: boolean | undefined };
  loading?: boolean | undefined;
  submit?: (e: boolean) => void;
}

export interface TextFieldProps {
  placeholder?: string;
  fontSize?: number;
  autoCorrect?: boolean;
  autoCapitalize?: any;
  defaultValue?: any;
  placeholderColor?: string;
  icon?: JSX.Element;
  leftIconOver?: JSX.Element;
  rightIcon?: JSX.Element;
  rightIcon2?: JSX.Element;
  fontFamily?: string;
  customStyle?: customStyle;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions | undefined;
  editable?: boolean;
  onChangeText: (text: string) => void;
  pointerEvents?: "auto" | "none" | "box-none" | "box-only" | undefined;
  value?: string | undefined;
  error?: boolean;
  errorMessage?: string;
  title?: string;
}

export interface ButtonProps {
  title: string;
  logo?: JSX.Element;
  customStyle?: customStyle;
  onPress: () => void;
  disable?: boolean;
  fontColor?: string;
  font_family?: string;
}

export interface HeaderProps {
  navigation: any;
  title: string | undefined;
  wizards?: boolean;
  onPress?: any;
  color?: string;
  rightIcon?: boolean;
}

export interface OfferCardProps {
  onPress?: () => void;
  children?: JSX.Element;
  btnTitle: string;
  btn?: boolean;
  data: any
}

interface CoordinatesProps {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

interface MapProps {
  coordinates: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
}

interface SaveCardProps {
  noCard?: boolean;
  background?: string;
  fullWidth?: boolean;
  data?: any;
}

interface CardProps {
  // i am changing this property to match with data we recieve from the server

  lastFour: string;
  expiryMonth: string;
  expiryYear: string;
  cardType: string;
  name: string;

  // card: {
  //   last4: any;
  //   exp_month: string;
  //   exp_year: string;
  //   name: string;
  //   brand: any;
  // };
}

interface IdProps {
  id: string;
  type: string;
  name: string;
}

interface sectionProps {
  id: string;
  quantity?: string;
  name: string;
  value: string;
  finance?: string;
}

declare module "@env" {
  export const AUTHO_DOMAIN: string;
  export const AUTHO_CLIENTID: string;
  export const AUTHO_CONNECTION: string;
  export const AUTHO_AUDIENCE: string;
  export const PLAID_CLIENTID: string;
  export const PLAID_SECRET: string;
  export const BACKEND_URL: string;
  export const STRIPE_KEY: string;
  export const STRAPI_URL: string;
  export const MERCHANT_URL: string;
}
