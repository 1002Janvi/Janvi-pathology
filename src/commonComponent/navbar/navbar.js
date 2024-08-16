
// const Navbar = () => {

//   const [openCreate, setOpenCreate] = useState(false);
//   const [clickAddtest, setclickAddtest]= useState(false); 
//   const [input,setinput] = useState({"name":"","description":"","price":"","imgLink":"","fasting":"","abnormalRange":"","normalRange":""});
//   const ref = useRef();
//   useEffect(()=>{
//     const checkclickout = (e)=>{
//       if(clickAddtest && ref.current && !ref.current.contains(e.target)){
//         setclickAddtest(false);
//       }
//     }
//     document.addEventListener("mousedown", checkclickout);
//     return()=>{
//       document.removeEventListener("mousedown",checkclickout);
//     }
//   },[clickAddtest]);
//   // useEffect(() => {
//   //   const checkclickout = (e) => {
//   //     if (clickAddtest && ref.current && !ref.current.contains(e.target)) {
//   //       setclickAddtest(false);
//   //     }
//   //   };
//   //   document.addEventListener("mousedown", checkclickout);
//   //   return () => {
//   //     document.removeEventListener("mousedown", checkclickout);
//   //   };
//   // }, [clickAddtest]);
  
//   const handleInputs = (event)=>{
//     setinput({...input,[event.target.name]:event.target.value});
//  }
//  const onclickCreate =async()=>{
//   await axios.post("http://localhost:8000/test/post",input).then(res=>{
    
//   }).catch(err=>{

//   })
//  }
//    return (
//     <div className="navbar bg-black">
//       <Link to={'/'} className="leftnav">
//         <img src={imglogo} className="logoNav"alt="logo"/>
//       </Link >
//       <div className="rightnav">
//       <div className='linkrightNav' onClick={()=>{
//           setOpenCreate(prev=>!prev)
//         }}>
//               Create New
//             </div>
//         <Link to='/Status' className="linkrightNav">Report</Link>
//         <div className="linkrightNav">
//           <div className='navlinkaddtest' onClick={()=>{setclickAddtest(true)}} >Add Test</div>
//         {
//           clickAddtest && <div className='addtest-modal' ref={ref}>
          
//           <div className='input-addtest'>
//             <div className='input-label'>Name</div>
//             <input type='test' name='name' value={input.name} onChange={(e)=>{handleInputs(e)}} className='modal-input-fld'/>
//           </div>
//           <div className='input-addtest'>
//             <div className='input-label'>Description</div>
//             <input type='test' name='description' value={input.description} onChange={(e)=>{handleInputs(e)}}  className='modal-input-fld'/>
//           </div>
//           <div className='input-addtest'>
//             <div className='input-label'>Price</div>
//             <input type='test' name='price' value={input.price} onChange={(e)=>{handleInputs(e)}}  className='modal-input-fld'/>
//           </div>
//           <div className='input-addtest'>
//             <div className='input-label'>Image Link</div>
//             <input type='test' name='imgLink' value={input.imgLink} onChange={(e)=>{handleInputs(e)}}  className='modal-input-fld'/>
//           </div>
//           <div className='input-addtest'>
//             <div className='input-label'>Fasting</div>
//             <input type='test' name='fasting' value={input.fasting} onChange={(e)=>{handleInputs(e)}}  className='modal-input-fld'/>
//           </div>
//           <div className='input-addtest'>
//             <div className='input-label'>Normal Range</div>
//             <input type='test' name='normalRange' value={input.normalRange} onChange={(e)=>{handleInputs(e)}}  className='modal-input-fld'/>
//           </div>
//           <div className='input-addtest'>
//             <div className='input-label'>Abnormal Range</div>
//             <input type='test' name='abnormalRange' value={input.abnormalRange} onChange={(e)=>{handleInputs(e)}}  className='modal-input-fld'/>
//           </div>
//           <div className='create-addtest' onClick={onclickCreate}>Create</div>
//         </div>
//         }
//       </div>
//       </div>
//       {
//         openCreate && <Modal setOpenCreate={setOpenCreate}/>
//       }
//     </div>
//   )
// }

