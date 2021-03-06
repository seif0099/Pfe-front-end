import React,{useState,useEffect, useRef} from 'react'
import { useFormik } from "formik";
import avatar from "../../../assets/avatar.png";


function AdminProfile() {
    const axios = require("axios");

    const [userInfo, setUserInfo] = useState({});
    const [errorResponse, setError] = useState("");
    const [successResponse, setSuccess] = useState("");
    const inputFile = useRef(null) 
    const [selectedImage, setSelectedImage] = useState(null);
    const [image, setImage] = useState(avatar);
    const [myUser, setMyUser] = useState({});

    
    async function uploadImg(){
    
      let image =  URL.createObjectURL(selectedImage)
      setImage(image)
      let formData = new FormData()
      formData.append("myImage", selectedImage)
      const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    };
    axios.post("http://localhost:9000/adminUpdateImage?id="+userInfo?._id,formData,config)
        .then((response) => {
            localStorage.setItem("admin-info", JSON.stringify(response.data));
            window.location.reload();
        }).catch((error) => {
    });
    
    }




    useEffect(() =>  {
        if(JSON.parse(localStorage.getItem("admin-info"))){
          const { user } = JSON.parse(localStorage.getItem("admin-info"));
          setUserInfo(user)
        }
    }, []);
    async function updateProfile(data) {    
        data.userid = userInfo?._id
        let result = await fetch("http://localhost:9000/adminupdated", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(data),
        });
        let results = await result.json();
        if(result.status == 200){
          setSuccess("Données modifiées avec succés")
          setError(null)
          localStorage.setItem("admin-info", JSON.stringify(results));
          window.location.reload();
        }
        else{
        setSuccess(null)
        setError(result)
        }
      }
      function validate(values) {
        const errors = {};
        
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
          nom:"",
          prenom:"",
        },
        validate,
        onSubmit: (values) => {
          updateProfile(values)
          },
        });
      function openBrowseFile(){
        inputFile.current.click();

      }
  return (
    <div className='cont'>
  <div className="wrapper">
      <div className="inner inner1">
      <form>
          <div className="divider">
          <span className="mySpan header1 lDivider">Modifier le Profile</span>
          <div className='rDivider divImg'>
              <input type='file' id='file' ref={inputFile} style={{display: 'none'}}  onChange={(event) => {
          setSelectedImage(event.target.files[0]);
        }}/>
            <img className="userImg" src={"http://localhost:9000/public/uploads/"+userInfo.imageProfile} alt="avatar" onClick={openBrowseFile} />
            <input type="button" className='loginButton uploadButton' value="Upload" onClick={uploadImg} />
          </div>
          </div>
          <div className="divider">
            
          <div className="field1 lDivider">
              <input type="text" name="nom" onChange={handleChange} placeholder={userInfo.nom}/>
            </div>
          
          <div className="field1 rDivider">
              <input type="text" name="prenom" onChange={handleChange} placeholder={userInfo.prenom}/>
            </div>
          
          </div>
          <div className="divider">
          
          { touched.nom && errors.nom
                ? <p className="errors lDivider">{errors.nom}</p>
                : null}
          {touched.prenom && errors.prenom
                ? <p className="errors rDivider" >{errors.prenom}</p>
                : null}
                </div>
          
         
         


         
            
            <div className="field1">
              <input type="email" name="email" onChange={handleChange} placeholder={userInfo.email}/>
            </div>
            {touched.email && errors.email
                ? <p className="errors">{errors.email}</p>
                : null}

            <div className="field1">
              <input type="password" name="password" onChange={handleChange} placeholder="password"/>
            </div>
            {touched.password && errors.password
                ? <p className="errors">{errors.password}</p>
                : null}
            <div className="field1">

              <input type="button" name="submit" className='loginButton' value="Confirmer" onClick={handleSubmit}/>
            </div>
            {successResponse
        						? <h1 className="serverSuccess">{successResponse}</h1>
        						: null}
					{errorResponse
        						? <p className="errors">{errorResponse}</p>
        						: null}
            </form>          
      </div>
    </div>
    </div>
  )
}

export default AdminProfile