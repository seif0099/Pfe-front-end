import React,{useState,useEffect} from 'react'
import "./profile.css"
import History from "../../authentication/sign-up/History";

function Profile() {
    const [userInfo, setUserInfo] = useState({});

    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
   const[matricule,setMatricule]=useState('')
   const[classe,setClasse]=useState('')
   const[username,setUsername]=useState('')
    // States for checking the errors
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);
   
    // Handling the name change
  
    // Handling the form submission
    const handleSubmit = (e) => {
      e.preventDefault();
      if (nom === '' || email === '' || password === '') {
        setError(true);
      } else {
        setSubmitted(true);
        setError(false);
      }
    };

   
    // Showing success message
    const successMessage = () => {
      return (
        <div
          className="success"
          style={{
            display: submitted ? '' : 'none',
          }}>
          <h1>User {userInfo?.nom} successfully updated!!</h1>
        </div>
      );
    };
   
    // Showing error message if error is true
    const errorMessage = () => {
      return (
        <div
          className="error"
          style={{
            display: error ? '' : 'none',
          }}>
          <h1>Please enter all the fields</h1>
        </div>
      );
    };
    useEffect(() => {
        if(JSON.parse(localStorage.getItem("user-info"))){
          const { user } = JSON.parse(localStorage.getItem("user-info"));
          setUserInfo(user);
        }
  
    }, []);
    async function updateProfile(e) {
        e.preventDefault();
    
        let item = {
          nom,
          prenom,
          classe,
          matricule,
          username,
          email,
          password,
          userid: userInfo?._id,
        };
        let result = await fetch("http://localhost:9000/userupdated", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(item),
        });
        let results = await result.json();
      }
  return (
<div className="wrapper">
      <div className="inner">
        <form>
          <h3>Update Profile</h3>
          <div className="form-row">
            <div className="form-wrapper">
              <label htmlFor="">Nom *</label>
              <input
                type="text"
                className="form-control"
                placeholder={userInfo?.nom}
                
                onChange={(e) => setNom(e.target.value)}              />
            </div>
            <div className="form-wrapper">
              <label htmlFor="">Prénom *</label>
              <input
                type="text"
                className="form-control"
                placeholder={userInfo?.prenom}
              
                onChange={(e) => setPrenom(e.target.value)}              />

              
            </div>
            <br/>
          </div>

          <div className="form-row last">
            <div className="form-wrapper">
              <label htmlFor="">Username</label>
              <input
                type="text"
                className="form-control"
                placeholder={userInfo?.username}
                onChange={(e) => setUsername(e.target.value)}   
              />
              <i className="zmdi zmdi-chevron-down"></i>
            </div>
            <div className="form-wrapper">
              <label htmlFor="">Classe *</label>
              <input
                type="text"
                className="form-control"
                placeholder={userInfo?.classe}
                onChange={(e) => setClasse(e.target.value)}   
             />

              <i className="zmdi zmdi-chevron-down"></i>
            </div>
         
          <div className="form-wrapper">
            <label for="">Matricule *</label>
            <input 
              name=""
              id=""
              className="form-control"
              placeholder={userInfo?.matricule}
              onChange={(e) => setMatricule(e.target.value)}   
           
            />
            </div>
               <div className="form-wrapper">
            <label for="">Email *</label>
            <input 
              type="email"
              
              className="form-control"
              placeholder={userInfo?.email}
              onChange={(e) => setEmail(e.target.value)}   
            />
            </div>
                <div className="form-wrapper">
            <label for="">password *</label>
            <input 
              type="password"
              
              className="form-control"
              placeholder={userInfo?.password}
              onChange={(e) => setPassword(e.target.value)}   
            />
            </div>
          </div>
          <button data-text="Confirmer" onClick={updateProfile}>
            <span>confirmer</span>
          </button>
        </form>
      </div>
    </div>
  )
}

export default Profile