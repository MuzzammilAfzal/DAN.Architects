import { Card } from '@mui/material';
import Paper from '@mui/material/Paper';


function SideBar(){
    let User="Maintaince"
    return<>
    <div style={{display:'flex'}}>
        <div>
           <Paper elevation={24} style={{width:300,height:"100vh",padding:20}}>
             <Card elevation={6} style={{padding:10,textAlign:'center',fontWeight:'bold'}}>DashBoard</Card>
             <br></br>
             <Card elevation={6} style={{padding:10,textAlign:'center',fontWeight:'bold'}}>Profile</Card>
           </Paper>
        </div>
       <div style={{height:"auto",background:"grey",paddingLeft:50,paddingRight:50}}>
           <div >
             <h3 style={{textAlign:'center'}}>Announcements</h3>
             <Card elevation={24} style={{height:400,width:1000,overflowY:"scroll"}}>
                <Card elevation={6} style={{height:"auto",minWidth:865,padding:10,margin:20}}>
                    From : {User}<br/>
                    <p style={{fontWeight:"bold",fontSize:"large"}}>
                      Announcement From Maintaince
                      sefheuihgiorhoirsv
                      sdvknskuvsvbsvnisnv
                      sevljshnksevkusvkiuhaejbksejvkjwvkjwrnvkjwrvkjwrkjwenkjenvkjenfknfwrvn
                    </p>
                </Card>
             </Card>
           </div>
           <div >
             <h3 style={{textAlign:'center'}}>Upcoming Tasks</h3>
             <Card elevation={24} style={{height:400,width:1000}}></Card>
           </div>
           <div >
             <h3 style={{textAlign:'center'}}>Current Project Overview</h3>
             <Card elevation={24} style={{overflowY:'scroll',height:400,width:900,padding:50,display:'flex',flexWrap:"wrap"}}>
                <Card elevation={24} style={{height:250,width:150,padding:40,margin:20}}>
                    Project 1
                </Card>   
             </Card>
           </div>
           <div >
             <h3 style={{textAlign:'center'}}>Recent Activity</h3>
             <Card elevation={24} style={{height:400,width:1000}}></Card>
           </div>
       </div>
    </div>

    </>
}
export default SideBar