// export default Navbar
// import React,{useState,useEffect,useRef} from 'react'
// import imglogo from '../../assets/logo.jpg'
// import Modal from '../Modal/modal'
// import './navbar.css'
// import {Link} from 'react-router-dom';
// import axios from 'axios';

import React,{useState,useEffect,useRef} from 'react';
import './navbar.css';
import imgLogo from '../../assets/logo.jpg';
import Modal from '../Modal/modal';
import { Link } from 'react-router-dom';
import axios from 'axios';
const Navbar = () => {

  const [openCreate,setOpenCreate] = useState(false);
  const [clickAddTest,setClickAddTest] = useState(false);
  const [input,setInput]=useState({"name":"","description":"","price":"","imgLink":"","fasting":"","abnormalRange":"","normalRange":""});
  
  const ref = useRef();
  useEffect(()=>{
    const checkIfClickedOutside = (e)=>{
      if(clickAddTest && ref.current && !ref.current.contains(e.target)){
        setClickAddTest(false);
      }
    }
    document.addEventListener("mousedown",checkIfClickedOutside);
    return()=>{
      document.removeEventListener("mousedown",checkIfClickedOutside);
    }
  },[clickAddTest])

  const handleInput =(event)=>{
    setInput({...input,[event.target.name]:event.target.value})
  }
  const onClickCreate =async()=>{
    await axios.post("http://localhost:8000/test/post",input).then(res=>{
      
      window.location.reload();
    }).catch(err=>{
      console.log(err)
    })
  }
  return (
    <div className="navbar">
      <Link to={'/'} className="leftSideNabvar">
        <img src={imgLogo} className='imgLogoNavbar' alt='logo'/>
      </Link>
      <div className="rightSideNavbar">
          <div className="linksRightNavbar" onClick={()=>{setOpenCreate(prev=>!prev)}}>
            Create New
          </div>
          <Link to='/status' className="linksRightNavbar">
            Report
          </Link>
          <div className="linksRightNavbar">
            <div className="navLinkAddtest" onClick={()=>{setClickAddTest(true)}}>
              Add Test
            </div>
            {
              clickAddTest && <div className="addtest-modal" ref={ref}>
              <div className="input-addtest-modal">
                <div className="inputAddtestLabel">Name</div>
                <input name='name' value={input.name} onChange={(e)=>{handleInput(e)}} className='modal-input-fld' type='text' />
              </div>
              <div className="input-addtest-modal">
                <div className="inputAddtestLabel">Description</div>
                <input name='description' value={input.description} onChange={(e)=>{handleInput(e)}} className='modal-input-fld' type='text' />
              </div>
              <div className="input-addtest-modal">
                <div className="inputAddtestLabel">Price</div>
                <input name='price' value={input.price} onChange={(e)=>{handleInput(e)}} className='modal-input-fld' type='text' />
              </div>
              <div className="input-addtest-modal">
                <div className="inputAddtestLabel">Image Link</div>
                <input name='imgLink' value={input.imgLink} onChange={(e)=>{handleInput(e)}} className='modal-input-fld' type='text' />
              </div>
              <div className="input-addtest-modal">
                <div className="inputAddtestLabel">Fasting</div>
                <input name='fasting' value={input.fasting} onChange={(e)=>{handleInput(e)}} className='modal-input-fld' type='text' />
              </div>
              <div className="input-addtest-modal">
                <div className="inputAddtestLabel">Normal Range</div>
                <input name='normalRange' value={input.normalRange} onChange={(e)=>{handleInput(e)}} className='modal-input-fld' type='text' />
              </div>
              <div className="input-addtest-modal">
                <div className="inputAddtestLabel">Abnormal Range</div>
                <input name='abnormalRange' value={input.abnormalRange} onChange={(e)=>{handleInput(e)}} className='modal-input-fld' type='text' />
              </div>
              <div className="create-addtest" onClick={onClickCreate}>Create</div>
            </div>
            }


          </div>
      </div>
      {
        openCreate && <Modal setOpenCreate={setOpenCreate}/>
      }
    </div>
  )
}

export default Navbar

