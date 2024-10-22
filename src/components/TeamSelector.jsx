import { useState, useEffect } from 'react';
import axios from 'axios';
import TeamDisplay from './TeamDisplay';

const TeamSelector = ({ onTeamCreated }) => {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch all teams to populate the dropdown
    const fetchTeams = async () => {
      try {
        console.log("Fetching teams...");
        const response = await axios.get('https://fantasygamebackend.onrender.com/api/teams');
        console.log("Teams fetched:", response.data);
        setTeams(response.data);
      } catch (err) {
        console.error("Error fetching teams:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  // New function to refetch teams
  const refreshTeams = async () => {
    try {
      const response = await axios.get('https://fantasygamebackend.onrender.com/api/teams');
      setTeams(response.data);
    } catch (err) {
      console.error("Error refreshing teams:", err.message);
    }
  };

  const handleTeamChange = async (e) => {
    const teamId = e.target.value;
    if (teamId) {
      try {
        const response = await axios.get(`https://fantasygamebackend.onrender.com/api/teams/${teamId}`);
        setSelectedTeam(response.data);
      } catch (err) {
        console.error("Error fetching selected team:", err.message);
        setError(err.message);
        setSelectedTeam(null);
      }
    } else {
      setSelectedTeam(null);
    }
  };

  // Effect to refetch teams when a new team is created
  useEffect(() => {
    if (onTeamCreated) {
      refreshTeams(); // Call refresh function whenever onTeamCreated changes
    }
  }, [onTeamCreated]); 

  if (loading) return <p className="text-white">Loading teams...</p>;
  if (error) return <p className="text-red-500">Error fetching teams: {error}</p>;

  return (
    <div className="flex flex-col items-center mt-8 bg-gray-900 p-6 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-white mb-4">Select Your Team</h2>
      <select
        onChange={handleTeamChange}
        className="p-2 bg-gray-800 text-white rounded-lg w-full max-w-xs mb-6 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
      >
        <option value="">Select a team</option>
        {teams.map((team) => (
          <option key={team._id} value={team._id}>{team.name}</option>
        ))}
      </select>

      {selectedTeam && (
        <div className="mt-6 w-full max-w-md p-4 bg-gray-600 rounded-lg text-white text-center">
          <TeamDisplay team={selectedTeam} />
        </div>
      )}
    </div>
  );
};

export default TeamSelector;
