import React from 'react'
import "./rapport.css"
function Rapport() {
  return (
   
          <div className="wrapper">
			<div className="inner">
				<form action="submit">
					<h3>Rapport</h3>
					<div className="form-row">
						<div className="form-wrapper">
							<label htmlFor="">Nom  *</label>
							<input type="text" className="form-control" placeholder="Nom"/>
						</div>
						<div className="form-wrapper">
							<label htmlFor="">Prénom *</label>
							<input type="text" className="form-control" placeholder="Prénom"/>
						</div>
					</div>
				
					<div className="form-row last">
						<div className="form-wrapper">
							<label htmlFor="">Date de l'accident *</label>
				   	<input type="date" className="form-control" />
							<i className="zmdi zmdi-chevron-down"></i>
						</div>
						<div className="form-wrapper">
							<label htmlFor="">Place de l'accident *</label>
                            <input type="text" className="form-control" placeholder="Place de l'accident"/>
							<i className="zmdi zmdi-chevron-down"></i>
						</div>
          
				</div>
     
					<button data-text="Confirmer" type="submit">
						<span>confirmer</span>
					</button>
				</form>
			</div>
		</div>


  )
}

export default Rapport