import React, { useState } from "react";
import InteractiveTestView from "../admin_panel_view/InteractiveTestView";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import { TabPanel } from "../TabPanel";

export default function AdminPanelView() {
  const [selectedTab, setSelectedTab] = useState(0);

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
        <Typography>Bug reports</Typography>
      </TabPanel>
    </>
  );
}
