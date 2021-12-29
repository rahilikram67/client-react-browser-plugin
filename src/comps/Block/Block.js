
import './Block.css';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useRef } from "react"
import { Link } from 'react-router-dom';


function Block() {
    const blockRef = useRef(null);
    let id = document.getElementsByClassName("cbpbooking-inline-widget")[0].getAttribute("data-event-id");
    const ref = useRef(null)

    // this is a card inside showing event name init will pass event id to calender to make call to backend for geting data 
    return (
        <div ref={blockRef} className="widget-select-block" onClick={() => {
            if (!id) return alert("Please set data-event-id attribute to the widget")
            ref.current.click()
        }}>
            <div className='widget-option-select'>
                <div className="widget-option-circle"></div>
                <span className='widget-option-text'>GMBBriefCase Demo</span>
                <ArrowRightIcon className="widget-option-icon" />
            </div>
            <Link ref={ref} to={"/calender?event_id=" + id} />
        </div>
    );
}

export default Block;
