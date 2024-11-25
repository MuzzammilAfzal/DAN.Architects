import { Card } from "@mui/material"
import { useEffect, useState } from "react"
import { date } from "zod"




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
 
return <div style={{background:"grey",width:"auto",height:"100vh",display:"flex",justifyContent:"center",paddingTop:60}}>
        <Card elevation={14} style={{height:"auto",width:"auto"}}>
        <h2 style={{display:"flex",justifyContent:"center"}}>Profile</h2>
        <div style={{padding:20}}>
          <Card  elevation={7} style={{padding:20,fontWeight:"bolder",margin:10,width:300}}>Name:  {data.id}</Card>
          <Card  elevation={7} style={{padding:20,fontWeight:"bolder",margin:10,width:300}}>Age:  {data.age}</Card>
          <Card  elevation={7} style={{padding:20,fontWeight:"bolder",margin:10,width:300,overflowX:"auto"}}>Address:  {data.address}</Card>
          <Card  elevation={7} style={{padding:20,fontWeight:"bolder",margin:10,width:300}}>Phone Number:  {data.phoneNumber}</Card>
          <Card  elevation={7} style={{padding:20,fontWeight:"bolder",margin:10,width:300}}>Qualification:  {data.qualification}</Card>
          <Card  elevation={7} style={{padding:20,fontWeight:"bolder",margin:10,width:300}}>Skills:  {data.skills}</Card>
          <Card  elevation={7} style={{padding:20,fontWeight:"bolder",margin:10,width:300}}>Join Date:  {data.joinDate}</Card>
          <Card  elevation={7} style={{padding:20,fontWeight:"bolder",margin:10,width:300,display:"flex",justifyItems:"center"}}>Reference:  
          <a href={data.linkedln} >Click to view profile
             <img style={{height:60}} src="https://th.bing.com/th/id/R.ef2f3c0ea2d1116f00a5bc56b8c066ce?rik=GYaDoFewrbjMYA&riu=http%3a%2f%2f1000marcas.net%2fwp-content%2fuploads%2f2020%2f01%2fLogo-Linkedin.png&ehk=S4bpGdTYO0hvPM28u%2bFMX4ma7sBWXFdx85iEGZWSx1I%3d&risl=&pid=ImgRaw&r=0" alt="" />
            </a>
          </Card>
        </div>
        
      </Card>
    </div>
}
export default Profile