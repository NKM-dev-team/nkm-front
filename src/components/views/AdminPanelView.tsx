import React, { useState } from "react";
import InteractiveTestView from "../admin_panel_view/InteractiveTestView";
import { Box, Tab, Tabs } from "@mui/material";
import { TabPanel } from "../TabPanel";
import BugReportsView from "../admin_panel_view/BugReportsView";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

export default function AdminPanelView() {
  const [selectedTab, setSelectedTab] = useState(0);
  const authData = useSelector((state: RootState) => state.authData);

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={selectedTab}
          onChange={(e, newValue) => {
            setSelectedTab(newValue);
          }}
        >
          <Tab label="Bug reports" />
          <Tab label="Interactive test view" />
        </Tabs>
      </Box>
      <TabPanel value={selectedTab} index={0}>
        <BugReportsView authState={authData} />
      </TabPanel>
      <TabPanel value={selectedTab} index={1}>
        <InteractiveTestView />
      </TabPanel>
    </>
  );
}
