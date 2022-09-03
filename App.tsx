import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { enableLatestRenderer } from "react-native-maps";
import { Provider } from "react-redux";
import {STRIPE_KEY} from "@env"
import FlashMessage from "react-native-flash-message";
import { StripeProvider } from "@stripe/stripe-react-native";

import Routes from "./src/navigation";
import SplashScreen from "./src/screens/splashScreen";
import Colors from "./src/common/Colors";
import store from "./src/redux/store";
import useCheckNetwork from "./src/hooks/useCheckNetwork";
import CheckNetwork from "./src/components/CheckNetwork/CheckNetwork";

// Get latest map
enableLatestRenderer();

const App = () => {
  const [loading, setLoading] = useState<boolean>(true);

  const checkNetwork = useCheckNetwork();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <Provider store={store}>
      <StripeProvider
        publishableKey={STRIPE_KEY}
        urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
        merchantIdentifier="" // required for Apple Pay
      >
        <View style={{ flex: 1, backgroundColor: Colors.appBackground }}>
          {!checkNetwork && <CheckNetwork show={checkNetwork} />}
          {loading ? <SplashScreen /> : <Routes />}
        </View>
        <FlashMessage position="top" />
      </StripeProvider>
    </Provider>
  );
};

export default App;


