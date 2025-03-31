"use client";
import { useUser } from "@/hooks/useUser";
import { useEffect, useState } from "react";
import styles from "./UserPanel.module.css";
import { toast } from "react-toastify";

interface Order {
  extOrderId: string;
  status: string;
  total: number;
  createdAt: string;
}

export default function UserPanel() {
  const { user, logout } = useUser();
  const [orders, setOrders] = useState<Order[]>([]);

  // useEffect(() => {
  //   const fetchOrders = async () => {
  //     if (user?._id) {
  //       const res = await fetch(`/api/orders/user/${user._id}`);
  //       const data = await res.json();
  //       setOrders(data.orders);
  //     }
  //   };
  //   fetchOrders();
  // }, [user]);

  if (!user) return <p>Musisz być zalogowany</p>;

  const handleLogout = async () => {
    await logout();
    toast.info("Zostałeś wylogowany");
   
  };

  return (
    <div className={styles.panel}>
    <h2 className={styles.heading}>Witaj, {user.email}</h2>
    <button onClick={handleLogout} className={styles.logoutBtn}>
      Wyloguj się
    </button>

    <h3>Twoje zamówienia:</h3>
    {orders.length === 0 ? (
      <p>Brak zamówień</p>
    ) : (
      <ul className={styles.orders}>
        {orders.map((order) => (
          <li key={order.extOrderId} className={styles.orderItem}>
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Suma:</strong> {order.total} zł</p>
            <p><strong>Data:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    )}
  </div>
  );
}
