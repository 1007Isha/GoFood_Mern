import React, { useState } from 'react'
import { Link } from 'react-router-dom';

export default function Signup() {

  const[cred, setcredentials ] = useState({ name: "", email: "", password: "", geolocation: "" })
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("https://gofood-mern-lbwi.onrender.com/api/createuser", {

      // credentials: 'include',a
      // Origin:"http://localhost:3000/login",
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({ name: cred.name, email: cred.email, password: cred.password, location: cred.geolocation })

    });
    const json=await response.json();
    console.log(json);
    if(!json.success){
      alert("Enter valid credentials")
    }
  }
  const onChange = (e) => {
    // setcredentials({...credentials,[event.target.name]:event.target.value})
    setcredentials({ ...cred, [e.target.name]: e.target.value })
  }

  return (
    <>
    <div style={{background:"TEAL" ,width:"100vw",height:"100vh"}}>
    <div className='container' style={{background:"rgbA(255, 219, 88,1)", border:'4px dotted white' ,borderTop:"0px", backgroundSize:"cover", width:"70vw",height:"70vh"}}>
        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
            <input type="text" className="form-control" name="name" value={cred.name} onChange={onChange} />

          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" onChange={onChange} name="email" value={cred.email} aria-describedby="emailHelp" />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" onChange={onChange} name='password' value={cred.password} />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label"> Address</label>
            <input type="text" className="form-control" onChange={onChange} name="geolocation" value={cred.geolocation} />

          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
          <Link to="/login" className='m-3 btn btn-danger0'>Already a user</Link>
        </form>

      </div>
    </div>
      

    </>
  )
}
