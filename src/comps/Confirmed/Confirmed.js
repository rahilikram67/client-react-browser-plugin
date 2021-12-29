import "./Confirmed.css"
import { Grid } from "@mui/material"
import EventIcon from "@mui/icons-material/Event"
import PublicIcon from '@mui/icons-material/Public';
import VideocamIcon from "@mui/icons-material/Videocam"
export default function Confirmed() {
    let el = new URLSearchParams(window.location.search)
    // will show the final result of the meeting
    return (
        <Grid container>
            <Grid item xs={12} sm={12} md={12} style={{ alignItems: "center", justifyContent: "center", textAlign: "center" }}>
                <h3 style={{ marginTop: "20px" }}>Confirmed</h3>
                <p style={{ fontSize: "20px" }}>You are scheduled with {el.get("organizer_name")}.</p>
                <hr style={{ width: "47%", borderTop: "1px solid #ccc" }} />
                <Grid item xs={12} sm={12} md={6} style={{ margin: "auto" }}>
                    <div style={{ display: "flex" }}>
                        <div className="widget-option-circle"></div>
                        <h3 style={{ marginLeft: "10px" }}>{el.get("event_name")}</h3>
                    </div>
                    <div style={{ display: "flex" }}>
                        <EventIcon style={{ marginLeft: "10px" }} />
                        <span style={{ color: "black", fontSize: "17px", fontWeight: "600", marginLeft: "10px" }}>
                            {`${removeZero(el.get("time"))}-${removeZero(el.get("etime"))} ${el.get("date_text")}, ${el.get("date").split("-")[2]}`}
                        </span>
                    </div>
                    <div style={{ display: "flex", marginTop: "10px" }}>
                        <PublicIcon style={{ marginLeft: "10px" }} />
                        <span style={{ color: "black", fontSize: "17px", fontWeight: "600", marginLeft: "10px" }}>
                            {el.get("timezone")}
                        </span>
                    </div>
                    <div style={{ display: "flex", marginTop: "10px" }}>
                        <VideocamIcon style={{ marginLeft: "10px" }} />
                        <span style={{ color: "black", fontSize: "16px", fontWeight: "600", marginLeft: "7px" }}>
                            Web conferencing details provided upon confirmation.
                        </span>
                    </div>
                    <p style={{ textAlign: "center", fontWeight: "bold", fontSize: "14px" }}>
                        A calendar invitation has been sent to your email address.
                    </p>
                    <hr style={{ width: "97%", borderTop: "1px solid #ccc" }} />
                </Grid>
            </Grid>
        </Grid>
    )
}

function removeZero(time) {
    return (time[0] === "0") ? time.slice(1) : time
}