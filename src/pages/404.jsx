import React from "react";
import "../App.css";

import { useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();

  return (
    <>
      <div className="flex-col transcenter flexc font-inter">
        <h1 className="text-2xl font-bold">Oops!</h1>
        <p className="mt-3 text-base">Sorry, an unexpected error has occured</p>
        <p className="mt-2 text-base">{error.statusText || error.message}</p>
      </div>
    </>
  );
}

export default ErrorPage;
