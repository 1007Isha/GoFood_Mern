import React from 'react'
import { useCart,useDispatchCart } from '../Components/ContextReducer'
import trash from "../trash.svg"
export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();
  if (data.length === 0) {
    return (
      <div>
        <div className='m-5 w-100 text-center fs-3'  style={{ color: 'white' }}>The Cart is Empty!</div>
      </div>
    )
  }
  let totalPrice = data.reduce((total, food) => total + food.price, 0)

  const handleCheckOut =async()=>{
    let userEmail=localStorage.getItem("userEmail");
    let response= await fetch('https://gofood-mern-lbwi.onrender.com/api/orderData',{
      method:"POST",
      headers:{
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        order_data:data,
        email:userEmail,
        order_date:new Date().toDateString()
      })
    }
    );
    console.log("JSON RESPONSE:::::", response.status)
    if(response.status===200){
      dispatch({type:"DROP"})
    }
  }
  return (
    <div>

    {console.log(data)}
    <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md'  style={{ color: 'white' }}>
      <table className='table table-hover '>
        <thead className=' text-success fs-4'>
          <tr>
            <th scope='col' >#</th>
            <th scope='col' >Name</th>
            <th scope='col' >Quantity</th>
            <th scope='col' >Option</th>
            <th scope='col' >Amount</th>
            <th scope='col' ></th>
          </tr>
        </thead >
        <tbody  style={{ color: 'white' }}>
          {data.map((food, index) => (
            <tr>
              <th scope='row' >{index + 1}</th>
              <td >{food.name}</td>
              <td>{food.qty}</td>
              <td>{food.size}</td>
              <td>{food.price}</td>
              <td ><button type="button" className="btn p-0"><img src='data:image/jpeg;base64,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' style={{width:"30px",height:"30px",backgroundSize:"cover",position:"center"}} alt='delete' onClick={()=>{dispatch({type:"REMOVE" , index:index})}}/></button> </td></tr>))}
        </tbody>
      </table>
      <div><h1 className='fs-2'>Total Price: {totalPrice}/-</h1></div>
      <div>
        <button className='btn bg-success mt-5 ' onClick={handleCheckOut}> Check Out </button>
      </div>
    </div>



  </div>
  )
}
