import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import * as React from "react";
import { ReactNode, SyntheticEvent } from "react";

interface ITabData {
  label: string;
  panel: React.ReactNode;
}

interface IScrollableTabs {
  tabs: ITabData[];
}

interface ICustomTabPanel{
  index:number
  children:ReactNode
  value:number
}

const CustomTabPanel:React.FC<ICustomTabPanel>=({ index, children, value }) =>{
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      className="h-[calc(100vh-244px)] overflow-auto"

    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

const ScrollableTabs: React.FC<IScrollableTabs> = ({
  tabs,
}: IScrollableTabs) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event:SyntheticEvent<Element,Event>, newValue:number) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Box sx={{ maxWidth: { xs: 320, sm: 620 }, bgcolor: "background.paper" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          {tabs.map((x, i) => (
            <Tab label={x.label} key={i} value={i} />
          ))}
        </Tabs>
      </Box>
      {tabs.map((y, i) => (
        <React.Fragment key={i}>
          <CustomTabPanel index={i} value={value}>
            {y.panel}
          </CustomTabPanel>
        </React.Fragment>
      ))}
    </Box>
  );
};

export default ScrollableTabs;
