import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

function Profile() {
  const { token, user } = useAuth();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    if (!token) return;
    axios.get("http://localhost:5000/api/users/me", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setProfile(res.data));
  }, [token]);

  if (!profile) return <div>Loading...</div>;

  return (
    <div>
      <h2>Profile: {profile.name}</h2>
      <div>Email: {profile.email}</div>
      <div>Role: {profile.role}</div>
      <div>Bio: {profile.bio || "N/A"}</div>
      <div>Skills: {(profile.skills || []).join(", ")}</div>
      <div>Goals: {profile.goals || "N/A"}</div>
    </div>
  );
}
export default Profile;