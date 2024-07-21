import React, { useState } from 'react'
import { FaCheckCircle } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Tasklist = ({task,setTask,setactivity,setupdate,setedit}) => {

    
    const handleupdate=(id)=>{
        const finditem=task.find((ele)=> {
            return id===ele.id
        })
        setactivity(finditem.title)
        setupdate(false)
        setedit(id)

    }

    const handleremove=(id)=>{
        
        const filteritem=task.filter((e)=>(
           id !==e.id

        ))
        setTask(filteritem)
       
    }

    const handleall=()=>{

        setTask([])
        
    }

    const handlecomplete=(id)=>{

       setTask(task.map((comp)=>{
        if(comp.id==id){
           return{...comp,complete:!comp.complete};
        }
        return comp
      

       }))
        

    }

  
  return (
    <div>
        <ul>
            {
                task.map((e)=>(
                    <li className={`flex justify-between border-b-2 px-2 py-1 items-center ${e.complete?"line-through":""}` }
                    key={e.id}>
                <div className='flex gap-3 justify-center items-center '>
                    <span className='cursor-pointer'>
                    <FaCheckCircle size={18} onClick={()=>handlecomplete(e.id)}/>

                    </span>
                    <span >{e.title}</span>
                </div>
                <div className='flex gap-3 justify-center items-center'>
                    <span className='cursor-pointer'>
                    <FaEdit size={20} onClick={()=>handleupdate(e.id)}/>

                    </span>
                    <span className='cursor-pointer' onClick={()=>handleremove(e.id)}>
                    <MdDelete  size={20}/>

                    </span>
                   
                </div>
            </li>

                ))
            }
            
           
        </ul>
      {
        task.length>=1?(  <button className='border text-white bg-[red] py-2 px-3 rounded-md mt-5' onClick={handleall}>Remove  all</button>
        ):""
      }
    </div>
  )
}

export default Tasklist;
