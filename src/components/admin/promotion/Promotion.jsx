import React from 'react'
import "./promotion.css"
function Promotion() {
  return (
    <div>
        
        <div className="wrapper">
			<div className="inner">
				<form action="submit">
					<h3>Promotion</h3>
					<div className="form-row">
						<div className="form-wrapper">
							<label htmlFor="">Poste ancien  *</label>
							<input type="text" className="form-control" placeholder="Your Name"/>
						</div>
						<div className="form-wrapper">
							<label htmlFor="">Poste nouveau *</label>
							<input type="text" className="form-control" placeholder="Phone"/>
						</div>
					</div>
				
					<div className="form-row last">
						<div className="form-wrapper">
							<label htmlFor="">À partir de  *</label>
				        	<input type="date" className="form-control" />
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

export default Promotion