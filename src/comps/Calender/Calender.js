import "./Calender.css";
import { Grid, TextField } from "@mui/material"
import Description from "../Description/Description"
import { LocalizationProvider, StaticDatePicker } from '@mui/lab';
import DateAdapter from "@mui/lab/AdapterDateFns"
import { PickersDay } from '@mui/lab';
import { useEffect, useRef, useState } from "react"
import locale from 'date-fns/locale/en-US'
import Times from "../Times/Times"
import api from "../../api"
import Select from "react-select"
import { Link } from "react-router-dom"
function Calender() {
    // as useHistroy is deprecated we will be using Link component fo react as router 
    let locRef = useRef(null)
    // input date is selected date for calender
    let [inputDate, setInpDate] = useState(new Date())
    // currrent timezone
    let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    // timezone date for react select component 
    let [tzData, setTzData] = useState({ value: timezone, label: timezone })
    // event will get data from api and set to state
    let [event, setEvent] = useState([{}])
    // query will access url params
    let query = new URLSearchParams(window.location.search)
    // change grid positions of react component
    let [col1, setCol1] = useState(6)
    let [col2, setCol2] = useState(6)
    let [col3, setCol3] = useState(0)
    // show time slots for selected date from api using Times component
    let [show, setShow] = useState(true)
    // current date
    let date = new Date()

    let url = "https://booking.citationbuilderpro.com/get-event/" + query.get("event_id")
    
    useEffect(() => {
        api(url, "GET", null, "json", setEvent)
    }, [url])
    let [tz, setTz] = useState([{ timezone: {} }])
    useEffect(() => {
        api(`https://booking.citationbuilderpro.com/get-timezone`, "GET", null, "json", setTz)
    }, [])
    // to make sure day starts from monday
    locale.options.weekStartsOn = 1
    return (
        <Grid container>
            <Grid item md={col1} sm={12} xs={12}>
                <Description {...event[0]} />
            </Grid>
            <Grid item md={col2} sm={12} xs={12} style={{ borderLeft: "1px solid #ccc", borderTop: "1px solid #ccc" }}>
                <div style={{ margin: "15px" }}>
                    <h3>Select Date and Time</h3>
                    <LocalizationProvider locale={locale} dateAdapter={DateAdapter}>
                        <StaticDatePicker
                            displayStaticWrapperAs="desktop"
                            label="Week picker"
                            value={`${date.getFullYear()}-${date.getMonth() + 1}-0`}
                            onChange={(newValue) => {
                                setInpDate(newValue);
                                if (window.innerWidth > 768) {
                                    setCol1(4)
                                    setCol2(4)
                                    setCol3(4)
                                    setShow(false)
                                }
                                else {
                                    if (!event[0].duration) return alert("please wait")
                                    setTimeout(() => {
                                        locRef.current.click()
                                    }, 1000)
                                }

                            }}
                            renderDay={(day, dates, props) => {
                                if ((day.getDate() < date.getDate() || day.getMonth() < date.getMonth()) && (day.getFullYear() <= date.getFullYear())) props.disabled = true
                                //else if ([6, 0].includes(day.getDay())) props.disabled = true

                                return (
                                    <PickersDay style={{ border: "none" }} {...props} />
                                )
                            }}
                            style={{ width: "300px" }}
                            renderInput={(params) => <TextField {...params} />}
                            inputFormat="'Week of' MMM d"
                        />
                    </LocalizationProvider>
                    <div>
                        <Select defaultValue={tzData} onChange={(e) => {
                            setTzData(e)
                        }}
                            menuPlacement="top" options={parser(tz)} />
                    </div>
                </div>
            </Grid>
            <Grid item md={col3} sm={12} xs={12}>
                {
                    (!show) ? <Times {...event[0]} date={inputDate} id={query.get("event_id")} timezone={tzData} /> : <></>
                }
            </Grid>
            <Link ref={locRef} to={`/times?date=${inputDate.toISOString()}&timezone=${JSON.stringify(tzData)}&data=${JSON.stringify(event[0])}`} />
        </Grid>
    )
}

function parser(tz) {
    // timezones for react select component 
    let options = []
    for (let v in tz[0].timezone) {
        options.push({ value: v, label: tz[0].timezone[v] })
    }
    return options
}

export default Calender;