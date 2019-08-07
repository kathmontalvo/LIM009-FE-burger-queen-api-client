import React, { useState, useEffect } from 'react'
import ProductList from './product-list';
import putOrders from '../../controller/orders/status'
import deleteOrder from '../../controller/orders/delete';

const OrderCard = ({ order }) => {
  const fecha = new Date (order.dateEntry)
  const productsArr = order.products
  const [active, setActive] = useState(true)
  const [timer, setTimer] = useState((Date.now() - fecha.getTime()) / 1000)

  const changeStatus = (e) => {
    if (e.target.value === "delivering" || e.target.value === "delivered") {
      setActive(false);
      putOrders(order.client, order.products, localStorage.getItem('token'), order.userId, e.target.value, order._id)
        .then(console.log)
    } else if (e.target.value === "canceled") {
      deleteOrder(localStorage.getItem('token'), order._id)
        .then(console.log)
    } else if (e.target.value === "pending") {
      setActive(true);
      putOrders(order.client, order.products, localStorage.getItem('token'), order.userId, e.target.value, order._id)
        .then(console.log)
    }
  }

  useEffect(() => {
    let interval = null;

    if (order.status !== 'pending') {
      setActive(false)
    }
    if (active) {
      interval = setInterval(() => {
        setTimer(timer + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [active, timer])

  return (
    <div className="col-sm-6 mt-3">
      <div className="card" >
        <div className="card-header d-flex justify-content-between align-items-center">
          <div className="d-flex">
            <div data-testid="client-name" className="border-card-right pr-2">Cliente: {order.client}</div>
            {/* <div className="pl-2"></div> */}
          </div>
          <div>{Math.floor((timer).toFixed() / 60)}:{(timer).toFixed() % 60}</div>
        </div>
        <div className="card-body">
          <ul className="list-group">
            {productsArr.map((el) => (
              <ProductList el={el} key={el.product.productId} />
            ))}
          </ul>
        </div>
        <div className="input-group card-footer">
          <select onChange={changeStatus} value={order.status} className="custom-select" id="inputGroupSelect02">
            <option value="pending">Pending</option>
            <option value="canceled">Canceled</option>
            <option value="delivering">Delivering</option>
            <option value="delivered">Delivered</option>
          </select>
          <div className="input-group-append">
            <label className="input-group-text" htmlFor="inputGroupSelect02">Status</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderCard