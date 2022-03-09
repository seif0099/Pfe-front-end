import React from 'react'
import "./supphours.css"
function SuppHours() {
  return (
    <div>
        
        <div className="wrapper">
			<div className="inner">
				<form action="submit">
					<h3>Demande des heures supplémentaires</h3>
					<div className="form-row">
						<div className="form-wrapper">
							<label htmlFor="">Nom  *</label>
							<input type="text" className="form-control" placeholder="Your Name"/>
						</div>
						<div className="form-wrapper">
							<label htmlFor="">Prénom *</label>
							<input type="text" className="form-control" placeholder="Your Name"/>
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
        <div class="form-wrapper">
							<label for="">Travail demandé *</label>
                            <input type="text" className="form-control" placeholder="Your Name"/>

					</div>
					<button data-text="Confirmer" type="submit">
						<span>confirmer</span>
					</button>
				</form>
			</div>
		</div>

  </div>;
    </div>
  )
}

export default SuppHours