import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

function BookSession({ mentorId }: { mentorId: string }) {
  const { token } = useAuth();
  const [slots, setSlots] = useState<string[]>([]);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:5000/api/sessions/availability/${mentorId}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setSlots(res.data?.slots || []));
  }, [mentorId, token]);

  const book = () => {
    axios.post("http://localhost:5000/api/sessions", { mentorId, time: selected }, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(() => alert("Session booked!"));
  };

  return (
    <div>
      <h2>Book Session</h2>
      <select value={selected} onChange={e => setSelected(e.target.value)}>
        <option value="">Select slot</option>
        {slots.map(s => <option key={s} value={s}>{new Date(s).toLocaleString()}</option>)}
      </select>
      <button onClick={book} disabled={!selected}>Book</button>
    </div>
  );
}
export default BookSession;