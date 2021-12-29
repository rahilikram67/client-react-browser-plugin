
import './App.css';
import * as React from "react";
import { Grid, Card } from '@mui/material';
import Home from './comps/Home/Home';
import Calender from './comps/Calender/Calender';
import Times from './comps/Times/Times';
import Final from './comps/Final/Final';
import Confirmed from './comps/Confirmed/Confirmed';
import {
  Routes,
  Route
} from "react-router-dom";
function App() {
  return (
    // this component will be just used as routing
    <div className="App">
      <Grid container style={{ alignItems: "center", justifyContent: "center" }}>
        <Grid item xs={12} sm={10} md={8}>
          <Card className="widget-card" style={{ overflowY: "auto" }}>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/calender" element={<Calender />} />
              <Route exact path="/times" element={<Times />} />
              <Route exact path="/final" element={<Final />} />
              <Route exact path="/confirmed" element={<Confirmed />} />
            </Routes>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
