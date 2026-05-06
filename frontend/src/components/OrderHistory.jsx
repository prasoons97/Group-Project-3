import { useEffect, useState } from "react"

export default function OrderHistory() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    fetch("http://localhost:3000/api/orders")
      .then(res => res.json())
      .then(data => {
  setOrders(data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)))
      })
  }, [])

  return (
    <div className="HistoryPage">
        <h1 style={{ textAlign: "center" }}>Order history</h1>
     <ul>
    {orders.map(order => (
      <li key={order.id} style={{ borderBottom: "1px solid #ddd", paddingBottom: "1rem", marginBottom: "1rem" }}>
        <b>Order {order.id}</b> — {order.price} kr
        <br />
        {order.items.map(item => (
          <span key={item.id} style={{ display: "block" }}>
            <img src={item.image} alt={item.name} width={50} />
            {item.name} x{item.qty}
          </span>
        ))}
        <br />
        <small>Order made:{new Date(order.createdAt).toLocaleString()}</small>
      </li>
    ))}
  </ul>
  </div>
  )
}
