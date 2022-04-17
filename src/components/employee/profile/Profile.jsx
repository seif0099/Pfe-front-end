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
    const handleName = (e) => {
      setNom(e.target.value);
    };
    const handleUsername = (e) => {
        setUsername(e.target.value);
        setSubmitted(false);
      };
   
    // Handling the email change
    const handleEmail = (e) => {
      setEmail(e.target.value);
      setSubmitted(false);
    };
   
    // Handling the password change
    const handlePassword = (e) => {
      setPassword(e.target.value);
      setSubmitted(false);
    };
    const handleClasse = (e) => {
        setClasse(e.target.value);
        setSubmitted(false);
      };
      const handleMatricule = (e) => {
        setMatricule(e.target.value);
        setSubmitted(false);
      };
      const handlePrenom = (e) => {
        setPrenom(e.target.value);
        setSubmitted(false);
      };
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
        let result = await fetch("http://localhost:9000/UpdateUser", {
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
   
 
  
    <div className="form">
      <div>
        <h1>User Registration</h1>
      </div>
 
      {/* Calling to the methods */}
      <div className="messages">
        {errorMessage()}
        {successMessage()}
      </div>
 
      <form>
        {/* Labels and inputs for form data */}
        <label className="label">Username</label>
        <input onChange={handleUsername} className="inputt"
          value={userInfo?.Username}  type="text"  />
        <label className="label">Nom</label>
        <input onChange={handleName} className="inputt"
          value={userInfo?.nom} type="text" />
            <label className="label">Prénom</label>
        <input onChange={handlePrenom} className="inputt"
          value={userInfo?.prenom} type="text" />
 
        <label className="label">Email</label>
        <input onChange={handleEmail} className="inputt"
          value={userInfo?.email} type="email" />
 
        <label className="label">Password</label>
        <input onChange={handlePassword} className="inputt"
          value={userInfo?.password} type="password" />
 
 <label className="label">Classe</label>
        <input onChange={handleClasse} className="inputt"
          value={userInfo?.classe} type="text" />
           <label className="label">Matricule</label>
        <input onChange={handleMatricule} className="inputt"
          value={userInfo?.matricule} type="password" />
        <button onClick={handleSubmit} className="btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  )
}

export default Profile