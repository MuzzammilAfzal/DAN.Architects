import { Card } from "@mui/material"
import image from "/Users/muzzu/code/DAN Architects/scr/images/logo.jpg"



function Profile(){


    return <div style={{display:"flex",justifyContent:"center",background:"#D0D0D0",height:"100vh",width:"100vw"}}>
          <Card elevation={24} style={{display:"flex",height:500,width:600,margin:100}}>
            <div style={{display:"flex",justifyContent:"center"}}>
                <div>
                    <h2>Profile</h2>
                    <img src={image} alt="" style={{height:50,width:50}}/>
                </div>
                <Card>
                    <h4>Name:System
                    Age:30
                    Joined : 30 july 2021</h4>
                    
                </Card>
            </div>
            <div></div>
          </Card>
    </div>
}
export default Profile