import React from "react";
import Grid from '@material-ui/core/Grid';
import { BrowserRouter} from 'react-router-dom';
import AppBanner from "./components/AppBanner/AppBanner";
import ContentContainer from "./components/ContentContainer/ContentContainer";
import config from 'AgcShowcaseConfig';

//CSS
import "./App.css"; 


function App() {
  
  const tabIndex = config.tabDefs.tabIndexes;

  return <>
  <BrowserRouter basename={config.rootPath}>
    <Grid container>
      <Grid item xs={12}>
        <AppBanner tabIndex={tabIndex} />
      </Grid>
    </Grid>
    <Grid className="contentRoot"  container>
      <ContentContainer tabIndex={tabIndex}/>
    </Grid>
  </BrowserRouter>
  </>;
}

export default App;
