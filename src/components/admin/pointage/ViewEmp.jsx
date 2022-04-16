import React from 'react'
import "./viewemp.css"
function ViewEmp() {
    function fullDate() {
        var tempDate = new Date();
        var date = tempDate.getFullYear() + '-' + (tempDate.getMonth()+1) + '-' + tempDate.getDate() +' '+ tempDate.getHours()+':'+ tempDate.getMinutes()+':'+ tempDate.getSeconds();
        const currDate = date;
        return (
          <p>{currDate}</p>
        );
      }
  return (
    <div>
         <div className="limiter">
    <div className="container-table100">
        <div className="wrap-table100">
            <div className="table100 ver1 m-b-110">
                <div className="table100-head">
                    <table>
                        <thead>
                            <tr className="row100 head">
                            <th className="cell100 column1">Nom de l'employee</th>
                                
                                <th className="cell100 column1">Date</th>
                                
                                <th className="cell100 column2">Lundi</th>
                                <th className="cell100 column3">Mardi</th>
                                <th className="cell100 column4">Mercredi</th>
                                <th className="cell100 column5">Vendredi</th>
                                <th className="cell100 column6">Samedi</th>
                            </tr>
                        </thead>
                    </table>
                </div>

                <div className="table100-body js-pscroll">
                    <table>
                        <tbody>
                           

                            <tr className="row100 body">
                            <td className="cell100 column2">present</td>

                                <td className="cell100 column1">{fullDate()}</td>
                                <td className="cell100 column2">present</td>
                                <td className="cell100 column3">---</td>
                                <td className="cell100 column4">---</td>
                                <td className="cell100 column5">---</td>
                                <td className="cell100 column5">---</td>
                            </tr>

                        </tbody>
                        <tbody>
                           

                           <tr className="row100 body">
                               <td className="cell100 column1">{fullDate()}</td>
                               <td className="cell100 column2">---</td>
                               <td className="cell100 column3">present</td>
                               <td className="cell100 column4">---</td>
                               <td className="cell100 column5">---</td>
                               <td className="cell100 column5">aaa</td>
                           </tr>

                       </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
    </div>
  )
}

export default ViewEmp