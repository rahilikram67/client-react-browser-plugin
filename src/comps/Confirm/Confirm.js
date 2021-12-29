import { forwardRef, useRef, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Link } from "react-router-dom"
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
// element contains all the data of event, timezone, selected date and selected time
// open close of confirm dialog alert by using useState hook 
export default function Confirm(element) {
  // will use in place of usehistory
  const locRef = useRef(null)
  // as Link component of react is react-dom element so will not check for changes in vars so we will use useState 
  let [date, setDate] = useState("")
  let [etime, setEtime] = useState("")
  // this component will confirm the time slot 
  return (
    <div>
      <Dialog
        TransitionComponent={Transition}
        open={element.open}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Time Conformation</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {element.text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            element.setOpen(false)
            element.setTime("")
          }}>Cancel</Button>
          <Button onClick={() => {
            // close alert dialog coming from Times component
            element.setOpen(false)
            // split date iso string to format about api
            date = element.date.split("T")[0].split("-")
            date = `${date[1]}-${date[2]}-${date[0]}`
            setDate(date)
            // add meeting duration to time  
            etime = new Date("0 " + element.text)
            etime.setMinutes(etime.getMinutes() + Number(element.duration))
            etime = `${etime.toLocaleTimeString().replace(/:\d+ |^0/, " ").toLowerCase()}`
            setEtime(etime)
            setTimeout(() => {
              // pass data to final component
              locRef.current.click()
            }, 1000)
          }}>OK</Button>
        </DialogActions>
      </Dialog>
      <Link ref={locRef} to={`/final?data=${JSON.stringify({ ...element, date, time: element.text, etime })}`}></Link>
    </div>
  );
}
