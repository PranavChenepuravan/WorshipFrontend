import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'

const Nav = () => {

  const [drop,setDrop]=useState(false)

    let dropdown=()=>{
        setDrop(!drop)
        console.log(drop);
    }
  return (
    <>
    <div className='bg-red-950 flex  justify-between p-4 items-center m-auto'>
      <div className='text-neutral-200 text-[35px]'>WORSHIP SERVICE TRACKER</div>
      <div className='text-neutral-200 flex gap-5'>
      <div><button  onClick={dropdown}>
                  Register
                  </button>
                  {drop &&
                      <div className='list-none absolute right-[30px] sm:right-[18px] p-3 bg-slate-100 text-stone-950 sm:top-[60px] '>
                        <Link to='/reginst'><li>Institution</li></Link>
                        <Link to='/regincome'><li>Income Tax</li></Link> 
                        <Link to='/regarchae'><li>Archaeology</li></Link>
                        <Link to='/regpilgrim'><li>Pilgrim</li></Link>  
                        </div> 
                   }

       </div>
        {/* <Link to='/register'><div><h6>Register</h6></div></Link> */}
        <Link to='/login'>
        <div><h6>Login</h6></div></Link>
      </div>
    </div>
    <Outlet/>
    </>
    
  )
}
export default Nav
