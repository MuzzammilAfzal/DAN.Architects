import { Button, Card, TextField } from "@mui/material"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function EditProject(){


   const navigate=useNavigate();
  
   const[Project,setProject]=useState(
    {
      projectName:"",
      startDate:"",
      targetDate:"",
      siteLocation:"",
      team:null,
      details:"",
      completedPercentage:"0%",
      file:"",
    })
  
  

   
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
     
   const [temp,settemp]=useState("")

    const [file, setFile] = useState(null);
   
  





    return <div style={{padding:100,background:"#B5B5B5"}}>
        <Card elevation={24}style={{height:"auto"}}>
           <div style={{display:"flex",justifyContent:"center"}}> <h3> Project Details</h3> </div>
         <div style={{display:"flex", justifyContent:"space-evenly"}}>
               <div style={{padding:50}}>
                   <TextField label="ProjectName" variant="standard" onChange={(event)=>{
                    setProject((previousData)=>({
                      ...previousData,
                      projectName:event.target.value
                    }))
                   }}/><br></br>
                   <div style={{display:"flex",gap:30}}>
                      <TextField label="Start Date" variant="standard"  onChange={(event)=>{
                     setProject((previousData)=>({
                      ...previousData,
                      startDate:event.target.value
                    }))
                   }}/>
                      <TextField label="Target Date" variant="standard"  onChange={(event)=>{
                    setProject((previousData)=>({
                      ...previousData,
                      targetDate:event.target.value
                    }))
                   }}/><br></br>
                   </div>
                   <TextField label="Site Location" variant="standard"   onChange={(event)=>{
                    setProject((previousData)=>({
                      ...previousData,
                      siteLocation:event.target.value
                    }))
                   }}/><br></br>
                   <br></br>
                   Select Team Members: <select id="team" name="team" onChange={()=>{
                     settemp(document.getElementById("team").value)
                   }} >
                      <option value=""disabled selected hidden>Team</option>
                      { employeesData.map(e=>{
                        return <option value={e.id}>{e.id}</option>
                         })
                       }
                        </select>
                      <div style={{gap:30}}>
                        <Button variant="contained" style={{background:"grey"}} onClick={()=>{
                          if(temp==""){
                           alert("plz select Team Members")
                          }else{
                             if(Team.find((e)=>e===temp)){
                              alert("Team Member Already Added")
                             }else{
                             setTeam((existingValue)=>[...existingValue,temp])                          
                          } 
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
                       })
                       }                        
                     </div>
                     </Card><br />
                      <Button variant="contained" style={{background:"grey"}} onClick={()=>{
                            setProject((previousData)=>({
                           ...previousData,
                           team:Team
                           }))            
                           }}>Upload Team Members </Button>
                     <br></br>
                     <h3>Details</h3>
                     <textarea style={{height:300,width:500}} onChange={(event)=>{
                       setProject((previousData)=>({
                        ...previousData,
                        details:event.target.value
                       }))
                     }}></textarea>
                     <div>
                        <h3>Completed Percentage</h3>
                        <select name="" id="completePercentage" onChange={(event)=>{
                          
                          setProject((previousData)=>({
                            ...previousData,
                            completedPercentage:event.target.value
                           }))                         
                        }}>
                          <option value="0%">0%</option>
                          <option value="10%">10%</option>
                          <option value="20%">20%</option>
                          <option value="30%">30%</option>
                          <option value="40%">40%</option>
                          <option value="50%">50%</option>
                          <option value="60%">60%</option>
                          <option value="70%">70%</option>
                          <option value="80%">80%</option>
                          <option value="90%">90%</option>
                          <option value="100%">100%</option>
                        </select>
                     </div>
               </div>
               <div style={{height:"auto",width:400}}>
                {/* <Card elevation={24}style={{height:"auto",width:"auto"}}>
                    <h3>Upload Project Title Image</h3> 
                    <input type="file" accept="image/*" onChange={(event)=>{
                           const file = event.target.files[0];
                  
                    }}></input>
                    <Button variant="contained" style={{background:"grey"}}>upload</Button>
                </Card> */}
                <br />
                {/* <Card elevation={24}style={{height:250,width:"auto"}}>
                    <h3>Upload Project Photos</h3> <br></br>
                    <input type="file" multiple accept="image/*" onChange={(event)=>{
                           const file = event.target.files[0];                               
                    }}></input>
                    <Button variant="contained" style={{background:"grey"}}>upload</Button>
                </Card> */}
                <br />
                <Card elevation={24}style={{height:250,width:"auto"}}>
                    <h3>Upload Single Project Files</h3> <br></br>
                    <input type="file" onChange={(event)=>{
                            const fileInput=event.target.files[0];
                            const finalFile=new File([fileInput], Project.projectName+"_ProjectDetails");
                            setFile(finalFile)   
                            setProject((previousData)=>({...previousData,file:Project.projectName+"_ProjectDetails"}))                  
                    }}></input>
                    
                </Card>
               </div>
           </div>
           <div style={{display:"flex",justifyContent:"center", marginBottom:50}}>
             <Button variant="contained" style={{background:"grey"}} onClick={async()=>{

                  const formData = new FormData();
                  formData.append("file", file);
                
                  const response=await fetch("http://localhost:3000/upload",{method:"POST",
                    headers:{
                      
                      "token":localStorage.getItem("token")
                    },
                    body:formData,
                  })
                   console.log(response.data);
                   console.log(Project);
                  navigate("/dashboard")
                   
             }}>Add / Edit Project</Button> 
           </div>
        </Card>
    </div>
}



export default EditProject