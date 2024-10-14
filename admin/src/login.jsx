import  {Card} from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';



function Login(){
return<div  style={{background:"#d3d3d3",height:800,}}>
   <center style={{padding:200}}>
        <Card variant="outlined" style={{width:300,padding:50}}>
            <h1>DAN. Architects</h1> 
             <TextField id="outlined-basic" label="Employee ID" variant="outlined" />
             <br></br><br></br>
             <TextField id="outlined-basic" label="Password" variant="outlined" />
             <br></br><br></br>
             <Button variant="contained" color='' style={{background:"#d3d3d3"}}>LOGIN</Button>
        </Card>
        
    </center>
 </div>
 }

export default Login;