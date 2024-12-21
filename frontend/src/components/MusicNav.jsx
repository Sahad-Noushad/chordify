import React from 'react'
import MusicCard from './MusicCard'
import {FaPause, FaBackward, FaForward, FaXmark , FaPlay} from 'react-icons/fa6'

export default function MusicNav() {
    const clear = () =>{
        document.getElementById('musicNav').style.display="none";
    }

  return (
    <div className='musicNav' id='musicNav'>
      <div className="musicDetails">
        <MusicCard/>
      </div>
      <div className="controler">
        <FaBackward className='icon'/>
        <FaPlay className='icon'/>
        <FaForward className='icon'/>
        <FaXmark className='icon' onClick={clear}/>
      </div>
    </div>
  )
}
