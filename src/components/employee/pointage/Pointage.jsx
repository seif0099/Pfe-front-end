import React from 'react'
import "./pointage.css"
import { useEffect,useState } from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Box from '@mui/material/Box';
function Pointage() {
  const [userInfo, setUserInfo] = useState({});
  var dateObj = new Date();
  var [dates, setDate] = useState(dateObj);
  const [pointages, setPointages] = useState();
  console.log(dates.getMonth());
  useEffect(() => {
    
    const fetcha = async () => {
	  if(JSON.parse(localStorage.getItem("user-info"))){
		const { user } = JSON.parse(localStorage.getItem("user-info"));
		setUserInfo(user);
	  }
    let URL = "http://localhost:9000/getpointage?userId="+JSON.parse(localStorage.getItem("user-info")).user._id+"&pDate="+dates.toDateString()
    let result = await fetch(URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    let results = await result.json();
    }
    fetcha();
  }, []);
    
  

  
  return (
    <div className="limiter">
    <div className="wrapper">
   <div className="inner">
     <form>
       <h3>pointage</h3>
       <div className="form-row">
         <div className="form-wrapper">
         <div className="table-responsive">
            <table className="table table-striped table-bordered" id="example" >
              <thead>
                <tr>
                  <th>
                    <p>{dates.getMonth()}/{dates.getFullYear()}</p>
                  </th>
                  <th>Lundi</th>
                  <th>Mardi</th>
                  <th>Mercredi</th>
                  <th>Jeudi</th>
                  <th>Vendredi</th>
                  <th>Samedi</th>
                </tr>
              </thead>
              <tbody>
             
              </tbody>
            </table>
          </div>
          <div className='monthPicker'>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box m={2}>
              <DatePicker
                inputFormat="yyyy-MM"
                views={['year', 'month']}
                label="Mois / Année"
                value={dates}
                onChange={setDate}
                renderInput={(params) => <TextField {...params} helperText={null} />}
              />
            </Box>
          </LocalizationProvider>
          </div>
          </div>
       </div>

     </form>
     </div>
   </div>
 </div>

  )
}

export default Pointage