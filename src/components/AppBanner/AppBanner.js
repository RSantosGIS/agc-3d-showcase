import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import StarIcon from '@material-ui/icons/Star';
import IconButton from '@material-ui/core/IconButton';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles } from '@material-ui/core/styles';
import {useHistory, useLocation} from 'react-router-dom';
import config from 'AgcShowcaseConfig';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  starButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function AppBanner(props) {
  let location = useLocation().pathname;
  const classes = useStyles();
  let initTabIndex =config.tabDefs.tabIndexes.findIndex((element)=> element===location);
  const [navTabIndex, setNavTabIndex] = React.useState(initTabIndex>-1 ? initTabIndex : 0);
  const history = useHistory();
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const handleChange = (event, newIndex) => {
    setNavTabIndex(newIndex);
    history.push(props.tabIndex[newIndex]);
  };

  return (
    <div className = {classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton edge='start' className={classes.starButton} color='inherit' aria-label='menu'>
            <StarIcon />
          </IconButton>
          <Typography variant="h4" className={classes.title}>
              {config.bannerText}
          </Typography>
          <Tabs value={navTabIndex} onChange={handleChange} arial-label='nav tabs'>
            <Tab label={config.tabDefs.tabTitles[0]} {...a11yProps(0)}/>
            <Tab label={config.tabDefs.tabTitles[1]} {...a11yProps(1)}/>
            <Tab label={config.tabDefs.tabTitles[2]} {...a11yProps(2)}/>
          </Tabs>
        </Toolbar>
      </AppBar>  
    </div>
  )
}
