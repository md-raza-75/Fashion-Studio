import React from "react";
import { useNavigate } from "react-router-dom";


const orders = [
  {
    id: "ORD12345",
    date: "2024-04-02",
    status: "Delivered",
    total: "$250.00",
    items: [
      { name: "Smartphone", qty: 1, price: "$250.00" }
    ]
  },
  {
    id: "ORD12346",
    date: "2024-03-28",
    status: "Shipped",
    total: "$150.00",
    items: [
      { name: "Wireless Headphones", qty: 1, price: "$150.00" }
    ]
  }
];

const OrderHistory = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Order History</h1>
      <div className="space-y-4">
        {orders.map((order) => (
          <Card key={order.id} className="p-4 border rounded-lg shadow-sm">
            <CardContent>
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-medium">Order #{order.id}</h2>
                <span className="text-sm text-gray-600">{order.date}</span>
              </div>
              <p className="text-sm text-gray-500">Status: {order.status}</p>
              <div className="mt-2">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between border-b py-2">
                    <span>{item.name} (x{item.qty})</span>
                    <span className="font-medium">{item.price}</span>
                  </div>
                ))}
              </div>
              <div className="mt-2 font-semibold">Total: {order.total}</div>
              <Button className="mt-4 flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                <ShoppingCart className="mr-2" size={16} />
                Reorder
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
