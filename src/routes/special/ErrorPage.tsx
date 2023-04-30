import { isRouteErrorResponse, useRouteError } from "react-router-dom";

const errorMessage = (error: unknown): string => {
  if (isRouteErrorResponse(error)) {
    return `${ error.status } ${ error.statusText }`;
  } else if (error instanceof Error) {
    return error.message;
  } else if (typeof error === "string") {
    return error;
  } else {
    return "Unknown error";
  }
};


function ErrorPage() {
  const error = useRouteError();
  console.error(error);
  
  return (
    <div id="error-page" >
      <h1 >Oops!</h1 >
      <p >Something went wrong.</p >
      <p >
        <i >{ errorMessage(error) }</i >
      </p >
      <p >
        <a href="/" >Go back to the home page</a >
      </p >
    </div >
  );
}

export default ErrorPage;
