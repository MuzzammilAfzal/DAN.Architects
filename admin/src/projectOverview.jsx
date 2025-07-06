import { Button, Card, Popover } from "@mui/material"
import React, { useState } from "react"
import {Navigate, useNavigate} from 'react-router-dom'




function ProjectOverview(){

    const navigate=useNavigate();
    const [projectDetails,setProjectDetails]=useState([]) 
    const [selectedProject,setSelectedProject]=useState("") 



    let ongoing=[]
    let completed=[]




       React.useEffect(()=>{
           fetch("http://localhost:3000/project/projectDetails",{method:"GET",
             headers:{
               "token":localStorage.getItem("token")
             }
            }).then((response)=>{
            response.json().then((data)=>{
             setProjectDetails(data)
             projectDisplay()
            }) 
             })

         },[])



              function projectDisplay(){
                    ongoing.length=0
                    completed.length=0
                for(let i=0;i<projectDetails.length;i++){
                  if(projectDetails[i].completedPercentage==="100%"){
                     completed.push(projectDetails[i])
                   }else{
                    ongoing.push(projectDetails[i])
                   }
                }
              }
              
              function renderProjectOngoingNonAvailable(){
                  if(ongoing.length===0){
                    return <option value="">No Ongoing Projects</option>
                  }
                }
        
   
               
              function renderProjectCompletedNonAvailable(){
                  if(completed.length===0){
                    return  <option value="">no completed projects</option> 
                  }
                }






    return <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
         <Card elevation={24} style={{height:"auto",width:"50%",padding:20,margin:20}}>
             <h3>Ongoing Projects</h3>
             <select name="selectProject" id="selectProject1" style={{height:50,width:"100%"}} onChange={()=>{
               setSelectedProject(document.getElementById("selectProject1").value)
               }}>
               <option value=""disabled selected hidden>select project</option>
               {projectDetails.map(e=>{
                   if(e.completedPercentage!="100%"){
                     return <option value={e.projectName}> {e.projectName}  </option>
                   }
                 })}{projectDisplay()}{renderProjectOngoingNonAvailable()}
              </select>
              <div style={{padding:10}}>
                <Button variant="contained" style={{background:"grey",marginRight:10}} onClick={()=>{
                  if(selectedProject===""){
                    alert("plz select project")
                  }else{
                  navigate("/viewProjectDetails?"+selectedProject)
                  }
                }}>View Details</Button>
                <Button variant="contained" style={{background:"grey"}}>Edit Details</Button>
                
              </div>
         </Card>


        <Card elevation={24} style={{height:"auto",width:"50%",padding:20,margin:20}}>
             <h4 style={{display:"inline-block"}}>Completed Projects</h4>
              <select name="selectProject" id="selectProject2" style={{height:50,width:"100%"}} onChange={()=>{
               setSelectedProject(document.getElementById("selectProject2").value)}}>
                   <option value=""disabled selected hidden>select project</option>
              
                 {projectDetails.map(e=>{
                   if(e.completedPercentage=="100%"){
                     return <option value={e.projectName}> {e.projectName}  </option>
                   }
                 })}{projectDisplay()}{renderProjectCompletedNonAvailable()}
                   
                 
                 
              </select>

             <div style={{padding:10}}>
                <Button variant="contained" style={{background:"grey"}} onClick={()=>{
                  if(selectedProject===""){
                    alert("plz select project")
                  }else{
                  navigate("/viewProjectDetails?"+selectedProject)
                  }
                }}>Veiw Details</Button>
             </div>
        </Card>
    </div>

}
export default ProjectOverview