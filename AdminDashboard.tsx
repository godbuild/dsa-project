import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

function AdminDashboard() {
  const { token } = useAuth();
  const [users, setUsers] = useState<any[]>([]);
  const [sessions, setSessions] = useState<any[]>([]);
  const [requests, setRequests] = useState<any[]>([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/admin/users", { headers: { Authorization: `Bearer ${token}` } }).then(res => setUsers(res.data));
    axios.get("http://localhost:5000/api/admin/sessions", { headers: { Authorization: `Bearer ${token}` } }).then(res => setSessions(res.data));
    axios.get("http://localhost:5000/api/admin/requests", { headers: { Authorization: `Bearer ${token}` } }).then(res => setRequests(res.data));
  }, [token]);

  // ...add role update, etc.
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <h3>Users</h3>
      <ul>{users.map(u => <li key={u._id}>{u.name} - {u.role}</li>)}</ul>
      <h3>Sessions</h3>
      <ul>{sessions.map(s => <li key={s._id}>{s.mentor.name} ↔ {s.mentee.name} - {s.status}</li>)}</ul>
      <h3>Requests</h3>
      <ul>{requests.map(r => <li key={r._id}>{r.mentor.name} ⇄ {r.mentee.name} - {r.status}</li>)}</ul>
    </div>
  );
}
export default AdminDashboard;