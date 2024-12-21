import React,{useEffect, useState} from 'react'
import MusicCard from '../components/MusicCard'
import axios from 'axios'

export default function PlaylistShow(data) {
  
  if(!data.details[0]){
    return <p>Loading...</p>
  }
  // console.log(data.details);
  
  return (
    <div className="playlistShow">
        <h2>{data.playlist}</h2>
        <div className="cardShow" id='cardShow'>
          {Object.keys(data.details[0]).map((key)=>(
            <MusicCard details={[data.details[1],key,data.details[0][key],data.details[0]]}/>
          ))}
        </div>
    </div>
  )
}
