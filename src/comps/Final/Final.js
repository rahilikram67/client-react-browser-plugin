import "./Final.css"
import Description from "../Description/Description"
import { Grid, TextField, Box, Button } from "@mui/material"
import ChipInput from 'material-ui-chip-input'
import { useState, useRef } from "react"
import { Link } from "react-router-dom"
export default function Final() {
    var el = {}
    const locRef = useRef(null)
    let query = new URLSearchParams(window.location.search)
    Object.assign(el, { ...JSON.parse(query.get("data")) })
    let [gemails, setGemails] = useState([])
    let [email, setEmail] = useState("")
    let [name, setName] = useState("")
    let [errors, setErrors] = useState(["", ""])
    let [hide, setHide] = useState(true)
    return (
        <Grid container style={{ height: "auto" }}>
            <Grid item md={5} sm={12} xs={12}>
                <Description {...el} />
            </Grid>
            <Grid style={{ height: "auto" }} item md={5} sm={12} xs={12} style={{ borderLeft: "1px solid #ccc", borderTop: "1px solid #ccc" }}>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <div style={{ marginLeft: "10px", marginTop: "10px" }}>
                        <h3>Enter Details</h3>
                        <TextField
                            required
                            label="Name"
                            variant="outlined"
                            style={{ width: "100%", fontSize: "20px" }}
                            value={name}
                            onChange={(e) => { setName(e.target.value) }}
                        />
                        {(errors[0]) ? <div style={{ color: "red", marginLeft: "7px" }}>Fill this field</div> : <></>}
                        <TextField
                            required
                            type="email"
                            label="Email"
                            variant="outlined"
                            style={{ width: "100%", marginTop: "10px", fontSize: "20px" }}
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }}
                        />
                        {(errors[1]) ? <div style={{ color: "red", marginLeft: "7px" }}>Fill this field</div> : <></>}
                        <Button onClick={() => setHide(false)} style={{
                            borderRadius: "20px", fontSize: "12px", marginLeft: "5px", marginTop: "10px", textTransform: "none",
                            display: (!hide) ? "none" : "block"
                        }}
                            variant="outlined">
                            Add Guests
                        </Button>

                        <ChipInput
                            style={{
                                width: "100%", marginTop: "15px", marginLeft: "5px",
                                display: (hide) ? "none" : "block"
                            }}
                            defaultValue={["Example@exmaple.com"]}
                            newChipKeyCodes={[13, 32]}
                            variant="standard"
                            onChange={setGemails}
                        />

                        <Button onClick={() => sendData({ ...el, name, email, gemails }, setErrors, locRef)} color="primary" variant="contained" style={{ margin: "40px", marginLeft: "5px" }}>
                            Schedule Event
                        </Button>
                    </div>

                </Box>

            </Grid>
            <Link ref={locRef} to={"/confirmed?" + new URLSearchParams(Object.entries(el)).toString()} />
        </Grid>
    )
}

function sendData(data, setErrors, locRef) {
    let { date, time, etime, name, email, gemails, timezone, id } = data
    time = time.replace(/^0/g, "")
    if (name.length === 0) return setErrors(["Fill out this field", null])
    if (email.length === 0) return setErrors([null, "Fill out this field"])
    else setErrors([])
    let body = {
        aname: name,
        aemail: email,
        gemails: gemails.join(", "),
        date,
        time,
        etime,
        timezone,
        eid: id
    }
    fetch("https://booking.citationbuilderpro.com/book-event", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "accept": "application/json"
        },
        body: new URLSearchParams(Object.entries(body)).toString()
    }).then(async res => {
      locRef.current.click()
    }).catch(alert)

}