import React, { useState, useEffect, useRef } from 'react'
import { FaShuffle, FaBackward, FaPause, FaPlay, FaForward, FaBars } from 'react-icons/fa6'
import Lyrics from '../components/Lyrics'
import axios from 'axios'
import Nav from '../components/Nav'

export default function Playlist() {
  const [loading, setLoading] = useState(true)
  const [r_data,setData]= useState()
  const [currSong,setCount] = useState(0)
  let encodedata = new URLSearchParams(window.location.search).get('data')    
  let data = JSON.parse(decodeURIComponent(encodedata))
  console.log(data);
  
  
  useEffect(()=>{
    
    const fetchData = async () =>{
      try{
        const response = await axios.get(`http://localhost:3000/album`,{params:{id:data[1],type:data[0]}})
        setData(response.data)        
        setLoading(false);
      }
      catch(error){
        console.error(error);
        setLoading(false);
      }
    }
    fetchData();
  },[]);

  
  const [isActive, setIsActive] = useState(false);
    
    const update = () =>{     
          
        setInterval(timeupdate,.5)
    }
    
    const play = () =>{    
        const audio = document.getElementById('audio');
        audio.play();
    }
    
    const pause = () =>{
        const audio = document.getElementById('audio');
        audio.pause();
    }
    
    const fwd_bwd = (btn) =>{
        
        if(btn=="forward"){
          if (currSong<r_data.length) {
            setCount(currSong+1)
          }
        }else{
          if(currSong!=0){
            setCount(currSong-1)
          }
        }
        document.getElementById('audio').load()
        timeupdate()
        
    }

    const seekto = () =>{
        const audio = document.getElementById('audio');
        let seekslider = document.getElementById('trackseeker')
        let seektime = audio.duration * (seekslider.value/100);
        audio.currentTime = seektime
    }
    

    const timeupdate = () =>{
        let seekpostion= 0
        const audio = document.getElementById('audio');
        let seekslider = document.getElementById('trackseeker')
        let currentminute = document.getElementById('currenttime')
        let durationminute = document.getElementById('durationtime')

        if(!isNaN(audio.duration)){
            seekpostion = audio.currentTime * (100/audio.duration);
            seekslider.value=seekpostion;

            let currmin = Math.floor(audio.currentTime/60);
            let currsec = Math.floor(audio.currentTime - currmin * 60);
            let duratemin = Math.floor(audio.duration/60);
            let duratesec = Math.floor(audio.duration - duratemin * 60);

            if(currmin<10){currmin="0"+currmin}
            if(currsec<10){currsec="0"+currsec}
            if(duratemin<10){duratemin="0"+duratemin}
            if(duratesec<10){duratesec="0"+duratesec}

            let currtime = currmin + ":" + currsec
            let durtime = duratemin + ":" + duratesec
            currentminute.innerHTML = currtime
            durationminute.innerHTML = durtime
        }
    }

    if(loading){
      return <loading/>
    }
    // console.log(r_data);

    const image_url = r_data[currSong].image[2].url
    const name = r_data[currSong].name
    const audio_url = r_data[currSong].downloadUrl[4].url

    const changeSong = (id)=>{
      console.log(id);
      setCount(id)
      document.getElementById('audio').load()
    }

  return (
    <div className='playlist' onLoad={update}>
      <Nav/>
      <div className="playlistScreen">
      <div className="music">
        <div className="musicControl" >
            {/* <MusicCard/> */}
            <div className='musicCard'>
              <div className="image">
                <img src={image_url} alt="" />
              </div>
              <div className="name">
                <h4>{name}</h4>
              </div>
            </div>
            <div className="control">
                <audio id='audio'>
                    <source src={audio_url} type='audio/mp3'/>
                </audio>
                <div className="audioControl">
                    <div className="track">
                        <p id='currenttime' className='time'>00:00</p>
                        <input type="range" name="trackseeker" id="trackseeker" min="1" value="0" max="100" onChange={seekto}/>
                        <p id='durationtime' className='time'>00:00</p>
                    </div>
                    <div className="controlbutton">
                        <FaShuffle className='icon'/>
                        <FaBackward className='icon' onClick={()=>fwd_bwd('backward')}/>
                        <span id='playbutton'onClick={()=>setIsActive(!isActive)} style={{display:"flex"}}>
                            {isActive ? <FaPause onClick={pause} className='icon'/> : <FaPlay onClick={play} className='icon'/>}
                        </span>
                        <FaForward className='icon' onClick={()=>fwd_bwd('forward')}/>
                        <FaBars className='icon'/>
                    </div>
                </div>
            </div>
        </div>
        <div className="lyrics">
            <Lyrics/>
        </div>
      </div>
      <div className="list">
        <div className="plheading">
          <h3>{data[2][0]}</h3>
        </div>
        <ol id='list'>
          {Object.keys(r_data).map((song)=>(
            
            <li id={r_data[song].id} className={currSong == song?'curr-song' : ''} onClick={()=>{changeSong(song)}}>{r_data[song].name}</li>
            // console.log(r_data[song].name)
            
          ))}
          {/* <li>{r_data}</li> */}
        </ol>
      </div>
      </div>
    </div>
  )
}
