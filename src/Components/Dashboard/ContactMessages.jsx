import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ContactMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://programming-hero-assignment-10-serv.vercel.app/dashboard/contact-messages")
      .then((res) => res.json())
      .then((data) => setMessages(data))
      .catch(() => toast.error("Failed to load messages"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-center">Loading messages...</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">📩 Contact Messages</h2>

      <div className="hidden md:block overflow-x-auto bg-white rounded-xl shadow">
        <table className="table w-full">
          <thead className="bg-gray-100">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Subject</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((msg) => (
              <tr key={msg._id}>
                <td>{msg.name}</td>
                <td>{msg.email}</td>
                <td>{msg.subject}</td>
                <td>{new Date(msg.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 gap-4 md:hidden">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className="bg-white p-4 rounded-xl shadow space-y-1"
          >
            <p className="font-semibold">{msg.name}</p>
            <p className="text-sm text-gray-600">{msg.email}</p>
            <p className="text-sm font-medium">{msg.subject}</p>
            <p className="text-xs text-gray-400">
              {new Date(msg.createdAt).toLocaleString()}
            </p>
            <p className="text-sm pt-2">{msg.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactMessages;
