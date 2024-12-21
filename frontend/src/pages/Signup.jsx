import React, {useState} from 'react'
import music from '../assets/images/signup.gif'
import axios from 'axios';

export default function Signup() {
  const [username, setUsername] = useState(''); 
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [cpassword, setCpassword] = useState(''); 
  const [message, setMessage] = useState(''); 
  
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      if(password === cpassword){
        const response = await axios.post('http://localhost:3000/signup', { username, email, password }); 
        setMessage(response.data.message); 
      }
      else{
        setMessage('Passwords do not match')
      }
    } 
    catch (err) 
    { 
      setMessage(err.response ? err.response.data.message : 'Error signing up'); 
    } 
  };

    const transition = () =>{
        var form = document.getElementById('form');
        var image = document.getElementById('image');
        form.classList.add('hidden');
        image.classList.add('signmove')
        setTimeout(() => {
          image.classList.add('hidden');
        }, 250);
        setTimeout(() => {
          window.location.href = '/login';
        }, 700);
    }

    const confirm = ()=>{    
      var cpass = document.getElementById('cpass')  
      
      if(cpass.value !== password){
        cpass.style.background="lightcoral"
      }else{
        cpass.style.background=""
        setCpassword(cpass.value)
      }
    }

  return (
    <div className='signup'>
      <div className="signupform">
        <div className="form" id='form'>
            <form action="" onSubmit={handleSubmit}>
                <input type="text" name="username" id="username" placeholder='Username' required value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="email" name="email" id="email" placeholder='Email' required value={email} onChange={(e) => setEmail(e.target.value)}/>
                <span className='pass'>
                    <input type="password" name="pass" id="pass" placeholder='Password' required value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <input type="password" name="cpass" id="cpass" placeholder='Confirm Password' required onChange={confirm}/>
                </span>
                {message && <p className="error-message">{message}</p>}
                <button type="submit">Signup</button>
                <p style={{cursor:"default"}}>Already have one ? <a onClick={transition}>Log in</a></p>
            </form>
        </div>
        <div className="image" id='image'>
            <img src={music} alt="" />
        </div>
      </div>
    </div>
  )
}
