import "./Description.css"
import VideocamIcon from "@mui/icons-material/Videocam"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled"
import EventIcon from '@mui/icons-material/Event';
import PublicIcon from '@mui/icons-material/Public';
export default function Description(el) {
    // left side component for calendar and final component to show organizer_name, duration ,timezone
    return (
        <div className="widget-ml-15px">
            <ArrowBackIcon onClick={() => window.history.back()} className="widget-back-button" />
            <p style={{ fontWeight: "600", fontSize: "16px", color: "GrayText" }}>{el.organizer_name}</p>
            <h1 >{el.event_name}</h1>
            <div style={{ display: "flex" }}>
                <AccessTimeFilledIcon style={{ color: "GrayText" }} />
                <span style={{ color: "GrayText", fontSize: "17px", fontWeight: "600", marginLeft: "10px" }}>{el.duration_text}</span>
            </div>
            <div style={{ marginTop: "5px", marginBottom: "5px", display: "flex" }}>
                <VideocamIcon />
                <span style={{ color: "black", fontSize: "17px", fontWeight: "600", marginLeft: "10px" }}>
                    Web conferencing details provided upon confirmation.
                </span>
            </div>
            {
                (el.time && el.etime) ?
                    (<div style={{ marginTop: "20px", marginBottom: "5px", display: "flex" }}>
                        <EventIcon />
                        <span style={{ color: "black", fontSize: "17px", fontWeight: "600", marginLeft: "10px" }}>
                            {`${removeZero(el.time)}-${removeZero(el.etime)} ${el.date_text}, ${el.date.split("-")[2]}`}
                        </span>
                    </div>)
                    :
                    (<></>)
            }
            {
                (el.timezone) ?
                    (<div style={{ marginTop: "20px", marginBottom: "5px", display: "flex" }}>
                        <PublicIcon />
                        <span style={{ color: "black", fontSize: "17px", fontWeight: "600", marginLeft: "10px" }}>
                            {el.timezone}
                        </span>
                    </div>)
                    :
                    (<></>)
            }
        </div>
    )
}

function removeZero(time) {
    return (time[0] === "0") ? time.slice(1) : time
}