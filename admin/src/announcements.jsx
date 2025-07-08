import { Button, Card } from '@mui/material';
import { useState,useEffect } from 'react';
import {Navigate, useNavigate} from 'react-router-dom'



 function Announcements(){
  if(localStorage.getItem("token")){   
  const navigate=useNavigate();


    useEffect(() => {
    window.scrollTo(0, 0);
      }, []);
   

    const [announcements,setannouncements]=useState(null)
    return<div style={{padding:80,background:"grey"}}>
      <Card elevation={14} style={{height:600}}>
        <h2 style={{display:"flex",justifyContent:"center"}}>Publish Notice</h2>
        <div style={{display:"flex",justifyContent:"center"}}>
         <textarea style={{height:400,width:600}} onChange={(event)=>{
          setannouncements(event.target.value)
         }}></textarea>
         </div>
         <br></br>
         <div style={{display:'flex',justifyContent:"center"}}>
         <Button variant='contained'style={{background:"grey",}} onClick={async()=>{
          if(announcements!=null){
          const announcement={
            "announcement":announcements,
            "id":localStorage.getItem("id"),
          }
          console.log(announcement)
          const response=await fetch("http://localhost:3000/announcements",{method:"POST",
            headers:{
              'Content-Type':'application/json',
              "token":localStorage.getItem("token")
            },
            body:JSON.stringify(announcement)
          })
          console.log(response)
          
          navigate("/dashboard")
        }else{alert("Note can not be empty")}

         }}>Publish</Button>
        
         </div>
      </Card>
      
    </div>
  }else{return <h2>"message:unAuthorized"</h2>}
}
export default Announcements 

