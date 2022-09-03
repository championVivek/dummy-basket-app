import { showMessage } from "react-native-flash-message";

const ErrorHandle = (error: any) => {
  if (error.response) {
    console.log(error.response.status);
    
    if(error.response.status === 400 ) {
      showMessage({
        message: "Please check your details.",
        type: "danger",
      });      
    }
    if(error.response.status === 401) {
      showMessage({
        message: "Unauthenticated",
        type: "danger",
      }); 
    } 
    if(error.response.status === 403) {
      showMessage({
        message: "Unauthorized access.",
        type: "danger",
      }); 
    }
    if(error.response.status === 404) {
      showMessage({
        message: "The server can not find the requested resource.",
        type: "danger",
      })
    }
    if (error.response.status > 500) {
      showMessage({
        message: "Server error. Please try again later.",
        type: "danger",
      });
    }
  }
};

export default ErrorHandle;
