import React, { useState } from "react";
import InteractiveTestView from "../admin_panel_view/InteractiveTestView";
import { Box, Tab, Tabs } from "@mui/material";
import { TabPanel } from "../TabPanel";
import BugReportsView from "../admin_panel_view/BugReportsView";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import UnityBuild from "../UnityBuild";

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
          <Tab label="Interactive test view" />
          <Tab label="Bug reports" />
        </Tabs>
      </Box>
      <TabPanel value={selectedTab} index={0}>
        <InteractiveTestView />
      </TabPanel>
      <TabPanel value={selectedTab} index={1}>
        <BugReportsView authState={authData} />
      </TabPanel>
    </>
  );
}
