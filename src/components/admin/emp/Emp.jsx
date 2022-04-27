import React,{useEffect,useState} from 'react'

function Emp() {
    var [emp, setEmps] = useState([])
	
	async function deleteUser(id){
		let URL = "http://localhost:9000/adminDeleteUser?id="+id
		let result = await fetch(URL, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		});
		window.location.reload();
	}
	async function getUsers(){
        let URL = "http://localhost:9000/users"
        console.log(URL)
        let result = await fetch(URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          
        });
        let results = await result.json();
		setEmps(results)
		emp = results
        }
	
	useEffect(() => {
		getUsers();
	}, 
    []);
  return (
    <div>
      <div className="wrapper wrapper3">
			<div className="inner inner3">
				<form action="submit">
					<h3>Gestion des employées</h3>
			
				
			
        			<div class="form-wrapper">
					<div className="table-responsive">
					<table className="table table-striped table-bordered" id="example" >
              <thead>
                <tr>
                  <th>Nom</th>
				  <th>Prénom</th>
				  <th>Poste</th>
				  <th>Opérations</th>
                </tr>
              </thead>
              <tbody>
			  {console.log(emp)}
			  {emp.map(row => 
			  
					  <tr>
						  				  

						  <td>{row.nom} </td>
						  <td>{row.prenom}</td>
						  <td>{row.poste}</td>
						  <td className="ops">
						  <i className="fa fa-trash trashbin" onClick={() => deleteUser(row._id)}></i>
						  </td>
					  </tr>
				  )
				  }
              
              </tbody>
            </table>
						</div>
					</div>
				</form>
			</div>
		</div>

  </div>
  );
}

export default Emp