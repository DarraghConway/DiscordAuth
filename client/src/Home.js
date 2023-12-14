import React from "react";
import CollapsibleTabs from "./components/collapsibleTabs";
import Navigation from "./components/nav";

const Home = () => {
  return (
    <div>
      <Navigation />
      <CollapsibleTabs /> {/*Use the CollapsibleTabs component here */}
    </div>
  );
};

export default Home;
