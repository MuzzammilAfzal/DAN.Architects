
import { Card } from '@mui/material';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import {Navigate, useNavigate} from 'react-router-dom'
import React from 'react';
import ProjectOverview from './projectOverview';





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
           <br></br>
           <Card elevation={6} style={{padding:10,textAlign:'center',fontWeight:'bold'}}
           onClick={()=>{
            navigate("/addProject")
           }}>Add New Project</Card>
         </div>
      }
    }
    
   React.useEffect(()=>{
        fetch("http://localhost:3000/announcements",{method:"GET",
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
    <div style={{display:'flex'}}>
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
             <br></br>
             <Card elevation={6} style={{padding:10,textAlign:'center',fontWeight:'bold'}} onClick={()=>{
                 localStorage.removeItem("token")
                 localStorage.removeItem("id")
                 localStorage.removeItem("controller")
                navigate("/admin")
             }}  >LogOut</Card >
           </Paper>
        </div>
       <div style={{height:"auto",background:"grey",paddingLeft:50,paddingRight:50,marginLeft:350}}>
           <div >
             <h3 style={{textAlign:'center'}}>Announcements</h3>
             <Card elevation={24} style={{height:400,width:1000,overflowY:"auto",display:'flex',flexDirection:"column-reverse"}}>
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
             <h3 style={{textAlign:'center'}}>Upcoming Tasks</h3>
             <Card elevation={24} style={{height:400,width:1000}}></Card>
           </div>
           <div >
             <h3 style={{textAlign:'center',marginBottom:0}}>Project Overview</h3>
             <ProjectOverview></ProjectOverview>
           </div>
           <div >
             <h3 style={{textAlign:'center'}}>Recent Activity</h3>
             <Card elevation={24} style={{height:400,width:1000}}></Card>
           </div>
       </div>
    </div>

    </>
 }else{return <h2>"message:unAuthorized"</h2>}
}
export default DashBoard


