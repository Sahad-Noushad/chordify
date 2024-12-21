import React from 'react'
import load from '../assets/images/loading.gif'

export default function Loading() {
  return (
    <div className='loading' style={{position:"absolute",top:"20%",left:"40%",display:"flex",flexDirection:"column",alignItems:"center"}}>
        <img src={load} alt="" style={{borderRadius:"10px",width:"250px"}}/>
        <p>Loading...</p>
    </div>
  )
}
