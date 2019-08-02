import React, {useState, useEffect} from 'react'
// import Stopwatch from '../../controller/stopwatch'
import ProductList from './product-list';

const OrderCard = ({ order }) => {
  const productsArr = order.products
  const [active, setActive] = useState(true)
  const [timer, setTimer] = useState(0)

  useEffect(()=>{
    let interval = null;
    if(active){
      interval = setInterval(()=>{
        setTimer(timer+1)
      }, 1000)
    }
    return ()=>clearInterval(interval)
  }, [active, timer])
  
  return (
    <div className="col-sm-6 mt-3">
      <div className="card" >
        <div className="card-header d-flex justify-content-between align-items-center">
          <div className="d-flex">
            <div className="border-card-right pr-2">{order._id}</div>
            <div className="pl-2">{order.client}</div>
          </div>
          <div>{Math.floor(timer/60)}:{timer%60}</div>
          {/* <Stopwatch now={active} /> */}
        </div>
        <div className="card-body">
          <ul className="list-group">
            {productsArr.map((el) => (
              <ProductList el={el} key={el.product.productId}/>
            ))}
          </ul>
        </div>
        <div className="input-group card-footer">
          <select class="custom-select" id="inputGroupSelect02">
            <option selected value="pending">Pending</option>
            <option value="canceled">Canceled</option>
            <option value="delivering">Delivering</option>
            <option value="delivered">Delivered</option>
          </select>
          <div class="input-group-append">
            <label class="input-group-text" for="inputGroupSelect02">Status</label>
          </div>
          {/* <button onClick={() => setActive(false)} className="btn card-footer-btn w-100">Done</button> */}
        </div>
      </div>
    </div>
  )
}

export default OrderCard