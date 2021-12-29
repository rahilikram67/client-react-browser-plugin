import "./Home.css";
import Block from '../Block/Block';
import {Grid} from "@mui/material"
function Home() {
    // home component called via router
    return (
        <Grid item>
            <h3 style={{textAlign:"center"}}>Shripad Deshmukh</h3>
            <p className='widget-p'>Welcome to my scheduling page. Please follow the instructions to add an event to my calendar.
            </p>
            <Block />
        </Grid>
    )

}

export default Home;