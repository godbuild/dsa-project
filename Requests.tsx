import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

function Requests() {
  const { token } = useAuth();
  const [requests, setRequests] = useState<any>({ asMentor: [], asMentee: [] });

  useEffect(() => {
    axios.get("http://localhost:5000/api/requests", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setRequests(res.data));
  }, [token]);

  const respond = (id: string, status: "accepted" | "rejected") => {
    axios.put(`http://localhost:5000/api/requests/${id}`, { status }, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(() => {
      setRequests(r => ({
        ...r,
        asMentor: r.asMentor.map((req: any) => req._id === id ? { ...req, status } : req)
      }));
    });
  };

  return (
    <div>
      <h3>Requests as Mentor</h3>
      <ul>
        {requests.asMentor.map((r: any) => (
          <li key={r._id}>{r.mentee.name} - {r.status}
            {r.status === "pending" && <> <button onClick={() => respond(r._id, "accepted")}>Accept</button> <button onClick={() => respond(r._id, "rejected")}>Reject</button></>}
          </li>
        ))}
      </ul>
      <h3>Requests as Mentee</h3>
      <ul>
        {requests.asMentee.map((r: any) => (
          <li key={r._id}>{r.mentor.name} - {r.status}</li>
        ))}
      </ul>
    </div>
  );
}
export default Requests;