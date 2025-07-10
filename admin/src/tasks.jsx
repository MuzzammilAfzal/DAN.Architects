import { Card } from "@mui/material"

function Tasks(){

    return <div style={{display:"flex"}}>
        <div style={{height:370,width:"50%",overflow:"auto"}}>
            <h3 style={{marginLeft:40,fontWeight:"bolder"}}>Daily Tasks</h3>
        <Card  elevation={7} style={{padding:20,fontWeight:"bolder",margin:10,}}>
        <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"></input>
        <label for="vehicle1"> I have a bike </label>
        </Card>
        <Card  elevation={7} style={{padding:20,fontWeight:"bolder",margin:10,}}>
        <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"></input>
        <label for="vehicle1"> A query string is a part of a URL that assigns values to specified parameters. It is commonly used to pass data to web servers and applications. </label>
        </Card>
        
        </div>





        <div style={{height:370,width:"50%",overflow:"auto"}}>
            <h3 style={{marginLeft:40,fontWeight:"bolder"}}>Weekly Tasks</h3>
        <Card  elevation={7} style={{padding:20,fontWeight:"bolder",margin:10,}}>
        <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"></input>
        <label for="vehicle1"> I have a bike </label>
        </Card>
        <Card  elevation={7} style={{padding:20,fontWeight:"bolder",margin:10,}}>
        <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"></input>
        <label for="vehicle1"> A query string is a part of a URL that assigns values to specified parameters. It is commonly used to pass data to web servers and applications. </label>
        </Card>
             
        </div>





    </div>
}
export default Tasks