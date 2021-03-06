import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    variant: 'fullWidth',
  },
});

export default function SearchTabs({ currentTab, showTab }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(currentTab);

  const handleChange = (event: React.ChangeEvent<unknown>, newValue: any) => {
    setValue(newValue);
    showTab(newValue);
  };

  return (
    <Tabs
      value={value}
      onChange={handleChange}
      variant="fullWidth"
      indicatorColor="primary"
      textColor="primary"
      aria-label="icon tabs example"
      centered
    >
      <Tab label="Users" />
      <Tab label="Posts" />
    </Tabs>
  );
}
