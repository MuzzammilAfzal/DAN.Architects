import  {Card} from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {Navigate, useNavigate} from 'react-router-dom'


function Login(){
    const navigate=useNavigate();

   
    let User={
        id:"",
        password:""
    }
    
return<div  style={{background:"#d3d3d3",height:800,display:'flex',justifyContent:'center',flexWrap:"wrap"}}>
   <center style={{padding:200}}>
        <Card variant="outlined" style={{width:300,padding:50}}>
            <h1>DAN. Architects</h1> 
             <TextField id="outlined-basic" placeholder='No spaces allowed' label="Employee ID" variant="outlined" 
             onChange={(event)=>{
                User.id=event.target.value
             
             }} />
             <br></br><br></br>
             <TextField id="password" label="Password" variant="outlined" type='password'
             onChange={(event)=>{
                 User.password=event.target.value
                console.log(User)
               }} />
             <br></br><br></br>
             <Button  variant="contained" color='' style={{background:"#d3d3d3"}}
             onClick={ async()=>{
                if(User.id=="" || User.password==""){
                 console.log("plz enter Both Username and password")
                 alert('Plz Enter Both Username and password')
                }else{
                const response=await fetch("http://localhost:3000/admin/login",{method:"POST",
                    headers:{
                        'Content-Type':'application/json'
                     },
                    body:JSON.stringify(User)
                })
                const data=await response.json()
                console.log(data);
                if(data.value==0){
                   alert("Incorrect ID and Password")
                }else{
                    if(data.value==1){
                    navigate("/dashboard")
                    localStorage.setItem("token",data.token)
                    localStorage.setItem("id",User.id)
                    if(data.data.controller=="yes")
                    {
                        localStorage.setItem("controller",data.data.controller)
                    }else{
                        localStorage.setItem("controller",data.data.controller)
                    }
                    }else{
                    if(data.value==2){
                    alert("input must be string and maxLength 20")
                    }
                 }
                }
               }
             }
            }>LOGIN</Button>
        </Card>
        
    </center>
 </div>

 }

export default Login