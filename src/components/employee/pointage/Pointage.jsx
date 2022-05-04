import React from 'react'
import "./pointage.css"
import { useEffect,useState } from 'react';
import { useFormik } from "formik";

function Pointage() {
  const [userInfo, setUserInfo] = useState({});
  var [pointages, setPointages] = useState([]);
  var [numrows, setNumrows] = useState(0);
  var [numberOfDays, setNumberOfDays] = useState(0);
  var dateObj = new Date()
  var [dates, setDates] = useState(dateObj);
  var [numcols, setNumcols] = useState(6);
  var [tableData, setTableData] = useState("")

  async function fetcha(values) {
	  if(JSON.parse(localStorage.getItem("user-info"))){
		const { user } = JSON.parse(localStorage.getItem("user-info"));
		setUserInfo(user);
	  }
    let d = new Date()
    if(values.month!=0){
      d.setMonth(values.month-1)
    }
    if(values.year!=0){
      d.setYear(values.year)
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
    let days = results.pointage.map(function(a) { return a.day});
    let numberOfDays = new Date(dates.getFullYear(), dates.getMonth()+1, 0).getDate()
    let p = Array(numberOfDays).fill("absent")
    for(var i=0;i < days.length;i++){
      p[days[i]-1] = "présent"
    }    
    

    let daysoff = results.leave.map(function(a) {
       return {
         dayF: a.dayF,
         dayT:a.dayT,
         monthF: a.monthF,
         monthT: a.monthT,
         yearF: a.yearF,
         yearT: a.yearT,
        }
    });    
    let doffs = []
    for(let j=0;j < daysoff.length; j++){
      if(daysoff[j].monthF == daysoff[j].monthT){
        for(let i=daysoff[j].dayF;i <=daysoff[j].dayT;i++){
          doffs.push(i)
        }
      }
      else{
        if(daysoff[j].monthF == dates.getMonth()+1){
          for(let i=daysoff[j].dayF;i <=numberOfDays;i++){
            doffs.push(i)
          }
        }
        else {
          for(let i=1;i <=daysoff[j].dayT;i++){
            doffs.push(i)
          }
        }

      }
    }
    console.log("doffs", doffs)
    for(var i=0;i < doffs.length;i++){
      p[doffs[i]-1] = "congé"
    }    
    console.log(p)
    //console.log(daysoff)


    setNumberOfDays(numberOfDays)

    numcols = 7;
    setNumrows(Math.ceil(numberOfDays / 7))
    numrows = Math.ceil(numberOfDays / 7)
    let ps = []
    for(var i=0; i< numrows; i++){
      ps.push(p.slice(7*i, 7*i+7))
    }
    setPointages(ps)







    pointages = ps

    }
  useEffect(() => {
    
    fetcha({month: 0, year: 0})
  }, []);
  function validate(values) {
		const errors = {};
		if (!values.month) {
		  errors.month = "* Le champ mois est obligatoire";
		}
		if(!values.year){
			errors.year = "* Le champ année est obligatoire";
		}
		console.log(errors)
		return errors;
	  }
	
	  const {
		handleSubmit,
		handleChange,
		touched,
		errors,
    values
	  } = useFormik({
		initialValues: {
			month: "",
			year: "",
		},
		validate,
		onSubmit: (values) => {
			fetcha(values)
		},
	  }); 
  return (
    <div className="cont">
    <div className="wrapper">
   <div className="inner inner1">
     <form>
       <h3>pointage</h3>
       <div className="form-row">
         <div className="form-wrapper">
         <div className="table-responsive">
            {
              
              pointages.map((row,index) => 
              
              <table className="table  table-bordered border" id="example" >
              <thead>
                <tr>
                  <th>
                    {values.month} / {values.year}
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
                {row.map((col, index) => <td>
                  {
                col === "présent" ? <h5><br></br></h5> : <h6></h6> 
                }
                {
                col === "congé" ? <h5 className='conge'><br></br></h5> : <h6></h6> 
                }
                </td>)
                }
                </tr>
              
              </tbody>
            </table>
              )}
          </div>
          <div className='buttons'>
              <div className='monthPicker'>
              <select id='month' name='month' className='form-control' onChange={handleChange}>
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
                {touched.month && errors.month
        						? <p className="errors">{errors.month}</p>
        						: null}
              </div>
              <div className='yearPicker'>
              <select id="year" name="year" className='form-control' onChange={handleChange}>
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
              {touched.year && errors.year
        						? <p className="errors">{errors.year}</p>
        						: null}
              </div>
              <div className='myButton'>
              <input type="button" className="form-control myB"  onClick={handleSubmit} value="Confirmer" />
              </div>
              
          </div>
          <hr></hr>
          <div className='legende'>
            <div className='color1'></div>
            <div>présent</div>
            <div className='color2'></div>
            <div>absent</div>
            <div className='color3'></div>
            <div>congé</div>
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