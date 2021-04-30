import React, { useRef, useEffect } from "react";
import MapView from "@arcgis/core/views/MapView";
import SceneView from '@arcgis/core/views/SceneView';
import Map from '@arcgis/core/Map';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import StarIcon from '@material-ui/icons/Star';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import "./App.css"; 

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

function App() {
  const classes = useStyles();
  const mapDiv = useRef(null);
  const sceneDiv = useRef(null);
  const [navTabIndex, setNavTabIndex] = React.useState(0);
  
  useEffect(() => {
    var map = new Map({
      basemap: "satellite"
    });
    if (mapDiv.current && sceneDiv.current) {
      /**
       * Initialize application
       */

      const mapView = new MapView({
        container: mapDiv.current,
        map: map,
        constraints: {
          // Disable zoom snapping to get the best synchronization
          snapToZoom: false
        }
      });
      const sceneView = new SceneView({
        container: sceneDiv.current,
        map: map
      });

      const views = [sceneView, mapView];
      let active;

      const sync = (source) => {
        if (!active || !active.viewpoint || active !== source) {
          return;
        }

        for (const view of views) {
          if (view !== active) {
            view.viewpoint = active.viewpoint;
          }
        }
      };

      Promise.all([sceneView.when(), mapView.when()]).then(()=> {
        //all elements ready
        sceneView.watch(["interacting", "animation"], () => {
          active = sceneView;
          sync(active);
        });
      
        sceneView.watch("viewpoint", () => sync(sceneView));
    
        mapView.watch(["interacting", "animation"], () => {
          active = mapView;
          sync(active);
        });
      
        mapView.watch("viewpoint", () => sync(mapView));
      })
    }
  }, []);

  const handleChange = (event, newIndex) => {
    setNavTabIndex(newIndex);
    //TODO: Link this to a browser router and use it to drive page navigation
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  return <>
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
          <Tab label="Future Demo" {...a11yProps(1)}/>
          <Tab label="Future Demo" {...a11yProps(2)}/>
        </Tabs>
      </Toolbar>
    </AppBar>    
  </div>
  <Grid className="gridRoot" container>
    <Grid  item xs={6}>
      <div className="mapDiv" ref={mapDiv}></div>
    </Grid>
    <Grid item xs={6}>
      <div className="mapDiv" ref={sceneDiv}></div>
    </Grid>
  </Grid>
  </>;
}

export default App;
