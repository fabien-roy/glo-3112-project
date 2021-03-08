import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const useStyles = makeStyles({
  searchTab: {
    flexGrow: 1,
    variant: 'fullWidth',
  },
});

export function SearchTabs({ showTab }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<unknown>, newValue: any) => {
    setValue(newValue);
    showTab(newValue);
  };

  return (
    <Tabs
      className={classes.searchTab}
      value={value}
      onChange={handleChange}
      variant="fullWidth"
      indicatorColor="primary"
      textColor="primary"
      aria-label="searchTabs"
      centered
    >
      <Tab label="Users" />
      <Tab label="Hashtags" />
      <Tab label="Description" />
    </Tabs>
  );
}

export default SearchTabs;
