require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/userSchema')
const { default: axios } = require('axios')
const env = process.env
const jwt_key = env.JWT_Key
const api_url = env.API_Key
const music_url = env.MUSIC_URL
const ch = require('cheerio')
const he = require('he')

// sign up
const SignUp = async (req, res)=>{
    try{
        
        const {username, email, password} = req.body;
        console.log(username,email,password);
        
        if (!username || !email || !password) {
            return res.status(400).json({message: 'Please enter all credential'})
        }

        if (await User.findOne({email})){
            return res.status(400).json({message: 'User already exists'})
        }

        const hashedpass = await bcrypt.hash(password, 10);
        const user = new User({username, email, password: hashedpass})
        await user.save();

        res.status(201).json({message: 'User created succesfully'})
    }
    catch (error) {
        res.status(500).json({message: error})
    }
}

// login
const LogIn = async (req,res) =>{
    try {
        const {email, password} = req.body;
        console.log(email,password);
        
        if (!email || !password) {
            res.status(400).json({message: 'Enter both credentials'})
        }

        const user = await User.findOne({email})

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({message: 'Wrong credentials'})
        }

        const token = jwt.sign({email},jwt_key)
        res.json({token})
    }
    catch (error) {
        res.status(500).json({message: error})
    }
}

// fetching realtime data from different pages
const Data_fetching = async(req,res) =>{
    const pages= ['new-releases','charts','featured-playlists','top-artists']
    let full_data = {}
    let new_release_songs=[]
    let new_release_albums=[]
    let new_release_song_dict={}
    let new_release_album_dict={}

    let top_chart_album_dict={}

    let top_playlist_album_dict={}

    let top_artist_dict={}
    
    try{
        const pagePromise = pages.map(async(page)=>{
            
            console.log(`fetching data from ${page}`);            
            let {data} = await axios.get(`${music_url}/${page}`)
            let $ = ch.load(data)
            const albums =[]
            $('.o-block__link').each((index,element)=>{
                let album= $(element).attr('href')
                albums.push(album)
            })
            // fetching from new-release page
            if(page=="new-releases"){
                new_release_songs= albums.filter(song=>song.startsWith('/song/'))
                new_release_albums= albums.filter(album=>album.startsWith('/album/'))

                const songPromise = new_release_songs.map(async (element) =>{
                    const {id,name,downlaod_url,img_url}= await song_detail(element)
                    new_release_song_dict[id[0]]=[name,img_url,downlaod_url]
                })
                
                const albumPromise = new_release_albums.map(async (element)=>{
                    const{ids,name,img_url}= await album_detail(element)
                    new_release_album_dict[ids]=[name,img_url]
                })

                await Promise.all([...songPromise,...albumPromise])                
            }

            // fetching from charts page
            else if(page=="charts"){
                const albumPromise = albums.map(async (element)=>{
                    const{ids,name,img_url} = await playlist_detail(element)                    
                    top_chart_album_dict[ids]=[name,img_url]
                })  

                await Promise.all(albumPromise)
            }

            // fetching from featured playlist page
            else if(page=="featured-playlists"){
                const albumPromise = albums.map(async (element)=>{
                    const{ids,name,img_url} = await playlist_detail(element)
                    top_playlist_album_dict[ids]=[name,img_url]
                })  

                await Promise.all(albumPromise)
            }

            // fetching from top artist page
            else{
                const artistPromise = albums.map(async (element)=>{
                    const {ids,name,img_url}= await artist_detail(element)
                    top_artist_dict[ids]=[name,img_url]
                })
                await Promise.all(artistPromise)
            }

            data= ''
            $ =''
        })
        await Promise.all(pagePromise)

        res.send({new_release_song_dict,new_release_album_dict,top_chart_album_dict,top_playlist_album_dict,top_artist_dict})
    }
    catch (error){
        console.log(error);
    }
}

async function song_detail(url) {
    try{
        const details = await axios.get(`${api_url}/api/songs?link=${music_url}${url}`)                
        const img_url =details.data.data[0].image[2].url
        const id= details.data.data.map(id => id.id)        
        const downlaod_url = details.data.data[0].downloadUrl[4].url
        let name = details.data.data.map(name => name.name)
        name = he.decode(name[0])        
        return({id,name,downlaod_url,img_url})
    }
    catch(error){
        console.log(error);
    }
}

async function album_detail(url) {
    try{
        const details = await axios.get(`${api_url}/api/albums?link=${music_url}${url}`)
        const img_url = details.data.data.image[2].url   
        const ids= details.data.data.id
        const name = details.data.data.name        
        return({ids,name,img_url})
    }
    catch(error){
        console.log(error);
    }
}

async function playlist_detail(url) {
    try{
        const details = await axios.get(`${api_url}/api/playlists?link=${music_url}${url}`)   
        const img_url = details.data.data.image[2].url        
        const ids= details.data.data.id
        const name = details.data.data.name                
        return({ids,name,img_url})
    }
    catch(error){
        console.log(error);
    }
}

async function artist_detail(url) {
    try{
        const details = await axios.get(`${api_url}/api/artists?link=${music_url}${url}`)        
        const img_url = details.data.data.image[2].url  
        const ids= details.data.data.id
        const name = details.data.data.name                
        return({ids,name,img_url})
    }
    catch(error){
        console.log(error);
    }
}

const Albums = async (req,res)=>{
    const {id, type}= req.query
    let details={}
    // console.log(id,type);
    try{
        if(type=="album"){
            details = await axios.get(`${api_url}/api/albums?id=${id}`)
        }else{
            details = await axios.get(`${api_url}/api/playlists?id=${id}`)
        }
        const songs = details.data.data.songs        
        res.send(songs);
        
    }
    catch(error){
        console.log(error)
        
    }
}

module.exports={SignUp,LogIn,Data_fetching,Albums}