
import { Card } from '@mui/material';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import {Navigate, replace, useNavigate} from 'react-router-dom'
import React from 'react';
import ProjectOverview from './projectOverview';
import Tasks from './tasks';
const baseURL=import.meta.env.VITE_BASE_URL;





function DashBoard(){
 if(localStorage.getItem("token")){
    const navigate=useNavigate();
    const [announcement,setannouncement]=useState([])
  
    function RenderButton(){
      if(localStorage.getItem("controller")=="yes"){
        return <div>
          <br></br>
           <Card elevation={6} style={{padding:10,textAlign:'center',fontWeight:'bold'}}
           onClick={()=>{
            navigate("/announcements")
           }}>Add New Announcements</Card>   
         </div>
      }
    }
    
   React.useEffect(()=>{
        fetch(`${baseURL}/announcements`,{method:"GET",
          headers:{
            "token":localStorage.getItem("token")
          }
         }).then((response)=>{
         response.json().then((data)=>{
          setannouncement(data)
         })
          })
      },[])
      
       


    return<>
    <div style={{display:'flex',background:"#d3d3d3",transform: 'scale(0.8)', transformOrigin: 'top left', width: '125%'}}>
        <div>
           <Paper elevation={24} style={{width:300,padding:20,position:"fixed"}}>
             <Card elevation={6} style={{padding:10,textAlign:'center',fontWeight:'bold'}}>DashBoard</Card>
             <br></br>
             <Card elevation={6} style={{padding:10,textAlign:'center',fontWeight:'bold'}}
              onClick={()=>{
                navigate("/profile")
              }}
             >Profile</Card>
             <RenderButton></RenderButton>
             <br />
               <Card elevation={6} style={{padding:10,textAlign:'center',fontWeight:'bold'}}
                onClick={()=>{
                 navigate("/addProject")
               }}>Add New Project</Card>
             <br></br>
             <Card elevation={6} style={{padding:10,textAlign:'center',fontWeight:'bold'}} onClick={()=>{
                 localStorage.removeItem("token")
                 localStorage.removeItem("id")
                 localStorage.removeItem("controller")
                navigate("/admin",{replace:true})
             }}  >LogOut</Card >
           </Paper>
        </div>
       <div style={{height:"auto",background:"grey",paddingLeft:50,paddingRight:50,marginLeft:350}}>
           <div >
             <h3 style={{textAlign:'center'}}>Announcements</h3>
             <Card elevation={24} style={{height:400,width:1000,overflowY:"auto",display:'flex',flexDirection:"column-reverse"}}>
              <h5 style={{textAlign:'center'}}>(note:only controller can make announcement)</h5>
               <div>
                {
                    announcement.map(value=>{
                    return <Card elevation={6} style={{height:"auto",minWidth:865,padding:10,margin:20,overflowWrap:"break-word"}}>
                    From :  {value.id} <br/>
                    <p style={{fontWeight:"bold",fontSize:"large"}}>
                    {value.announcement}
                      </p>
                    </Card>
                  })
                }
             </div>
               
                
             </Card>
             
           </div>
           <div >
            <Card elevation={24} style={{height:400,width:1000,marginTop:50,background:"#d3d3d3"}}> <Tasks></Tasks></Card>
           </div>
           <div >
             <h3 style={{textAlign:'center',marginBottom:0}}>Project Overview</h3>
             <ProjectOverview></ProjectOverview>
           </div>
           <div >
             
             <Card elevation={24} style={{height:400,width:1000}}><h3 style={{textAlign:'center'}}>below part is under development</h3></Card>
           </div>
       </div>
    </div>

    </>
 }else{return <h2>"message:unAuthorized"</h2>}
}
export default DashBoard


