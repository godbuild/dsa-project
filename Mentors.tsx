import React, { useEffect, useState } from "react";
import { findMentors } from "../api/user";
import { sendRequest } from "../api/mentorship";

const Mentors: React.FC = () => {
  const [mentors, setMentors] = useState<any[]>([]);
  const [skill, setSkill] = useState("");

  useEffect(() => {
    findMentors(skill).then(res => setMentors(res.data));
  }, [skill]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Find Mentors</h2>
      <input
        type="text"
        placeholder="Search skill..."
        className="border p-2 mb-4"
        value={skill}
        onChange={e => setSkill(e.target.value)}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {mentors.map(mentor => (
          <div key={mentor._id} className="border p-4 rounded bg-white">
            <h3 className="font-bold">{mentor.name}</h3>
            <p>{mentor.bio}</p>
            <p>Skills: {(mentor.skills || []).join(", ")}</p>
            <button
              className="mt-2 bg-green-500 text-white px-2 py-1 rounded"
              onClick={() => sendRequest(mentor._id)}
            >
              Send Mentorship Request
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mentors;