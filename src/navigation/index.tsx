import React, { useMemo, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigation from "./AppNavigation";
import { ApolloProvider } from "@apollo/client";
import initializeApollo from "../utils/graphql/apollo";
import { connect } from "react-redux";
import { Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";



const Routes = (props) => {

  const userToken = useSelector((state) => state.userTokenReducer.token);
  const applicationId = useSelector((state) => state.ApplicationIdReducer.applicationId);


  const APOLLO_STATE_PROP_NAME = "__APOLLO_STATE__";

  // function useApollo(pageProps: any) {
  //   const state = pageProps[APOLLO_STATE_PROP_NAME];
  //   console.log("props ", props);
  //   return useMemo(() => initializeApollo(state, props.userToken), [state]);
  // }

  const apolloClients = useMemo(
    () => initializeApollo(null, userToken, applicationId),
    [props, userToken]
  );

  return (
    <>
      <ApolloProvider client={apolloClients}>
        <NavigationContainer>
          <AuthNavigation />
        </NavigationContainer>
      </ApolloProvider>
    </>
  );
};

export default Routes;
