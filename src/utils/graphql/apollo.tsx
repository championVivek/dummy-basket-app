import { ApolloClient, ApolloLink, createHttpLink, InMemoryCache, } from "@apollo/client";
import { MultiAPILink } from "@habx/apollo-multi-endpoint-link";
import { STRAPI_URL } from "@env";


function createApolloClient(token: string, applicationId: string) {
  return new ApolloClient({
    link: ApolloLink.from([
      new MultiAPILink({
        getContext: (endpoint) => {
          return {};
        },
        endpoints: {
          strapi: STRAPI_URL,
        },
        createHttpLink: () => createHttpLink(),
      }),
    ]),
    cache: new InMemoryCache(),
  });
}

function initializeApollo(initialState: any = null, token: any, applicationId: any) {

  return createApolloClient(token, applicationId);
}

export default initializeApollo;
