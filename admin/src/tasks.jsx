import { Card ,Button} from "@mui/material"
import { useState } from "react"

function Tasks(){

    const [addTaskDaily,setAddTaskDaily]=useState(false)
    const [renderAddDaily,setRenderAddDaily]=useState(false)
    const [addTaskWeekly,setAddTaskWeekly]=useState(false)
    const [renderAddWeekly,setRenderAddWeekly]=useState(false)

    function inputTaskDaily(){

        return <div>
               <textarea style={{marginLeft:12,width:"90%",height:60}} onChange={(event)=>{
                   
                     }}></textarea>
        </div>
    }

    function ButtonAddDaily(){

        return <div>
        <Button variant="contained" style={{background:"grey",marginLeft:10}}>add</Button>
        <Button variant="contained" style={{background:"grey",marginLeft:10}} onClick={()=>{
         setAddTaskDaily(false)
         setRenderAddDaily(false)
        }}>cancel</Button>
        </div>


    }
  

     function inputTaskWeekly(){

        return <div>
               <textarea style={{marginLeft:12,width:"90%",height:60}} onChange={(event)=>{
                   
                     }}></textarea>
        </div>
    }

    function ButtonAddWeekly(){

        return <div>
        <Button variant="contained" style={{background:"grey",marginLeft:10}}>add</Button>
        <Button variant="contained" style={{background:"grey",marginLeft:10}} onClick={()=>{
         setAddTaskWeekly(false)
         setRenderAddWeekly(false)
        }}>cancel</Button>
        </div>


    }

    return <div style={{display:"flex"}}>
        <div style={{height:370,width:"50%",overflow:"auto"}}>
            <h3 style={{marginLeft:12,fontWeight:"bolder"}}>Daily Tasks</h3>
        <Card  elevation={7} style={{padding:20,fontWeight:"bolder",margin:10,}}>
        <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"></input>
        <label for="vehicle1"> I have a bike </label>
        </Card>
        <Card  elevation={7} style={{padding:20,fontWeight:"bolder",margin:10,}}>
        <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"></input>
        <label for="vehicle1"> A query string is a part of a URL that assigns values to specified parameters. It is commonly used to pass data to web servers and applications. </label>
        </Card>
        <Card  elevation={7} style={{padding:20,fontWeight:"bolder",margin:10,}}>
        <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"></input>
        <label for="vehicle1"> A query string is a part of a URL that assigns values to specified parameters. It is commonly used to pass data to web servers and applications. </label>
        </Card>
        {addTaskDaily && inputTaskDaily() }
        {renderAddDaily && ButtonAddDaily() }
        {!renderAddDaily &&  <Button variant="contained" style={{background:"grey",marginLeft:10}} onClick={()=>{
            setAddTaskDaily(true)
            setRenderAddDaily(true)
         }}>add task</Button>}

        </div>





        <div style={{height:370,width:"50%",overflow:"auto"}}>
            <h3 style={{marginLeft:12,fontWeight:"bolder"}}>Weekly Tasks</h3>
        <Card  elevation={7} style={{padding:20,fontWeight:"bolder",margin:10,}}>
        <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"></input>
        <label for="vehicle1"> I have a bike </label>
        </Card>
        <Card  elevation={7} style={{padding:20,fontWeight:"bolder",margin:10,}}>
        <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"></input>
        <label for="vehicle1"> A query string is a part of a URL that assigns values to specified parameters. It is commonly used to pass data to web servers and applications. </label>
        </Card>
        
         {addTaskWeekly && inputTaskWeekly() }
        {renderAddWeekly && ButtonAddWeekly() }
        {!renderAddWeekly &&  <Button variant="contained" style={{background:"grey",marginLeft:10}} onClick={()=>{
            setAddTaskWeekly(true)
            setRenderAddWeekly(true)
         }}>add task</Button>}

        </div>





    </div>
}
export default Tasks