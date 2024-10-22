import React from 'react';

const TeamDisplay = ({ team }) => {
  // Calculate total points from the players
  const totalPoints = team.players.reduce((acc, player) => acc + player.points, 0);

  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-800 rounded-lg shadow-lg mb-6">
      <h2 className="text-2xl font-semibold text-white mb-4">Team: {team.name}</h2>
      <h3 className="text-lg font-semibold text-white mb-2">Players:</h3>
      <ul className="space-y-2">
        {team.players.map((player) => (
          <li key={player._id} className="flex justify-between bg-gray-700 p-2 rounded-md">
            <span className="text-white">{player.name} - {player.position}</span>
            <span className="text-gray-300">(Points: {player.points})</span>
          </li>
        ))}
      </ul>
      <h3 className="text-lg font-semibold text-white mt-4">Total Points: <span className="font-bold">{totalPoints}</span></h3>
    </div>
  );
};

export default TeamDisplay;
