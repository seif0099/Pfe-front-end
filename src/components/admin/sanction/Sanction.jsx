import React from 'react'

function Sanction() {
  return (
    <div>
        <div className="wrapper">
			<div className="inner">
				<form action="submit">
					<h3>Sanction</h3>
					<div className="form-row">
						<div className="form-wrapper">
							<label htmlFor="">Nom de l'employee  *</label>
							<input type="text" className="form-control" placeholder="Nom"/>
						</div>
					
					</div>
                    <div className="form-row">
						<div className="form-wrapper">
							<label htmlFor="">Raison de sanction  *</label>
							<input type="text" className="form-control" placeholder="Raison"/>
						</div>
					
					</div>
				
					<div className="form-row last">
						<div className="form-wrapper">
							<label htmlFor="">À partir de  *</label>
				   	<input type="date" className="form-control" />
							<i className="zmdi zmdi-chevron-down"></i>
						</div>
						<div className="form-wrapper">
							<label htmlFor="">À *</label>
              <input type="date" className="form-control"/>

							<i className="zmdi zmdi-chevron-down"></i>
						</div>
          
				</div>
        
					<button data-text="Confirmer" type="submit">
						<span>confirmer</span>
					</button>
				</form>
			</div>
		</div>


    </div>
  )
}

export default Sanction