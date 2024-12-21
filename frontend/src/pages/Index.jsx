import React,{useEffect,useState} from 'react'
import Nav from '../components/Nav'
import PlaylistShow from '../components/PlaylistShow'
import MusicNav from '../components/MusicNav'
import axios from 'axios'
import Loading from '../components/Loading'
export default function Index() {
  const [loading, setLoading] = useState(true)
  const [data,setData] = useState({
    new_release_song_dict:[],
    new_release_album_dict:[],
    top_chart_album_dict:[],
    top_playlist_album_dict:[],
    top_artist_dict:[]
  }) 

  useEffect(()=>{
    const fetchData = async () =>{
      try{
        const response = await axios.get('http://localhost:3000/')
        setData(response.data);
        setLoading(false);
      }
      catch(error){
        console.error(error);
        setLoading(false);
      }
    }
    fetchData();
  },[]);

  if(loading){
    return <Loading/>
  }

  return (
    <div className='index'>
      <Nav/>
      <div className="main">
        <PlaylistShow playlist="New Released Songs" details={[data.new_release_song_dict,'song']}/>
        <PlaylistShow playlist="New Released Albums" details={[data.new_release_album_dict,'album']}/>
        <PlaylistShow playlist="Top Charts" details={[data.top_chart_album_dict,'playlist']}/>
        <PlaylistShow playlist="Top Playlists" details={[data.top_playlist_album_dict,'playlist']}/>
        <PlaylistShow playlist="Top Artists" details={[data.top_artist_dict,'artist']}/>
      </div>
      <MusicNav/>
    </div>
  )
}
