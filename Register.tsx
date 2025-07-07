import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "mentee" });
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", form);
      navigate("/login");
    } catch (err: any) {
      setError(err.response?.data?.error || "Register error");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      {error && <div>{error}</div>}
      <input placeholder="Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
      <input placeholder="Email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
      <input placeholder="Password" type="password" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} />
      <select value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))}>
        <option value="mentee">Mentee</option>
        <option value="mentor">Mentor</option>
      </select>
      <button type="submit">Register</button>
    </form>
  );
}
export default Register;