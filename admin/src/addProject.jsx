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
    let temp=""

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
                        <Button variant="contained" style={{background:"grey"}} onClick={()=>{
                          if(Team.find((e)=>e===temp)){
                            alert("Team Member Already Added")
                          }else{
                            setTeam(existingValue=>[...existingValue,temp])
                          }                         
                        }}>Add</Button>
                        <Button variant="contained" style={{background:"grey"}} onClick={()=>{
                          setTeam((e)=>{const newValue=[...e]
                            newValue.pop();
                            return(newValue)
                          })
                         }}>delete</Button>
                      </div>
                     <Card elevation={24} style={{height:200,width:200,padding:10,overflow:"auto",background:"#A9A9A9"}}>
                      <h3><u>Team Members</u></h3>
                     <div>
                       {Team.map(e=>{
                        return <h5>{e}</h5>
                       })}
                     </div>
                     </Card>
                     <br></br>
                     <h3>Details</h3>
                     <textarea style={{height:300,width:500}}></textarea>
               </div>
               <div style={{height:400,width:400}}>
                <Card elevation={24}style={{height:"auto",width:"auto"}}>
                    <h3>Upload Project Title Image</h3> <br></br>
                    <input type="file" accept="image/*" onChange={(event)=>{
                           const file = event.target.files[0];
                  
                    }}></input>
                </Card>
                <br />
                <Card elevation={24}style={{height:"auto",width:"auto"}}>
                    <h3>Upload Project Photos</h3> <br></br>
                    <input type="file" multiple accept="image/*" onChange={(event)=>{
                           const file = event.target.files[0];                               
                    }}></input>
                </Card>
               </div>
           </div>
           <div style={{display:"flex",justifyContent:"center", marginBottom:50}}>
             <Button variant="contained" style={{background:"grey"}}>Add Project</Button> 
           </div>
        </Card>
    </div>
}



export default AddProject