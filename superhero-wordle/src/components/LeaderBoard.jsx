import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Leaderboard = () => {
    const [leaderboard, setLeaderboard] = useState([]);

    useEffect(() => {
        fetchLeaderboard();
    }, []);

    const fetchLeaderboard = () => {
        axios
            .get('http://localhost:8080/leaderboard')
            .then((response) => {
                setLeaderboard(response.data);
            })
            .catch((error) => {
                console.error('Error fetching leaderboard data:', error);
            });
    };

    return (
        <div className="leaderboard">
            <h2>Leaderboard</h2>
            <button onClick={fetchLeaderboard}>🔄 Refresh</button> {/* ✅ Add Manual Refresh Button */}
            <table>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Name</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {leaderboard.length > 0 ? (
                        leaderboard.map((entry, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{entry.name}</td>
                                <td>{entry.score}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3">No scores yet</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Leaderboard;
