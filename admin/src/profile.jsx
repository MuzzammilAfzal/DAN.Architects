import { Card } from "@mui/material"




function Profile(){


    return <div style={{display:"flex",justifyContent:"center",background:"#D0D0D0",height:"100vh",width:"100vw"}}>
          <Card elevation={24} style={{display:"flex",height:500,width:600,margin:100}}>
            <div style={{display:"flex",justifyContent:"center"}}>
                <div>
                    <h2>Profile</h2>
                    
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