import React from "react";
import { Button, Form } from "react-bootstrap";
import "./applyleave.css";

function ApplyLeave() {
  return (
    <div>
      <div className="wrapper">
			<div className="inner">
				<form action="submit">
					<h3>Confirmation de congé</h3>
			
				
			
        <div class="form-wrapper">
							<label for="">Status *</label>
							<select name="" id="" class="form-control">
								<option value="1">En attente</option>
								<option value="2">Refusé</option>
								<option value="3">Accepté</option>
							</select>
					</div>
					<button data-text="Confirmer" type="submit">
						<span>confirmer</span>
					</button>
				</form>
			</div>
		</div>

  </div>
  );
}
export default ApplyLeave;
