import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const UserManagement = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Alice",
      email: "alice@example.com",
      username: "alice123",
      phone: "123-456-7890",
    },
    {
      id: 2,
      name: "Bob",
      email: "bob@example.com",
      username: "bob123",
      phone: "987-654-3210",
    },
    {
      id: 3,
      name: "Blake",
      email: "blake@example.com",
      username: "blake123",
      phone: "987-654-3210",
    },
    {
      id: 4,
      name: "Casse",
      email: "casse@example.com",
      username: "casse123",
      phone: "987-654-3210",
    },
    // Add initial users or fetch from an API
  ]);

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    username: "",
    phone: "",
    password: "",
  });
  const [editingUser, setEditingUser] = useState(null);

  const handleAddUser = () => {
    const newUserId = users.length + 1;
    setUsers([...users, { id: newUserId, ...newUser }]);
    setNewUser({ name: "", email: "", username: "", phone: "", password: "" });
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setNewUser({
      name: user.name,
      email: user.email,
      username: user.username,
      phone: user.phone,
      password: "",
    });
  };

  const handleSaveEdit = () => {
    setUsers(
      users.map((user) =>
        user.id === editingUser.id ? { ...editingUser, ...newUser } : user
      )
    );
    setEditingUser(null);
    setNewUser({ name: "", email: "", username: "", phone: "", password: "" });
  };

  const handleDeleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };
  const navigate = useNavigate();

  return (
    <div className="p-6 bg-gray-100 min-h-screen w-full mt-[60px]">
      <button
        onClick={() => navigate("/dashboard")}
        className="mb-4 flex items-center"
      >
        <FaArrowLeftLong />
      </button>
      <h1 className="text-2xl font-bold mb-4">User Management</h1>

      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-2">
          {editingUser ? "Edit User" : "Add New User"}
        </h2>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Name"
            className="border border-gray-300 p-2 rounded"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            className="border border-gray-300 p-2 rounded"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
          <input
            type="text"
            placeholder="Username"
            className="border border-gray-300 p-2 rounded"
            value={newUser.username}
            onChange={(e) =>
              setNewUser({ ...newUser, username: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Phone"
            className="border border-gray-300 p-2 rounded"
            value={newUser.phone}
            onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            className="border border-gray-300 p-2 rounded"
            value={newUser.password}
            onChange={(e) =>
              setNewUser({ ...newUser, password: e.target.value })
            }
          />
          <button
            className="bg-black text-white py-2 rounded mt-2 hover:bg-gray-600"
            onClick={editingUser ? handleSaveEdit : handleAddUser}
          >
            {editingUser ? "Save Changes" : "Add User"}
          </button>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">Existing Users</h2>
        <table className="w-full border-collapse mt-5">
          <thead>
            <tr>
              <th className="p-2 border border-gray-300">Name</th>
              <th className="p-2 border border-gray-300">Email</th>
              <th className="p-2 border border-gray-300">Username</th>
              <th className="p-2 border border-gray-300">Phone</th>
              <th className="p-2 border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-100">
                <td className="p-2 border border-gray-300">{user.name}</td>
                <td className="p-2 border border-gray-300">{user.email}</td>
                <td className="p-2 border border-gray-300">{user.username}</td>
                <td className="p-2 border border-gray-300">{user.phone}</td>
                <td className="p-2 border border-gray-300 flex justify-around">
                  <button
                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 flex items-center gap-1"
                    onClick={() => handleEditUser(user)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 flex items-center gap-1"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
