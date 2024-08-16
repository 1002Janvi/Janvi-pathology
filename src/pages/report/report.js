// import React,{useState} from 'react'
// import './report.css'
// import {Link,useParams} from 'react-router-dom';
// const Report = () => {
//     const {id}=useParams();
//     const [inputfields, setinputfields] = useState([{"id":0, "name":"","range":"","unit":"","result":""}]);
//     const onchangeInput=(event,index)=>{
//         const updatedRow = inputfields.map(row=>{
//             if(row.id == index){
//                 return{...row,[event.target.name]:event.target.value}
//             }
//             return row;
//         })
//         setinputfields(updatedRow)
//     }
//     const addinputRow=()=>{
//         const newRow = {
//             id:inputfields.length+1,"name":"","range":"","unit":"","result":""
//         }
//         setinputfields([...inputfields,newRow])
//     }
//     const removeRow=()=>{
//         if(inputfields.length>1){
//             setinputfields(inputfields.slice(0,-1));//last wale object ko remove krdega
//         }
//     }
//   return (
//     <div className='report-page'>
//         <div className="reportDiv">
//             <div className='report-info'>
//                 <div className='report-i'>Name : Rahul</div>
//                 <div className='report-i'>Examined By : Sanjay Kumar</div>
//             </div>
//             <div className='report-inputBox'>
//                 <div className='report-tests'>
//                     <div className='nameoftest'>Urine Glucose Test</div>
//                 </div>
//                 <div className='input-rows'>                    
//                     {
//                         inputfields.map((item, index)=>{
//                             return (
//                                 <div className='inputrow'>
//                                 <div className='input-row-group'>
//                                     <div className='input-test-name'>Test name</div>
//                                     <input type='text' name='name' value={item.name} onChange={(e)=>{
//                                         onchangeInput(e,item.id)

//                                     }}
//                                     className='input-field-tests'/>
//                                 </div>
//                                 <div className='input-row-group'>
//                                     <div className='input-test-name'>Normal Range</div>
//                                     <input type='text' name='range' value={item.range} onChange={(e)=>{
//                                         onchangeInput(e,item.id)

//                                     }}className='input-field-tests'/>
//                                 </div>
//                                 <div className='input-row-group'>
//                                     <div className='input-test-name'>Unit</div>
//                                     <input type='text' name='unit' value={item.unit} onChange={(e)=>{
//                                         onchangeInput(e,item.id)

//                                     }}className='input-field-tests'/>
//                                 </div>
//                                 <div className='input-row-group'>
//                                     <div className='input-test-name'>Result</div>
//                                     <input type='text' name='result' value={item.result} onChange={(e)=>{
//                                         onchangeInput(e,item.id)

//                                     }} className='input-field-tests'/>
//                                 </div>      
//                                 </div>
//                                 );
//                             })    
//                         }

//                     <div className='btn-grp-add-rem'>
//                         <div className='add-btn-row' onClick={
//                             addinputRow
//                         }>Add</div>
//                         {
//                             inputfields.length > 1 ? <div className='add-btn-row' onClick={removeRow}>Remove</div> : null
//                         }
//                         <Link to = {`/pres/${id}`} className='add-btn-row'>Report</Link>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>
//   )
// }

// export default Report

import React, { useState,useEffect } from 'react'
import './report.css';
import { Link,useParams } from 'react-router-dom';
import axios from 'axios';
const Report = () => {
    const {id} = useParams();
    const [patientDetail,setpatientdetail] = useState(null);
    const [testData,setTestData] = useState(null);
    const [inputField, setInputField] = useState([{"id":0, "name": "", "range": "", "unit": "", "result": "" }]);
    useEffect(()=>{
        fetchdataOnLoading()
    },[])
    console.log(patientDetail)
    console.log(testData)
    const fetchdataOnLoading =async()=>{
        await axios.get(`http://localhost:8000/patient/${id}/testDetails`).then(response=>{
            console.log(response)
            const patData = response.data.patient;
            const testdata = response.data.test;
            setpatientdetail(patData);
            setTestData(testdata);
        }).catch(err=>{
            console.log(err)
        })
    }
    console.log(id)
    
    const onchangeInput=(event,index)=>{
        const updateRow = inputField.map(row=>{
            if(row.id==index){
                return {...row,[event.target.name]:event.target.value}
            }
            return row;
        })
        setInputField(updateRow)

    }
    const addinputRows = ()=>{
        const newRow ={
            id:inputField.length+1,"name": "", "range": "", "unit": "", "result": ""
        }
        setInputField([...inputField,newRow])
    }
    const removeRow =()=>{
        if(inputField.length>1){
            setInputField(inputField.slice(0,-1));
        }
    }
    const handleFinalSubmit =async()=>{
        await axios.put(`http://localhost:8000/patient/${patientDetail?._id}`, 
        {
            ...patientDetail,result:inputField,status:"Completed"
        }).then(resp => {
                console.log(resp)
            }).catch(err => {
                console.log(err)
            })
    }

    return (
        <div className='report-page'>
            <div className="reportDiv">
                <div className="report-infos">
                    <div className="report-info">Name : {patientDetail?.name}</div>
                    <div className="report-info">Examined By : {patientDetail?.examinedBy}</div>
                </div>
                <div className="report-inputBlock">
                    <div className="report-tests">
                        <div className="nameOfTest">{testData?.name}</div>
                    </div>
                    <div className="inputRows">
                        {
                            inputField.map((item, index) => {
                                return (
                                    <div className="inputRow">
                                        <div className="input-row-group">
                                            <div className="input-test-name">Test name</div>
                                            <input type='text' value={item.name} name='name' onChange={(e)=>{onchangeInput(e,item.id)}} className='input-feild-tests' />
                                        </div>
                                        <div className="input-row-group">
                                            <div className="input-test-name">Normal Range</div>
                                            <input type='text' value={item.range} name='range' onChange={(e)=>{onchangeInput(e,item.id)}} className='input-feild-tests' />
                                        </div>
                                        <div className="input-row-group">
                                            <div className="input-test-name">Unit</div>
                                            <input type='text' value={item.unit} name='unit' onChange={(e)=>{onchangeInput(e,item.id)}} className='input-feild-tests' />
                                        </div>
                                        <div className="input-row-group">
                                            <div className="input-test-name">Result</div>
                                            <input type='text' value={item.result} name='result' onChange={(e)=>{onchangeInput(e,item.id)}} className='input-feild-tests' />
                                        </div>
                                    </div>
                                );
                            })
                        }

                        <div className="btn-grp-add-rem">
                            <div className="add-btn-row" onClick={addinputRows}>
                                Add
                            </div>
                            {
                                inputField.length>1? <div className="add-btn-row" onClick={removeRow}>
                                Remove
                            </div>:null
                            }
                            <Link to={`/prescition/${id}`} className="add-btn-row" onClick={handleFinalSubmit}>
                                Report
                            </Link>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}
export default Report