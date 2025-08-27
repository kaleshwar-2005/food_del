import React from 'react'
import './Order.css'
import { useState } from 'react'

import { toast } from 'react-toastify'
import { useEffect } from 'react'

import axios from "axios"

import {assets} from '../../assets/assets'

const Order = ({ url }) => {
  const [orders, setOrders] = useState([])

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + "/api/order/list");
      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error("Error");
      }
    } catch (e) {
      toast.error("Failed to load orders");
    }
  }

  const statusHandler =async (event,orderId)=>{
    try {
      const response=await axios.post(url+"/api/order/status",{
        orderId,
        status:event.target.value
      })
      if(response.data.success){
        await fetchAllOrders()
      }
    } catch (e) {
      toast.error("Failed to update status");
    }
  }
  useEffect(() => {
    fetchAllOrders();
  }, [])
  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.length === 0 ? <p>No orders yet.</p> : orders.map((eachOrder) => (
          <div key={eachOrder._id} className='order-item'>
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className='order-item-food'>
                {eachOrder.items.map((item,index)=>{
                  if(index === eachOrder.items.length-1){
                    return item.name + " X " +item.quantity;
                  }
                  else{
                    return item.name + " X "+item.quantity+","
                  }
                })}
              </p>
              <p className='order-item-name'>{eachOrder.address.firstName+" "+eachOrder.address.lastName}</p>
              <div className="order-item-address">
                <p>{eachOrder.address.street+","}</p>
                <p>{eachOrder.address.city+", "+eachOrder.address.state+", "+eachOrder.address.country+", "+eachOrder.address.zipcode}</p>
              </div>
              <p className='order-item-phone'>{eachOrder.address.phone}</p>
            </div>
            <p >Items : {eachOrder.items.length}</p>
            <p>${eachOrder.amount}</p>
            <select onChange={(event) => statusHandler(event,eachOrder._id)} value={eachOrder.status}>
              <option value="Food processing">Food processing</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Order
