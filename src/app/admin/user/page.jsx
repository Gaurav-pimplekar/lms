"use client"
import { getAllUsers } from "@/redux/slices/userSlice";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const UserManagement = () => {
  const [newUser, setNewUser] = useState({
    userId: "",
    userName: "",
    email: "",
    role: "",
    branchName: "",
  });
  const [filterRole, setFilterRole] = useState("all");
  const [selectedUser, setSelectedUser] = useState(null);
  const {users} = useSelector(state => state.user);
  const dispatch = useDispatch();

  
  const handleAddUser = async () => {
    console.log(newUser);
    if (!newUser.userName || !newUser.email || !newUser.branchName || !newUser.password || !newUser.role) return;

    try {
      axios.post("/api/auth", newUser);

      console.log("user added successfully");
    } catch (error) {
      console.log(error);
    }
    
    setNewUser({
      userId: "",
      userName: "",
      email: "",
      role: "",
      branchName: "",
    });
  };

  const handleDeleteUser = (userId) => {
    setUsers(users.filter((user) => user.userId !== userId));
  };

  const filteredUsers = filterRole === "all" ? users : users.filter(user => user.role === filterRole);

  useEffect(()=>{
    dispatch(getAllUsers())
  },[])

  return (
    <div className="mt-5 bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-700">Manage Users</h2>
      <div className="mb-4 flex flex-wrap gap-2">
        <input
          type="text"
          placeholder="Name"
          className="border p-2 rounded-lg shadow-sm"
          value={newUser.userName}
          onChange={(e) => setNewUser({ ...newUser, userName: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded-lg shadow-sm"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded-lg shadow-sm"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
        />
        <select onChange={(e) => setNewUser({ ...newUser, role: e.target.value })} value={newUser.role} className="border p-2 rounded-lg shadow-sm">
          <option value="">User Type</option>
          <option value="faculty">Faculty</option>
          <option value="student">Student</option>
        </select>
        <select onChange={(e)=> setNewUser({...newUser, branchName: e.target.value})} value={newUser.branchName} className="border p-2 rounded-lg shadow-sm" name="" id="">
          <option value="">Select Branch</option>
          <option value="bitmj">BITMJ</option>
          <option value="bitsj">BITSJ</option>
          <option value="bitwg">BITWG</option>
          <option value="bitahv">BITAHV</option>
          <option value="bitahpch">BITAHPCH</option>
          <option value="bitsu">BITSU</option>
          <option value="bitan">BITAN</option>
          <option value="other">OTHER</option>
        </select>
        <button onClick={handleAddUser} className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600">Add User</button>
      </div>
      <div className="mb-4">
        <select onChange={(e) => setFilterRole(e.target.value)} className="border p-2 rounded-lg shadow-sm">
          <option value="all">All Users</option>
          <option value="faculty">Faculty</option>
          <option value="student">Student</option>
        </select>
      </div>
      <table className="w-full border-collapse bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">User Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Branch</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="border p-2">{user.userName}</td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2">{user.role}</td>
              <td className="border p-2">{user.branchName}</td>
              <td className="border p-2 flex gap-2">
                <button onClick={() => setSelectedUser(user)} className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">View</button>
                <button onClick={() => handleDeleteUser(user.userId)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">User Details</h2>
            <p><strong>Name:</strong> {selectedUser.userName}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Role:</strong> {selectedUser.role}</p>
            <p><strong>Branch:</strong> {selectedUser.branchName}</p>
            <p><strong>Courses:</strong> {selectedUser?.courses?.join(", ")}</p>
            <button onClick={() => setSelectedUser(null)} className="bg-red-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-red-600">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
