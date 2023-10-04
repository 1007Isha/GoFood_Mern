import React, { useState } from 'react'
import { Link } from 'react-router-dom';
export default function Login() {
  const [cred, setcredentials] = useState({ email: "", password: "" })

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/createuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({ email: cred.email, password: cred.password })

    });
    const json = await response.json();
    console.log(json);
    if (!json.success) {
      alert("Enter valid credentials")
    }
  }
  const onChange = (e) => {

    setcredentials({ ...cred, [e.target.name]: e.target.value })
  }
  return (
    <div className='container'>
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
  )
}
