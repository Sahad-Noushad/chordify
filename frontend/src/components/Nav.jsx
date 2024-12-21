import React from 'react'
import {FaBars, FaMagnifyingGlass} from 'react-icons/fa6'

export default function Nav() {
    const transiton = () =>{
        window.location.href="/login";
    }

    const search = () =>{
        var search = document.getElementById('search')
        search.toggleAttribute("hidden");
    }

  return (
    <div className='nav'>
        <div className="left">
            <FaBars className='icon'/>
            <h3 onClick={()=>window.location.href='/'}>Chordify</h3>
        </div>
        <div className="right" id='right'>
            <input type="search" name="search" id="search" placeholder='Search...' hidden />
            <FaMagnifyingGlass id='icon' className='icon' onClick={search}/>
            <button onClick={transiton}>Login</button>
        </div>
    </div>
  )
}
