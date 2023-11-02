import React, { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import "./../styles/tabStyles.css";

const CollapsibleTabs = () => {
  const [key, setKey] = useState("tab1");

  return (
    <Tabs
      id="controlled-tabs"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mt-5"
    >
      <Tab eventKey="tab1" title="Tab 1">
        {/* Content for Tab 1 */}
        <div className="mt-3">
          <Tabs defaultActiveKey="subtab1" id="nested-tabs">
            <Tab eventKey="subtab1" title="Sub Tab 1">
              {/* Video for Sub Tab 1 */}
              <iframe
                title="Video 1"
                width="560"
                height="315"
                src="video_url_1"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </Tab>
            <Tab eventKey="subtab2" title="Sub Tab 2">
              {/* Video for Sub Tab 2 */}
              <iframe
                title="Video 2"
                width="560"
                height="315"
                src="video_url_2"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </Tab>
          </Tabs>
        </div>
      </Tab>
      <Tab eventKey="tab2" title="Tab 2">
        {/* Content for Tab 2 */}
      </Tab>
    </Tabs>
  );
};

export default CollapsibleTabs;
