import "./Times.css"
import { useState } from "react"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { Button, Alert, AlertTitle } from "@mui/material"
import { month, days } from "./data"
import Confirm from "../Confirm/Confirm"
import api from "../../api"

let prev_date = ""
let timezone = ""
function Times(element) {
    var el = {};
    let query = new URLSearchParams(window.location.search)
    // called in mobile view
    if (query.get("date")) {
        Object.assign(el, { date: query.get("date"), timezone: JSON.parse(query.get("timezone")), id: query.get("id"), ...JSON.parse(query.get("data")) })
    }
    // called in desktop view
    else el = JSON.parse(JSON.stringify(element))
    // string date for date object
    let display_date = String(new Date(el.date)).substring(0, 10).split(" ")
    // split iso string to format for api
    let date = el.date.split("T")[0].split("-")
    date = `${date[1]}-${date[2]}-${date[0]}`
    // usetState for confirm open and close
    let [confirm_open, setConfirmOpen] = useState(false)
    let [time, setTime] = useState("")
    let openConfirm = (text) => {
        setConfirmOpen(true)
        setTime(text)
    }
    let [resp, setResp] = useState({ timeslot: [] })
    // useEffect will loop here so this solution works
    if (prev_date !== String(el.date) || timezone !== el.timezone.value) {
        api(`https://booking.citationbuilderpro.com/get-custom-time`, "POST", `eid=${el.event_id}&date=${date}&timezone=${el.timezone?.value}`, "x-www-form-urlencoded", setResp)
        prev_date = String(el.date)
        timezone = el.timezone.value
    }
    // text date to show selected date string
    let date_text = `${days[display_date[0]]}, ${month[display_date[1]]} ${display_date[2]}`
    return (
        <div>
            <ArrowBackIcon onClick={() => window.history.back()} style={{ display: (query.get("date")) ? "block" : "none" }} className="widget-back-button" />
            <div style={{ fontSize: "16px", fontWeight: "600", marginTop: (window.innerWidth < 768) ? "30px" : "84px", marginBottom: "5px", textAlign: "center" }}>
                {date_text}
            </div>
            <div hidden={getStatus(resp)} style={{ height: "370px", overflowY: "auto" }}>
                {map(resp).map((i) => {
                    return (
                        <Button key={Math.random()} onClick={(ev) => openConfirm(ev.target.textContent)} style={{ width: "70%", height: "40px", marginTop: "20px", display: "block", marginLeft: "auto", marginRight: "auto" }} variant="outlined">
                            {i}
                        </Button>
                    )
                })}
            </div>
            <Alert   style={{width:"80%", margin:"auto",display:(!getStatus(resp)?"none":"flex")}}  severity="info">
                <AlertTitle>Info</AlertTitle>
                No Schedules found — <strong>Please Select a new Date!</strong>
            </Alert>
            <Confirm {...el} date_text={date_text} timezone={timezone} date={el.date} open={confirm_open} setTime={setTime} setOpen={setConfirmOpen} text={time} />
        </div>
    )
}
function map(resp) {
    // sometimes timeslots will object and some time array
    return (resp?.timeslot && typeof resp.timeslot === "object") ? Object.values(resp.timeslot) : (resp?.timeslot) ? resp.timeslot : []
}
function getStatus(resp) {
    // hide if no timeslots available
    return ["{}", "[]","undefined"].includes(JSON.stringify(resp?.timeslot))
}
export default Times;