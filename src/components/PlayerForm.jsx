import { useState, useEffect } from 'react';
import axios from 'axios';

const PlayerForm = ({ onTeamCreated }) => {
  const [players, setPlayers] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [teamName, setTeamName] = useState('');

  useEffect(() => {
    // Fetch players from the backend
    axios.get('http://localhost:5000/api/players')
      .then((response) => {
        setPlayers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching players:', error);
      });
  }, []);

  const handlePlayerSelect = (playerId) => {
    if (selectedPlayers.includes(playerId)) {
      // Remove player from the team
      setSelectedPlayers(selectedPlayers.filter(id => id !== playerId));
    } else if (selectedPlayers.length < 11) {
      // Add player to the team
      setSelectedPlayers([...selectedPlayers, playerId]);
    } else {
      alert('You can only select up to 11 players.');
    }
  };

  const handleRemovePlayer = (playerId) => {
    setSelectedPlayers(selectedPlayers.filter(id => id !== playerId));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/teams', {
        name: teamName,
        playerIds: selectedPlayers,
      });

      console.log('Team created:', response.data);
      alert(`Team "${teamName}" has been successfully created!`);

      // Reset form
      setTeamName('');
      setSelectedPlayers([]);

      // Notify the TeamSelector that a team has been created
      if (onTeamCreated) {
        onTeamCreated();
      }

    } catch (error) {
      console.error('Error creating team:', error.response.data);
    }
  };

  return (
    <div className="bg-gray-900 mt-4">
      <div className="max-w-lg mx-auto p-6 bg-gray-800 rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-semibold text-white mb-4">Create Your Team</h2>
          <input
            type="text"
            placeholder="Team Name"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            required
            className="w-full p-2 mb-4 border border-gray-700 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <h3 className="text-lg font-semibold text-white mb-2">Select Players (Max 11)</h3>
          <div className="max-h-60 overflow-y-auto mb-4">
            {players.map((player) => (
              <div key={player._id} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={player._id}
                  checked={selectedPlayers.includes(player._id)}
                  onChange={() => handlePlayerSelect(player._id)}
                  className="mr-2 leading-tight accent-blue-500"
                />
                <label htmlFor={player._id} className="text-gray-200">
                  {player.name} - {player.position}
                </label>
              </div>
            ))}
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Selected Players:</h3>
          <ul className="mb-4">
            {selectedPlayers.map((playerId) => {
              const player = players.find(p => p._id === playerId);
              return (
                <li key={playerId} className="flex justify-between items-center p-2 bg-gray-700 rounded-md mb-2">
                  <span className="text-gray-200">{player.name} - {player.position}</span>
                  <button
                    type="button"
                    onClick={() => handleRemovePlayer(playerId)}
                    className="text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </li>
              );
            })}
          </ul>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
          >
            Create Team
          </button>
        </form>
      </div>
    </div>
  );
};

export default PlayerForm;
