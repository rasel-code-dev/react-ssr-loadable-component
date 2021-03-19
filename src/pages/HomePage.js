import React from "react";
import { Helmet } from "react-helmet";

const HomePage = () => (
  <div>
    <Helmet>
      <title>Home Page</title>
    </Helmet>
    <h1>Home Page</h1>
    <ul>
      <li className="item">Server side and client side component Props load. <br/>
           <strong> (when server pass props then client side ignore it ) </strong>
      </li>
      <li className={"item"}>server side props can be promise or plain object </li>
      
      <li className={"item"}>data Fetching for Redux same as props</li>
    </ul>
  </div>
);

export default HomePage;
