import React from "react";

const TabContent = ({ id, children }) => {
  return (
    <div className="tab-pane fade" id={id}>
      {children}
    </div>
  );
};

export default TabContent;
