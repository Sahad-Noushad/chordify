import React,{useState} from 'react'
import Nav from '../components/Nav'
import Lyrics from '../components/Lyrics'
import {FaShuffle,FaBackward,FaPlay,FaForward, FaBars, FaPause} from 'react-icons/fa6'


export default function MusicPlay() {
    let encodedata = new URLSearchParams(window.location.search).get('data')    
    let data = JSON.parse(decodeURIComponent(encodedata))

    const keys= Object.keys(data[3])        
    let index = keys.indexOf(data[1])
    
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
        console.log(keys,index);
        
        let nextKey =''
        if(btn=="forward"){
            nextKey = keys[index+1]
        }else{
            nextKey = keys[index-1]
        }
        // console.log(data[2][nextKey]);
        const nextdata = [data[0],nextKey,data[3][nextKey],data[3]]
        console.log(nextdata);
        
        const encdata = encodeURIComponent(JSON.stringify(nextdata))    
        window.location.href=`/music?data=${encdata}`
        
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

  return (
    <div className='musicPlayScreen' onLoad={update}>
      <Nav/>
      <div className="musicScreen">
        <div className="musicControl" >
            <div className='musicCard'>
              <div className="image">
                <img src={data[2][1]} alt="" />
              </div>
              <div className="name">
                <h4>{data[2][0]}</h4>
              </div>
            </div>
            <div className="control">
                <audio id='audio'>
                    <source src={data[2][2]} type='audio/mp3'/>
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
    </div>
  )
}
