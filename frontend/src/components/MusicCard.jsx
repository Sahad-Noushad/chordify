import React from 'react'

export default function MusicCard(data) {
  
  if(!data.details){
    return <p>Loading...</p>
  }
  // console.log(data);
  

  const music = (data) =>{
    // console.log(data[0]);
    const encdata = encodeURIComponent(JSON.stringify(data))
    if(data[0]=="song"){
      window.location.href=`/music?data=${encdata}`
    }else{
      window.location.href=`/album?data=${encdata}`
    }
  }

  return (
    <div className='musicCard' onClick={()=>music(data.details)} id={data.details[1]}>
      <div className="image">
        <img src={data.details[2][1]} alt="" />
      </div>
      <div className="name">
        <h4>{data.details[2][0]}</h4>
      </div>
    </div>
  )
}
