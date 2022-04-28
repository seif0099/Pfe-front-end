import React,{useState,useEffect, useRef} from 'react'
import "./profile.css"
import { useFormik } from "formik";
import avatar from "../../../assets/avatar.png";


function Profile() {
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
      console.log(selectedImage)
      formData.append("myImage", selectedImage)
      console.log(formData)
      const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    };
    axios.post("http://localhost:9000/updateImage?id="+userInfo?._id,formData,config)
        .then((response) => {
            alert("The file is successfully uploaded");
        }).catch((error) => {
    });
    
    }







    async function getUserInfo(){
      let result = await fetch("http://localhost:9000/getuserbyid?id="+JSON.parse(localStorage.getItem("user-info")).user._id, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }).then(function(result){
          result.json().then(function(res){
            setMyUser(res)
            setImage("http://localhost:9000/public/uploads/"+res.imageProfile)
          })
        }
        );
      
    }

    useEffect(() =>  {
        if(JSON.parse(localStorage.getItem("user-info"))){
          const { user } = JSON.parse(localStorage.getItem("user-info"));
          setUserInfo(user);
        }
        getUserInfo();
    }, []);
    async function updateProfile(data) {    
        data.userid = userInfo?._id
        let result = await fetch("http://localhost:9000/userupdated", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(data),
        });
        if(result.status == 200){
          setSuccess("Données modifiées avec succés")
          setError(null)
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
          tel:"",
          adresse:"",
          sitFam:"",
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
  <div className="wrapper">
      <div className="inner inner1">
      <form>
          <div className="divider">
          <span className="mySpan header1 lDivider">Modifier le Profile</span>
          <div className='rDivider divImg'>
              <input type='file' id='file' ref={inputFile} style={{display: 'none'}}  onChange={(event) => {
          setSelectedImage(event.target.files[0]);
        }}/>
            <img className="userImg" src={image} alt="avatar" onClick={openBrowseFile} />
            <input type="button" className='uploadButton' value="Upload" onClick={uploadImg} />
          </div>
          </div>
          <div className="divider">
            
          <div className="field1 lDivider">
              <input type="text" name="nom" onChange={handleChange} placeholder={myUser.nom}/>
            </div>
          
          <div className="field1 rDivider">
              <input type="text" name="prenom" onChange={handleChange} placeholder={myUser.prenom}/>
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
              <input type="text" name="tel" onChange={handleChange} placeholder={myUser.tel}/>
            </div>
            {touched.tel && errors.tel
                ? <p className="errors">{errors.tel}</p>
                : null}
          <div className="field1">
              <input type="text" name="adresse" onChange={handleChange} placeholder={myUser.adresse}/>
            </div>
            {touched.adresse && errors.adresse
                ? <p className="errors">{errors.adresse}</p>
                : null}
          <div className="field1">
              <input type="text" name="sitFam" onChange={handleChange} placeholder={myUser.sitFam}/>
            </div>
            {touched.sitFam && errors.sitFam
                ? <p className="errors">{errors.sitFam}</p>
                : null}


         
            
            <div className="field1">
              <input type="email" name="email" onChange={handleChange} placeholder={myUser.email}/>
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

              <input type="button" name="submit" value="Confirmer" onClick={handleSubmit}/>
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
  )
}

export default Profile