import React from 'react'
import "./pointage.css"
import { useEffect,useState } from 'react';
function Pointage() {
  const [userInfo, setUserInfo] = useState({});
  var [pointages, setPointages] = useState([]);
  var [numrows, setNumrows] = useState(0);
  var [numberOfDays, setNumberOfDays] = useState(0);
  var [month, setMonth] = useState(0);
  var [year, setYear] = useState(0);
  var dateObj = new Date()
  var [dates, setDates] = useState(dateObj);
  var [numcols, setNumcols] = useState(6);
  var [tableData, setTableData] = useState("")
  function setYear1(e){
    setYear(e.target.value)
  }
  function setMonth1(e){
    setMonth(e.target.value)
    
  }
  async function fetcha() {
	  if(JSON.parse(localStorage.getItem("user-info"))){
		const { user } = JSON.parse(localStorage.getItem("user-info"));
		setUserInfo(user);
	  }
    let d = new Date()
    if(month!=0){
      d.setMonth(month-1)
    }
    if(year!=0){
      d.setYear(year)
    }
    setDates(d)
    dates = d;
    let URL = "http://localhost:9000/getpointage?userId="+JSON.parse(localStorage.getItem("user-info")).user._id+"&pDate="+dates.toDateString()
    let result = await fetch(URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    let results = await result.json();
    let days = results.map(function(a) { return a.day});
    let numberOfDays = new Date(dates.getFullYear(), dates.getMonth()+1, 0).getDate()
    setNumberOfDays(numberOfDays)
    let p = Array(numberOfDays).fill("absent")
    for(var i=0;i < days.length;i++){
      p[days[i]-1] = "présent"
    }
    numcols = 7;
    setNumrows(Math.ceil(numberOfDays / 7))
    numrows = Math.ceil(numberOfDays / 7)
    let ps = []
    for(var i=0; i< numrows; i++){
      ps.push(p.slice(7*i, 7*i+7))
    }
    setPointages(ps)
    pointages = ps

    setMonth(d.getMonth()+1)
    setYear(d.getFullYear())
    }
  useEffect(() => {
    
    fetcha()
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
            {
              
              pointages.map((row,index) => 
              
              <table className="table table-striped table-bordered" id="example" >
              <thead>
                <tr>
                  <th>
                    {year} / {month}
                  </th>
                  {7*(index)+1 <= numberOfDays ? <th>{7*(index)+1}</th> : <span></span>}
                  {7*(index)+2 <= numberOfDays ? <th>{7*(index)+2}</th> : <span></span>}
                  {7*(index)+3 <= numberOfDays ? <th>{7*(index)+3}</th> : <span></span>}
                  {7*(index)+4 <= numberOfDays ? <th>{7*(index)+4}</th> : <span></span>}
                  {7*(index)+5 <= numberOfDays ? <th>{7*(index)+5}</th> : <span></span>}
                  {7*(index)+6 <= numberOfDays ? <th>{7*(index)+6}</th> : <span></span>}
                  {7*(index)+7 <= numberOfDays ? <th>{7*(index)+7}</th> : <span></span>}
                </tr>
              </thead>
              <tbody>
                <tr>
                <td>semaine {index+1}</td>
                {row.map((col, index) => <td>{col === "présent" ? <h5><br></br></h5> : <h6></h6> }</td>)}
                </tr>
              
              </tbody>
            </table>
              )}
          </div>
          <div className='buttons'>
              <div className='monthPicker'>
              <select id='month' name='month' className='form-control' onChange={setMonth1}>
                <option selected value=''>--Choisir Mois--</option>
                <option value='1'>Janaury</option>
                <option value='2'>February</option>
                <option value='3'>March</option>
                <option value='4'>April</option>
                <option value='5'>May</option>
                <option value='6'>June</option>
                <option value='7'>July</option>
                <option value='8'>August</option>
                <option value='9'>September</option>
                <option value='10'>October</option>
                <option value='11'>November</option>
                <option value='12'>December</option>
                </select> 
              </div>
              <div className='yearPicker'>
              <select id="year" name="year" className='form-control' onChange={setYear1}>
                  <option selected>--Choisir Année--</option>
                  <option value="2011">2011</option>
                  <option value="2012">2012</option>
                  <option value="2013">2013</option>
                  <option value="2014">2014</option>
                  <option value="2015">2015</option>
                  <option value="2016">2016</option>
                  <option value="2017">2017</option>
                  <option value="2018">2018</option>
                  <option value="2019">2019</option>
                  <option value="2020">2020</option>
                  <option value="2021">2021</option>
                  <option value="2022">2022</option>
              </select>
              </div>
              <div className='myButton'>
              <input type="button" className="form-control aa"  onClick={fetcha} value="Confirmer" />
              </div>
          </div>
          <hr></hr>
          <div className='legende'>
            <div className='color1'></div>
            <div>présent</div>
            <div className='color2'></div>
            <div>absent</div>
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