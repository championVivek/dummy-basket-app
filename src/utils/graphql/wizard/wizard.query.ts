import { gql, useLazyQuery } from "@apollo/client";

export const GET_WIZARD = gql`
  query wizard($title: String, $locale: I18NLocaleCode)
  @api(contextKey: "apiName") {
    wizards(filters: { title: { eq: $title } }, locale: $locale) {
      data {
        attributes {
          title
          SubmitUrl
          Form {
            Screen {
              id
              skipable
              selectType
              title
              field {
                ... on ComponentWizardField {
                  id
                  name
                  type
                  key
                  placeholder
                  separator
                  description
                  inputType
                  newlineInput
                  inputMax
                  inputMin
                  minLength
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const useGetWizard = (title = "") => {
  return useLazyQuery(GET_WIZARD, {
    variables: { title },
    context: { apiName: "strapi" },
  });
};
