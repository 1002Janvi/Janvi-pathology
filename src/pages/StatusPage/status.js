// import React,{useState,useEffect} from 'react'
// import { MdOutlineDescription } from "react-icons/md";
// import { MdUpdate } from "react-icons/md";
// import { MdDelete } from "react-icons/md";
// import './status.css'
// import Modal from '../../commonComponent/Modal/modal';
// import {Link} from 'react-router-dom';
// const Status = () =>{
//     const pendingData=[
//         {
//             "id":"1",
//             "name":"Kamlesh",
//             "drname":"Sanjay Kr Singh",
//             "presData":"08-06-24",

//         },{
//             "id":"2",
//             "name":"Sarvesh",
//             "drname":"Rajeev Singh",
//             "presData":"18-12-23",

//         },
//     ]
//     const CompletedData=[
//         {
//             "id":"1",
//             "name":"Rahul",
//             "drname":"Sanjay Kr Singh",
//             "presData":"08-06-24",

//         },{
//             "id":"2",
//             "name":"Harsh",
//             "drname":"Rajeev Singh",
//             "presData":"18-12-23",

//         },
//     ]

//     const [activeBar,setactiveBar] = useState("Pending");
//     const [data, setdata] = useState([]);
//     const [clickUpdate, setclickUpdate] = useState(false);
//     const [clickPat, setclickPat] = useState(null);
//     useEffect(()=>{
//         if(activeBar === "Pending"){
//             setdata(pendingData)
//         }
//         else{
//             setdata(CompletedData)
//         }
//     },[activeBar]);
//     const updateIcon=(item)=>{
//         setclickUpdate(true);
//         setclickPat(item);
//     }
//   return (
//     <div className='statusPage'>
//         <div className='statusPageWorkDiv'>
//             <div className='statusBar'>
//                 <div className={`statusTitle ${activeBar === 'Pending' ? "activeBarStatus":null}`} onClick={()=>{setactiveBar("Pending")}}>
//                     Pending
//                 </div>
//                 <div className={`statusTitle ${activeBar === 'Completed' ? "activeBarStatus":null}`} onClick={()=>{setactiveBar("Completed")}}>
//                     Completed
//                 </div>
//             </div>
//             <div className='statusList'>
//                 {
//                     data && data.map((item,index) => {
//                         return(
//                             <div className='statusRow'>
//                     <div className='statusName'>
//                         {item.name}
//                     </div>
//                     <div className='statusDr'>
//                         <div className='statusDrName'>
//                             {item.drname}
//                         </div>
//                         <div className='statusDrName'>
//                             {item.presData}
//                         </div>
//                     </div>
//                     <div className='statusbtn'>
//                         {
//                             activeBar==="Pending"?<div className='icons' style={{backgroundColor:"yellowgreen"}} onClick={()=>{
//                                 updateIcon(item)
//                             }}><MdUpdate /></div> :null
//                         }
//                     {
//                         activeBar==="Pending"?<div className='icons' style={{backgroundColor:"red"}}><MdDelete /></div>:null
//                     }
                         
//                         <Link to={`/report/${item.id}`} className='icons'><MdOutlineDescription /></Link> 
//                     </div>
//                     </div>
                    
//                         );
//                     })
//                 }
                

//                 {/* <div className='statusRow'>
//                     <div className='statusName'>
//                         A.K. Singhal
//                     </div>
//                     <div className='statusDr'>
//                         <div className='statusDrName'>
//                             Dr Piyush Aggarwal
//                         </div>
//                         <div className='statusDrName'>
//                             09-08-22
//                         </div>
//                     </div>
//                     <div className='statusbtn'>
//                         <div className='icons' style={{backgroundColor:"yellowgreen"}}><MdUpdate /></div> 
//                          <div className='icons' style={{backgroundColor:"red"}}><MdDelete /></div>
//                         <div className='icons'><MdOutlineDescription /></div> 
//                     </div>
//                 </div> */}
//             </div>
//         </div>
//         {
//                     clickUpdate && <Modal item={clickPat} setOpenCreate={setclickUpdate}/>
//                 }
//     </div>
//   )
// }

// export default Status

import React, { useState, useEffect } from 'react'
import './status.css'
// import UpdateIcon from '@mui/icons-material/Update';
// import DeleteIcon from '@mui/icons-material/Delete';
// import ArticleIcon from '@mui/icons-material/Article';
import { MdOutlineDescription } from "react-icons/md";
import { MdUpdate } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import Modal from '../../commonComponent/Modal/modal';
import noDataImg from '../../assets/noData.jpg';
import {Link} from 'react-router-dom';
import axios from 'axios';
const Status = () => {
  


  const [activeBar, setActiveBar] = useState("Pending")
  const [data, setData] = useState([]);
  const [clickedUpdate, setClickedUpdate] = useState(false)
  const [clickedPatient,setClickedpat]= useState(null);
  useEffect(() => {
    fetchPatient();
  }, [activeBar]);

  const fetchPatient =async()=>{
    await axios.get(`http://localhost:8000/patient/getStatus/${activeBar}`).then(res=>{
      setData(res.data.data);
      console.log(res.data.data)
    }).catch(err=>{
      console.log(err);
    })
  }
  const updateIconClick=(item)=>{
    setClickedUpdate(true)
    setClickedpat(item);
  }
  const deletePatient =async(id)=>{
    await axios.delete(`http://localhost:8000/patient/${id}`).then(resp=>{
      window.location.reload();
    }).catch(err=>{
      console.log(err);
    })
  }
  return (
    <div className="statusPage">
      <div className="statusPageWorkDiv">
        <div className="statusBar">
          <div className={`statusTitle ${activeBar === 'Pending' ? "activeBarStatus" : null}`} onClick={() => { setActiveBar("Pending") }}>Pending</div>
          <div className={`statusTitle ${activeBar === 'Completed' ? "activeBarStatus" : null}`} onClick={() => { setActiveBar("Completed") }}>Completed</div>
        </div>
        <div className="statusList">
          {
            data && data.map((item, index) => {
              return (
                <div className="statusRowList">
                  <div className="statusName">
                    {item?.name}
                  </div>
                  <div className="statusDrDetails">
                    <div className="statusDrName">{item?.examinedBy}</div>
                    <div className="statusDrName">{item?.reportDate}</div>
                  </div>
                  <div className="statusBtns">
                    {
                      activeBar==="Pending"?<div className="icons" style={{ backgroundColor: "yellowgreen" }} onClick={() => { updateIconClick(item) }}><MdUpdate /></div>:null
                    }
                    
                    {
                      activeBar==="Pending"?<div className="icons" style={{ backgroundColor: "red" }} onClick={()=>deletePatient(item._id)}><MdDelete /></div>:null
                    }
                    <Link to={activeBar==="Completed"?`/prescition/${item._id}`:`/report/${item._id}`} className="icons" ><MdOutlineDescription /></Link>
                  </div>
                </div>
              );
            })
          }
          {
            data.length===0 && <div style={{display:"flex",justifyContent:"center",alignItems:"center",width:"100%"}}>
              <img width={350} src={noDataImg} />
            </div>
          }


        </div>
      </div>
      {
        clickedUpdate && <Modal item={clickedPatient}  setOpenCreate={setClickedUpdate}/>
      }
    </div>
  )
}

export default Status