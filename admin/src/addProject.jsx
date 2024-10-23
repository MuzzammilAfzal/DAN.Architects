import { Button, Card, TextField } from "@mui/material"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AddProject(){
  
   

  const [ImagePreviewUrl,setImagePreviewUrl]=useState(null)
   
  const [employeesData,setemployeesData]=useState([])
    useEffect(()=>{
      fetch("http://localhost:3000/employeesData",{method:"GET",
        headers:{
          "token":localStorage.getItem("token")
        }
       }).then((response)=>{
       response.json().then((data)=>{
        setemployeesData(data)
       })
        })
    },[])

    const [Team,setTeam]=useState([])
   const temp=""

    return <div style={{padding:100,background:"#B5B5B5"}}>
        <Card elevation={24}style={{height:"auto"}}>
           <div style={{display:"flex",justifyContent:"center"}}> <h3> Project Details</h3> </div>
         <div style={{display:"flex", justifyContent:"space-evenly"}}>
               <div style={{padding:50}}>
                   <TextField label="ProjectName" variant="standard" /><br></br>
                   <div style={{display:"flex",gap:30}}>
                      <TextField label="Start Date" variant="standard"/>
                      <TextField label="Target Date" variant="standard"/><br></br>
                   </div>
                   <TextField label="Site Location" variant="standard"/><br></br>
                   <br></br>
                   Select Team Members: <select id="team" name="team" onChange={()=>{
                     temp=document.getElementById("team").value
                   }} >
                      <option value=""disabled selected hidden>Team</option>
                      { employeesData.map(e=>{
                        return <option value={e.id}>{e.id}</option>
                         })
                       }
                        </select>
                      <div style={{gap:30}}>
                        <Button variant="outlined" style={{color:'grey',borderBlockColor:"black"}} onClick={()=>{
                          setTeam(temp)
                        }}>Add</Button>
                      </div>
                     <Card elevation={24} style={{height:200,width:200,padding:10,overflow:"auto"}}>
                      <h3><u>Team Members</u></h3>
                     <div>
                       {Team}
                     </div>
                     </Card>
               </div>
               <div style={{height:400,width:400}}>
                <Card elevation={24}style={{height:"auto",width:"auto"}}>
                    <h3>Upload Project Title Image</h3> <br></br>
                    <input type="file" accept="image/*" onChange={(event)=>{
                           const file = event.target.files[0];
                           if (file) {
                             const reader = new FileReader(); 
                         
                             reader.onloadend = () => {
                               setImagePreviewUrl(reader.result);
                             };
                                reader.readAsDataURL(file);    
                    }}}></input>
                </Card>
               </div>
           </div> 
        </Card>
    </div>
}



export default AddProject