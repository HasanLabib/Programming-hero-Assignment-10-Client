import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://programming-hero-assignment-10-serv.vercel.app/users"
      );
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="loading loading-spinner loading-lg text-amber-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h1 className="text-xl sm:text-3xl font-bold">All Users</h1>
        <div className="badge badge-lg badge-primary w-fit">
          Total: {users.length}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:hidden">
        {users.map((user) => (
          <div
            key={user._id}
            className="bg-white rounded-lg shadow p-4 flex gap-4 items-center"
          >
            <img
              src={user.photoURL}
              alt={user.name}
              className="w-14 h-14 rounded-lg object-cover"
            />

            <div className="flex-1">
              <p className="font-semibold text-base">{user.name}</p>
              <p className="text-sm text-gray-500 break-all">{user.email}</p>

              <div className="flex items-center gap-2 mt-2">
                <span
                  className={`badge ${
                    user.role === "admin" ? "badge-error" : "badge-success"
                  }`}
                >
                  {user.role}
                </span>

                <span className="text-xs text-gray-400">
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "N/A"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="hidden md:block bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-gray-50">
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined Date</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="hover">
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img src={user.photoURL} alt={user.name} />
                        </div>
                      </div>
                      <div className="font-bold">{user.name}</div>
                    </div>
                  </td>
                  <td className="break-all">{user.email}</td>
                  <td>
                    <span
                      className={`badge ${
                        user.role === "admin" ? "badge-error" : "badge-success"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td>
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString()
                      : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
