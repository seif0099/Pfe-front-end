import "./signup.css";
import React,{useState,useEffect} from "react";
import { useFormik } from "formik";

function Signup() {
  const [errorResponse, setError] = useState("");

  async function signUp(data){
    let result = await fetch("http://localhost:9000/register",{
      method:'POST',
      headers:{
          "Content-Type":"application/json",
          "Accept":"application/json"
      },
      body: JSON.stringify(data)
    });
    let results = await result.json();
    console.log(results)
    if (results.success) {
      window.location.href = "/login"
    }else{
      console.log(results)
      setError(results.error)
    }
  }
  function validate(values) {
		const errors = {};

		if (!values.email) {
		  errors.email = "* Le champ email est obligatoire";
		}
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
 
      errors.email = "le format de l'email est invalide"
 
    }
		if(!values.password){
			errors.password = "* Le champ mot de passe est obligatoire";
		}

    if(!values.nom){
			errors.nom = "* Le champ nom est obligatoire";
		}
    if(!values.prenom){
			errors.prenom = "* Le champ prenom est obligatoire";
		}
    if(!values.poste){
			errors.poste = "* Le champ poste est obligatoire";
		}
    if(!values.service){
			errors.service = "* Le champ service est obligatoire";
		}
    if(!values.tel){
			errors.tel = "* Le champ téléphone est obligatoire";
		}
    if(!values.username){
			errors.username = "* Le champ username est obligatoire";
		}
    if(!values.adresse){
			errors.adresse = "* Le champ adresse est obligatoire";
		}
    if(!values.sitFam){
			errors.sitFam = "* Le champ situation familliale est obligatoire";
		}
    if(!values.matricule){
			errors.matricule = "* Le champ matricule est obligatoire";
		}
    if(!values.dateEmb){
			errors.matricule = "* Le champ date d'embauche est obligatoire";
		}
    setError("")
		return errors;
	  }
	
	  const {
		handleSubmit,
		handleChange,
		touched,
		errors,
	  } = useFormik({
		initialValues: {
			email: "",
			password: "",
      poste:"",
      nom:"",
      prenom:"",
      matricule:"",
      username:"",
      tel:"",
      service:"",
      adresse:"",
      sitFam:"",
      dateEmb:""
		},
		validate,
		onSubmit: (values) => {
signUp(values)		
},
	  });
  return (
    
    <div className="signup">
    <form>
          <span className="mySpan">S'inscrire</span>
          <div className="divider">
            
          <div className="field1 lDivider">
              <input type="text" name="nom" onChange={handleChange} placeholder="nom"/>
            </div>
          
          <div className="field1 rDivider">
              <input type="text" name="prenom" onChange={handleChange} placeholder="prenom"/>
            </div>
          
          </div>
          <div className="divider">
          
          {touched.nom && errors.nom
                ? <p className="errors lDivider">{errors.nom}</p>
                : null}
          {touched.prenom && errors.prenom
                ? <p className="errors rDivider" >{errors.prenom}</p>
                : null}
                </div>
          <div className="field1">
              <input type="text" name="username" onChange={handleChange} placeholder="username"/>
            </div>
            {touched.username && errors.username
                ? <p className="errors">{errors.username}</p>
                : null}
          <div className="field1">
              <input type="text" name="matricule" onChange={handleChange} placeholder="matricule"/>
            </div>
            {touched.matricule && errors.matricule
                ? <p className="errors">{errors.matricule}</p>
                : null}
          <div className="divider">
             <div className="field1 lDivider">
              <input type="text" name="poste" onChange={handleChange} placeholder="poste"/>
            </div>
           
          <div className="field1 rDivider">
              <input type="text" name="service" onChange={handleChange} placeholder="service"/>
            </div>
            
          </div>
          <div className="divider">
            {touched.poste && errors.poste
                ? <p className="errors lDivider">{errors.poste}</p>
                : null}
                 {touched.service && errors.service
                ? <p className="errors rDivider">{errors.service}</p>
                : null}
                </div>
          <div className="field1">
              <input type="text" name="tel" onChange={handleChange} placeholder="telephone"/>
            </div>
            {touched.tel && errors.tel
                ? <p className="errors">{errors.tel}</p>
                : null}
          <div className="field1">
              <input type="text" name="adresse" onChange={handleChange} placeholder="addresse"/>
            </div>
            {touched.adresse && errors.adresse
                ? <p className="errors">{errors.adresse}</p>
                : null}
          <div className="field1">
              <input type="text" name="sitFam" onChange={handleChange} placeholder="situation familiale"/>
            </div>
            {touched.sitFam && errors.sitFam
                ? <p className="errors">{errors.sitFam}</p>
                : null}


<div className="field1">
              <input type="date" name="dateEmb" onChange={handleChange} placeholder="Date d'embauche"/>
            </div>
            {touched.dateEmb && errors.dateEmb
                ? <p className="errors">{errors.dateEmb}</p>
                : null}
            <div className="field1">
              <input type="email" name="email" onChange={handleChange} placeholder="email"/>
            </div>
            {touched.email && errors.email
                ? <p className="errors">{errors.email}</p>
                : null}

            <div className="field1">
              <input type="password" name="password" onChange={handleChange} placeholder="mot de passe"/>
            </div>
            {touched.password && errors.password
                ? <p className="errors">{errors.password}</p>
                : null}
            <div className="field1">

              <input type="button" name="submit" value="Continue" onClick={handleSubmit}/>
            </div>
            {errorResponse
                ? <p className="errors">{errorResponse}</p>
                : null}
            </form>
  </div>  
  )
}

export default Signup;
