import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

function Feedback({ sessionId }: { sessionId: string }) {
  const { token } = useAuth();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const submit = () => {
    axios.post("http://localhost:5000/api/feedback", { sessionId, rating, comment }, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(() => alert("Feedback sent!"));
  };

  return (
    <div>
      <h2>Give Feedback</h2>
      <input type="number" min={1} max={5} value={rating} onChange={e => setRating(Number(e.target.value))} />
      <textarea value={comment} onChange={e => setComment(e.target.value)} />
      <button onClick={submit}>Submit</button>
    </div>
  );
}
export default Feedback;