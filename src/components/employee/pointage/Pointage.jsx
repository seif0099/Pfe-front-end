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
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const dateObj = new Date();

  const [dates, setDate] = useState(dateObj)
  ;

  useEffect(() => {
	  if(JSON.parse(localStorage.getItem("user-info"))){
		const { user } = JSON.parse(localStorage.getItem("user-info"));
		setUserInfo(user);
	  }

  }, []);
  async function makePresence(e) {
    e.preventDefault();

    let item = {
      fromDate,
      toDate,
      nom: userInfo?.nom,
      prenom: userInfo?.prenom,
      userid: userInfo?._id,
    };
    let result = await fetch("http://localhost:9000/pointage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(item),
    });
    let results = await result.json();
  }
    function fullDate() {
        var tempDate = new Date();
        var date = tempDate.getFullYear() + '-' + (tempDate.getMonth()+1) + '-' + tempDate.getDate() +' '+ tempDate.getHours()+':'+ tempDate.getMinutes()+':'+ tempDate.getSeconds();
        const currDate = date;
        return (
          <p>{currDate}</p>
        );
      }
  return (
  
   <div className='container'>
<div className="row py-5">

    <div className="col-lg-10 mx-auto">
          <div className="table-responsive">
            <table className="table table-striped table-bordered" id="example" >
              <thead>
                <tr>
                  <th><p>{dates.getMonth()}/
    {dates.getFullYear()}</p>
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
                
               
                <tr>
                  <th>Sem 1</th>
                </tr>
                <tr>
                  <th>Sem 2</th>
                  
                </tr>
                <tr>
                  <th>Sem 3</th>
                  
                </tr>
                <tr>
                  <th>Sem 4</th>
                 
                </tr>
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
          minDate={new Date('2012-03-01')}
          maxDate={new Date('2023-06-01')}
          value={dates}
          onChange={setDate}
          renderInput={(params) => <TextField {...params} helperText={null} />}
        />
      </Box>
    </LocalizationProvider>
        </div>
        </div>
  </div>
  </div>
  )
}

export default Pointage