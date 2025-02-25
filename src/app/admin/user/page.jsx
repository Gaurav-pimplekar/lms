import { useState } from "react";

const UserManagement = () => {
  const [users, setUsers] = useState([
    {
      userId: "U123",
      userName: "John Doe",
      email: "johndoe@example.com",
      role: "student",
      branchId: "B101",
      branchName: "Computer Science",
    },
  ]);
  const [newUser, setNewUser] = useState({
    userId: "",
    userName: "",
    email: "",
    role: "student",
    branchId: "",
    branchName: "",
  });

  const handleAddUser = () => {
    if (!newUser.userId || !newUser.userName || !newUser.email) return;
    setUsers([...users, newUser]);
    setNewUser({
      userId: "",
      userName: "",
      email: "",
      role: "student",
      branchId: "",
      branchName: "",
    });
  };

  const handleDeleteUser = (userId) => {
    setUsers(users.filter((user) => user.userId !== userId));
  };

  return (
    <div className="mt-5 bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Manage Users</h2>
      <div className="mb-4 flex flex-wrap gap-2">
        <input
          type="text"
          placeholder="User ID"
          className="border p-2"
          value={newUser.userId}
          onChange={(e) => setNewUser({ ...newUser, userId: e.target.value })}
        />
        <input
          type="text"
          placeholder="Name"
          className="border p-2"
          value={newUser.userName}
          onChange={(e) => setNewUser({ ...newUser, userName: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-2"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <button onClick={handleAddUser} className="bg-blue-500 text-white p-2 rounded">
          Add User
        </button>
      </div>
      <ul>
        {users.map((user) => (
          <li key={user.userId} className="border p-2 mb-2 flex justify-between">
            {user.userName} ({user.role})
            <button
              onClick={() => handleDeleteUser(user.userId)}
              className="bg-red-500 text-white p-1 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserManagement;
