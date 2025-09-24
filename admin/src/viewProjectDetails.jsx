import { useLocation } from 'react-router-dom';
import { Button, Card, TextField } from "@mui/material"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react"
const baseURL=import.meta.env.VITE_BASE_URL;



function ViewProjectDetails(){


   useEffect(() => {
  window.scrollTo(0, 0);
    }, []);


    const location = useLocation();
    const querry = location.search
    let projectName=querry.replace("?","")
    const [project,setProject]=useState({})

   const navigate=useNavigate();
  


   
   
  
  



      React.useEffect(()=>{
               fetch(`${baseURL}/project/projectDetails`,{method:"GET",
                 headers:{
                   "token":localStorage.getItem("token")
                 }
                }).then((response)=>{
                response.json().then((data)=>{
                  
                  data.map(e=>{
                  if(e.projectName===projectName)
                  {
                    setProject(e)
                  }
                })
                console.log(project)
                }) 
                 })
    
             },[])



     function RenderEditButton(){
      if(project.completedPercentage!=="100%" && localStorage.getItem("controller")==="yes"){
          return  <Button variant="contained" style={{background:"grey"}} onClick={async()=>{
          navigate("/editProject",{state:{"project":project}})
          }}>Edit</Button> 
      }else{ return <h6 style={{display:"inline-block"}}>(Note: Completed Projects Details cannot be Edited)</h6> }
     }




    return <div style={{padding:100,background:"#B5B5B5"}}>
        <Card elevation={24}style={{height:"auto"}}>
           <div style={{display:"flex",justifyContent:"center"}}> <h3> Project Details</h3> </div>
         <div style={{display:"flex", justifyContent:"space-evenly"}}>
               <div style={{padding:50,paddingTop:0}}>
                  <Card  elevation={7} style={{padding:20,fontWeight:"bolder",margin:10,width:300}}>Project Name:  {project.projectName}</Card>
                   <div style={{display:"flex",gap:30}}>
                    <Card  elevation={7} style={{padding:20,fontWeight:"bolder",margin:10,width:300}}>Start Date:  {project.startDate}</Card>
                    <Card  elevation={7} style={{padding:20,fontWeight:"bolder",margin:10,width:300}}>Target Date:  {project.targetDate}</Card>
                   </div>
                   <div style={{display:"flex",gap:30}}>
                   <Card  elevation={7} style={{padding:20,fontWeight:"bolder",margin:10,width:300}}>Site Location:  {project.siteLocation}</Card>
                   <Card  elevation={7} style={{padding:20,fontWeight:"bolder",margin:10,width:300}}>Team: {project?.team?.join(", ")}</Card>
                   </div>
                     <h3>Details</h3>
                     <textarea readOnly style={{height:300,width:730}} value={project.details}></textarea>
                    <div style={{display:"flex",gap:30}}>  
                        <Card  elevation={7} style={{padding:20,fontWeight:"bolder",margin:10,width:300}}>Percentage of Completion:   {project.completedPercentage}</Card>
                        <Card  elevation={7} style={{padding:20,fontWeight:"bolder",margin:10,width:300}}>Project File :  <Button variant="contained" style={{background:"grey"}} onClick={async()=>{
                          if(project.file===""){
                             alert("their is no file for this project")
                          }else{
                          fetch(`${baseURL}/download/${project.file}`,{method:"GET",
                             headers:{
                             "token":localStorage.getItem("token")
                            }
                          }).then(response => response.blob())
                           .then(blob => {
                            const url = window.URL.createObjectURL(blob);
                           const a = document.createElement('a');
                           a.href = url;
                           a.download = project.file;
                           document.body.appendChild(a);
                           a.click();
                           a.remove();
                          })
                       }}}>Click Here to Download</Button> </Card>
                    </div> 
                    <br />
                     <div style={{display:"flex",justifyContent:"center"}}>
                       {RenderEditButton()}
                     </div>
               </div>
           </div>
           
        </Card>
    </div>
}



export default ViewProjectDetails


