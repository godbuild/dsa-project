import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

function MentorList() {
  const { token } = useAuth();
  const [mentors, setMentors] = useState<any[]>([]);
  const [skill, setSkill] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:5000/api/mentors${skill ? `?skill=${skill}` : ""}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setMentors(res.data));
  }, [skill, token]);

  return (
    <div>
      <h2>Mentors</h2>
      <input placeholder="Filter by skill" value={skill} onChange={e => setSkill(e.target.value)} />
      <ul>
        {mentors.map(m => (
          <li key={m._id}>{m.name} - {m.skills.join(", ")} {/* Add View/Profile/Request buttons */}</li>
        ))}
      </ul>
    </div>
  );
}
export default MentorList;