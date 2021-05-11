import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import StarIcon from '@material-ui/icons/Star';
import IconButton from '@material-ui/core/IconButton';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles } from '@material-ui/core/styles';
import {useHistory} from 'react-router-dom';

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
  const classes = useStyles();
  const [navTabIndex, setNavTabIndex] = React.useState(0);
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
              AGC 3D Showcase
          </Typography>
          <Tabs value={navTabIndex} onChange={handleChange} arial-label='nav tabs'>
            <Tab label="Linked Map/Scene" {...a11yProps(0)}/>
            <Tab label="3D Line of Sight" {...a11yProps(1)}/>
            <Tab label="Future Demo" {...a11yProps(2)}/>
          </Tabs>
        </Toolbar>
      </AppBar>  
    </div>
  )
}