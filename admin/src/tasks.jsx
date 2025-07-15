import { Card ,Button} from "@mui/material"
import { useState ,useEffect} from "react"
const baseURL=import.meta.env.VITE_BASE_URL;


function Tasks(){

    const [addTaskDaily,setAddTaskDaily]=useState(false)
    const [renderAddDaily,setRenderAddDaily]=useState(false)
    const [addTaskWeekly,setAddTaskWeekly]=useState(false)
    const [renderAddWeekly,setRenderAddWeekly]=useState(false)
    const [taskD,setTaskD]=useState({
        id:localStorage.getItem("id"),
        task1:""
    })
    const [taskW,setTaskW]=useState({
        id:localStorage.getItem("id"),
        task2:""
    })
    const [data,setdata]=useState()
    const [updateDailyTask,setUpdateDailyTask]=useState([])
    const [updateWeeklyTask,setUpdateWeeklyTask]=useState([])


     useEffect(()=>{
           async function fetchData (){
            const response=await fetch(`${baseURL}/profile`,{
              method:"GET",
              headers:{
                 "token":localStorage.getItem("token"),
                 "id":localStorage.getItem("id")
             },
            })
            const data= await response.json()
            setdata(data)
          }
         fetchData()
          
        },[])
    
    function inputTaskDaily(){

        return <div>
               <textarea style={{marginLeft:12,width:"90%",height:60}} onChange={(event)=>{
                   setTaskD((prev)=>({...prev,task1:event.target.value}))
                     }}></textarea>
        </div>
    }

    function ButtonAddDaily(){

        return <div>
        <Button variant="contained" style={{background:"grey",marginLeft:10}} onClick={async()=>{
            if(taskD?.task1===""){
              alert("empty task")
            }else{
          const response=await fetch(`${baseURL}/task/upload/dailyTask`,{method:"POST",
                    headers:{
                        "token":localStorage.getItem("token"),
                        'Content-Type':'application/json'
                     },
                    body:JSON.stringify({
                        "id":taskD.id,
                        "task":taskD.task1
                    })
                })
                const data1=await response.json()
                 setAddTaskDaily(false)
                 setRenderAddDaily(false)
                 location.reload()
        }}}>add</Button>
        <Button variant="contained" style={{background:"grey",marginLeft:10}} onClick={()=>{
         setAddTaskDaily(false)
         setRenderAddDaily(false)
        }}>cancel</Button>
        </div>


    }
  

     function inputTaskWeekly(){

        return <div>
               <textarea style={{marginLeft:12,width:"90%",height:60}} onChange={(event)=>{
                    setTaskW((prev)=>({...prev,task2:event.target.value}))
                     }}></textarea>
        </div>
    }

    function ButtonAddWeekly(){

        return <div>
        <Button variant="contained" style={{background:"grey",marginLeft:10}} onClick={async()=>{
             if(taskW?.task2===""){
              alert("empty task")
            }else{
          const response=await fetch(`${baseURL}/task/upload/weeklyTask`,{method:"POST",
                    headers:{
                        "token":localStorage.getItem("token"),
                        'Content-Type':'application/json'
                     },
                    body:JSON.stringify({
                        "id":taskW.id,
                        "task":taskW.task2
                    })
                })
                const data1=await response.json()
                 setAddTaskWeekly(false)
                 setRenderAddWeekly(false)
                 location.reload()
        }}}>add</Button>
        <Button variant="contained" style={{background:"grey",marginLeft:10}} onClick={()=>{
         setAddTaskWeekly(false)
         setRenderAddWeekly(false)
        }}>cancel</Button>
        </div>


    }

    const handleCheckD=(e)=>{
            const value = e.target.value
         console.log(value);
         console.log(e.target.checked);
         if(e.target.checked){
            setUpdateDailyTask(prev=>([...prev,value]))
         }else{
            setUpdateDailyTask(prev=>prev.filter(item=>item!==value))
         }
         console.log(updateDailyTask)    
    }


    const renderTaskD=()=>{
       return <div> {data?.dailyTask?.map(e=>{
            return <Card  elevation={7} style={{padding:20,fontWeight:"bolder",margin:10,}}>
        <input type="checkbox"  value={e} onChange={handleCheckD}></input>
        <label > {e} </label>
        </Card>
         })}</div>
    }





       const handleCheckW=(e)=>{
            const value = e.target.value
         console.log(value);
         console.log(e.target.checked);
         if(e.target.checked){
            setUpdateWeeklyTask(prev=>([...prev,value]))
         }else{
            setUpdateWeeklyTask(prev=>prev.filter(item=>item!==value))
         }
         console.log(updateWeeklyTask)    
    }


    const renderTaskW=()=>{
       return <div> {data?.weeklyTask?.map(e=>{
            return <Card  elevation={7} style={{padding:20,fontWeight:"bolder",margin:10,}}>
        <input type="checkbox"  value={e} onChange={handleCheckW}></input>
        <label > {e} </label>
        </Card>
         })}</div>
    }


    return <div style={{display:"flex"}}>
        <div style={{height:370,width:"50%",overflow:"auto"}}>
            <h3 style={{marginLeft:12,fontWeight:"bolder"}}>Daily Tasks</h3>
       
        {addTaskDaily && inputTaskDaily() }
        {renderAddDaily && ButtonAddDaily() }
        {!renderAddDaily &&  <Button variant="contained" style={{background:"grey",marginLeft:10}} onClick={()=>{
            setAddTaskDaily(true)
            setRenderAddDaily(true)
         }}>add task</Button>}
         <Button variant="contained" style={{background:"grey",marginLeft:10,marginTop:5}} onClick={async()=>{
            if(updateDailyTask[0]){
            
            const response= await fetch(`${baseURL}/task/updateDaily`, {
                   method: "PUT",
                   headers: {
                    "token":localStorage.getItem("token"),
                    "id":localStorage.getItem("id"),
                   "Content-Type": "application/json"
                   },
                   body: JSON.stringify(updateDailyTask)
                   })
                   console.log(response.json());
                   location.reload()
                   
         }else{location.reload()}}}>Refresh/Update</Button>
         {renderTaskD()}

        </div>





        <div style={{height:370,width:"50%",overflow:"auto"}}>
            <h3 style={{marginLeft:12,fontWeight:"bolder"}}>Weekly Tasks</h3>
        
         {addTaskWeekly && inputTaskWeekly() }
        {renderAddWeekly && ButtonAddWeekly() }
        {!renderAddWeekly &&  <Button variant="contained" style={{background:"grey",marginLeft:10}} onClick={()=>{
            setAddTaskWeekly(true)
            setRenderAddWeekly(true)
         }}>add task</Button> }
         <Button variant="contained" style={{background:"grey",marginLeft:10,marginTop:5}} onClick={async()=>{
            if(updateWeeklyTask[0]){
            
            const response= await fetch(`${baseURL}/task/updateWeekly`, {
                   method: "PUT",
                   headers: {
                    "token":localStorage.getItem("token"),
                    "id":localStorage.getItem("id"),
                   "Content-Type": "application/json"
                   },
                   body: JSON.stringify(updateWeeklyTask)
                   })
                   console.log(response.json());
                   location.reload()
                   
         }else{location.reload()}}}>Refresh/Update</Button>
         {renderTaskW()}


        </div>





    </div>
}
export default Tasks