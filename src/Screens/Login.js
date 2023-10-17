import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
export default function Login() {
  let navigate=useNavigate();
  const [cred, setcredentials] = useState({ email: "", password: "" })
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify({ email: cred.email, password: cred.password }))
    const response = await fetch("http://localhost:5000/api/loginuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({ email: cred.email, password: cred.password })

    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem("authToken",json.authToken);
      localStorage.setItem("userEmail",cred.email);
      console.log(localStorage.getItem("authToken"));
      navigate("/");
    }
  
    if (!json.success){
      alert("Enter valid credentials")
    }
  }
  const onChange = (e) => {

    setcredentials({ ...cred, [e.target.name]: e.target.value })
  }
  return (
    <div style={{background:"TEAL" ,width:"100vw",height:"100vh"}}>
       <div className='container'  style={{background:"rgbA(255, 219, 88,1)", border:'4px dotted white' ,borderTop:"0px", backgroundSize:"cover", width:"70vw",height:"70vh"}}>
      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" onChange={onChange} name="email" value={cred.email} aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" onChange={onChange} name='password' value={cred.password} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/createuser" className='m-3 btn btn-danger0'>I'm a new user</Link>
      </form>

    </div>
    </div>
   
  )
}
