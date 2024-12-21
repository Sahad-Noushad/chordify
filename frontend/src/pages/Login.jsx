import React, {useState} from 'react'
import music from '../assets/images/login.gif'
import '../assets/style/main.css'
import axios from 'axios'

export default function Login() {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [error, setError] = useState(''); 
  const [token, setToken] = useState('');

  const transition = () =>{
    var form = document.getElementById('form');
    var image = document.getElementById('image');
    form.classList.add('hidden');
    image.classList.add('loginmove')
    setTimeout(() => {
      image.classList.add('hidden');
    }, 250);
    setTimeout(() => {
      window.location.href = '/signup';
    }, 700);
  }

  const handleSubmit = async (e) => { 
    e.preventDefault(); 
    try { 
      
      const response = await axios.post('http://localhost:3000/login', { email, password }); 
      setToken(response.data.token);
      window.location.href="/" 
      setError(''); 
      // Handle successful login here (e.g., redirect to a protected route) 
    } 
    catch (err) { 
      setError(err.response ? err.response.data.message : 'Error logging in'); 
    } 
  };

  return (
    <div className='login'>
      <div className="loginform" >
        <div className="image" id='image'>
            <img src={music} alt="" />
        </div>
        <div className="form" id='form'>
            <form action="" onSubmit={handleSubmit}>
                <input type="text" name="email" id="email" value={email} placeholder='Email' onChange={(e) => setEmail(e.target.value)} required/>
                <input type="password" name="pass" id="pass" value={password} placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
                <button type="submit">Login</button>
                {error && <p className="error-message">{error}</p>} 
                {token && <p className="success-message">Login successful! Token: {token}</p>}
                <p style={{cursor:"default"}}>New user ? <a onClick={transition}>Sign up</a></p>
            </form>
        </div>
      </div>
    </div>
  )
}
