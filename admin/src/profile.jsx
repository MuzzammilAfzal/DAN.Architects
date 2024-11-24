import { Card } from "@mui/material"
import { useEffect, useState } from "react"




function Profile(){
    const [data,setdata]=useState({})
    useEffect(()=>{
       async function fetchData (){
        const response=await fetch("http://localhost:3000/profile",{
          method:"GET",
          headers:{
             "token":localStorage.getItem("token"),
             "id":localStorage.getItem("id")
         },
        })
        const data= await response.json()
        setdata(data)
        console.log(data);
      }
     fetchData()
      
    },[])
 
return <div style={{background:"grey",width:"auto",height:"100vh",display:"flex",justifyContent:"center",paddingTop:100}}>
        <Card elevation={14} style={{height:"auto",width:1000}}>
        <h2 style={{display:"flex",justifyContent:"center"}}>Profile</h2>
        <div style={{padding:20}}>
          <Card  elevation={7} style={{padding:20,fontWeight:"bolder",margin:10,width:500}}>Name:  {data.id}</Card>
        </div>
 
      </Card>
    </div>
}
export default Profile