import React from "react";

export const Intro = ({ signIn }: any) => (
  <div className="col-md-12">
    <div className="jumbotron">
      <h2 className="display-4">Welcome to abstrakt</h2>
      <p className="lead"><em>take control of your time</em></p>
      <button className="btn btn-outline-dark" onClick={signIn}>Sign in with Google</button>
    </div>
  </div>
);
