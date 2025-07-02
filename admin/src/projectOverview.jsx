import { Button, Card } from "@mui/material"
import React, { useState } from "react"




function ProjectOverview(){


    const [projectDetails,setProjectDetails]=useState([]) 
    const [selectProject,setSelectProject]=useState("") 
   //  const [ongoingProjects,setOngoingProjects]=useState([])
   //  const [completedProjects,setCompletedProjects]=useState([])
   //  const[displayNonAvailable1,setDisplayNonAvailable1]=useState("select project")
   //  const[displayNonAvailable2,setDisplayNonAvailable2]=useState("select project")


   



       React.useEffect(()=>{
           fetch("http://localhost:3000/project/projectDetails",{method:"GET",
             headers:{
               "token":localStorage.getItem("token")
             }
            }).then((response)=>{
            response.json().then((data)=>{
             setProjectDetails(data)
             console.log(projectDetails);
             
            }) 
             })

         },[])



         // React.useEffect(()=>{
         //              const ongoing=[]
         //              const completed=[]
         //      projectDetails.forEach((e)=>{
                      
         //             if(e.completedPercentage !="100%"){
         //                setOngoingProjects((existingValue)=>[...existingValue,e])
         //                ongoing.push(e)
         //             }else{
         //                setCompletedProjects((existingValue)=>[...existingValue,e])
         //                completed.push(e)
         //             }
         //            })
         //            console.log(ongoingProjects)
         //            console.log(completedProjects)
         //            console.log(ongoing)
         //            console.log(completed)
                    
             
         //       if(ongoingProjects.length===0){
         //         setDisplayNonAvailable1("No Ongoing Projects")
         //        }else{
         //          setDisplayNonAvailable1("select project")
         //        }
         //       if(completedProjects.length===0){
         //          setDisplayNonAvailable2("No Completed Projects")
         //        }
         // },[])







    return <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
         <Card elevation={24} style={{height:"auto",width:"50%",padding:20,margin:20}}>
             <h3>Ongoing Projects</h3>
             <select name="selectProject" id="selectProject" style={{height:50,width:"100%"}} onChange={()=>{
               setSelectProject(document.getElementById("selectProject").value)}}>
               <option value=""disabled selected hidden>select project</option>
                 {projectDetails.map(e=>{
                   if(e.completedPercentage!="100%"){
                     return <option value={e.projectName}> {e.projectName}  </option>
                   }
                 })}
              </select>
              <div style={{padding:10}}>
                <Button variant="contained" style={{background:"grey",marginRight:10}}>View Details</Button>
                <Button variant="contained" style={{background:"grey"}}>Edit Details</Button>
              </div>
         </Card>


        <Card elevation={24} style={{height:"auto",width:"50%",padding:20,margin:20}}>
             <h4 style={{display:"inline-block"}}>Completed Projects</h4>
              <select name="selectProject" id="selectProject" style={{height:50,width:"100%"}} onChange={()=>{
               setSelectProject(document.getElementById("selectProject").value)}}>
                   <option value=""disabled selected hidden>select project</option>
               {projectDetails.map(e=>{
                   if(e.completedPercentage=="100%"){
                     return <option value={e.projectName}> {e.projectName}  </option>
                   }
                 })}
                 
              </select>

             <div style={{padding:10}}>
                <Button variant="contained" style={{background:"grey"}}>Veiw Details</Button>
             </div>
        </Card>
    </div>

}
export default ProjectOverview