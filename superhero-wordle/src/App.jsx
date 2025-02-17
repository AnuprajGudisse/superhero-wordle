import React, { useState, useEffect } from 'react';
import GameBoard from './components/GameBoard';
import Leaderboard from './components/Leaderboard';
import superheroes from './superheroes'; // Import superheroes data
import './styles/ArcadeTheme.css';
import axios from 'axios';

// Background music file
const bgMusic = new URL('./assets/sounds/bgMusic.wav', import.meta.url).href;

const App = () => {
    const [shuffledHeroes, setShuffledHeroes] = useState([]); // Store shuffled superheroes
    const [round, setRound] = useState(0);
    const [totalScore, setTotalScore] = useState(0);
    const [showLeaderboard, setShowLeaderboard] = useState(false);
    const [leaderboard, setLeaderboard] = useState([]); // 🔥 Store leaderboard data
    const [username, setUsername] = useState('');
    const [gameOver, setGameOver] = useState(false);
    const [showUsernameInput, setShowUsernameInput] = useState(true);
    const [existingUsernames, setExistingUsernames] = useState([]);
    const [error, setError] = useState('');
    const [isPlaying, setIsPlaying] = useState(false); // Background music state
    const [lives, setLives] = useState(5); // 🔥 NEW: Player starts with 5 lives

    // Shuffle the superheroes array on the first render
    useEffect(() => {
        const shuffled = shuffleArray(superheroes);
        setShuffledHeroes(shuffled);
    }, []);

    // Fetch existing usernames & leaderboard from the backend
    useEffect(() => {
        fetchLeaderboard();
    }, []);

    // Fetch updated leaderboard data
    const fetchLeaderboard = () => {
        axios
            .get('http://localhost:8080/leaderboard', { cache: 'no-store' }) // 🔥 Ensure fresh data
            .then((response) => {
                setLeaderboard(response.data); // ✅ Store latest leaderboard
                setExistingUsernames(response.data.map((entry) => entry.name.toLowerCase()));
            })
            .catch((error) => {
                console.error('Error fetching leaderboard:', error);
            });
    };

    // Shuffle array function
    const shuffleArray = (array) => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    // Toggle background music
    const handleMusicToggle = () => {
        const audio = document.getElementById('bg-music');
        if (isPlaying) {
            audio.pause();
            setIsPlaying(false);
        } else {
            audio.play();
            setIsPlaying(true);
        }
    };

    // Handle New User
    const handleStartGame = () => {
        if (!username) {
            setError('Username is required!');
            return;
        }

        if (existingUsernames.includes(username.toLowerCase())) {
            setError('Username already exists! Please log in as a returning user.');
            return;
        }

        setShowUsernameInput(false); // Move to GameBoard
        setError('');
    };

    // Handle Returning User Login
    const handleLogin = () => {
        if (!username) {
            setError('Please enter a username to log in.');
            return;
        }

        if (!existingUsernames.includes(username.toLowerCase())) {
            setError('Username not found! Please check your name or start a new game.');
            return;
        }

        setShowUsernameInput(false); // Move to GameBoard
        setError('');
    };

    // Handle Score Submission
    const handleSubmitScore = (finalScore) => {
        if (username) {
            axios
                .post('http://localhost:8080/add-score', {
                    name: username,
                    score: finalScore,
                })
                .then((response) => {
                    console.log('Score submitted successfully:', response.data);
                    fetchLeaderboard(); // ✅ Ensure leaderboard updates immediately
                })
                .catch((error) => {
                    console.error('Error submitting score:', error);
                });
        }
    };

    // Handle Score Update
    const handleScoreUpdate = (score) => {
        setTotalScore((prevScore) => prevScore + score);
        if (round < shuffledHeroes.length - 1) {
            setRound((prevRound) => prevRound + 1);
        } else {
            setGameOver(true);
            handleSubmitScore(totalScore + score); // ✅ Save final score
        }
    };

    // Handle Lives Update (🔥 NEW: Game Ends When Lives Reach 0)
    const handleLivesUpdate = (newLives) => {
        if (newLives <= 0) {
            setGameOver(true);
            handleSubmitScore(totalScore); // ✅ Save score if game over
        }
        setLives(newLives);
    };

    // Restart Game
    const handleRestart = () => {
        const reshuffled = shuffleArray(superheroes); // Reshuffle superheroes
        setShuffledHeroes(reshuffled);
        setRound(0);
        setTotalScore(0);
        setLives(5); // 🔥 NEW: Reset lives when restarting
        setGameOver(false);
        setShowLeaderboard(false);
    };

    // Switch User
    const handleSwitchUser = () => {
        setRound(0);
        setTotalScore(0);
        setLives(5); // 🔥 NEW: Reset lives when switching user
        setGameOver(false);
        setShowLeaderboard(false);
        setUsername('');
        setShowUsernameInput(true);
    };

    return (
        <div className="container">
            {/* Background music element */}
            <audio id="bg-music" src={bgMusic} loop />
            <button className="music-toggle" onClick={handleMusicToggle}>
                {isPlaying ? 'Pause Music' : 'Play Music'}
            </button>

            {showUsernameInput ? (
                <div className="username-input">
                    <h2>Enter Your Username</h2>
                    <input
                        type="text"
                        placeholder="Enter your name"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="username-input-field"
                    />
                    <div className="button-container">
                        <button className="start-button" onClick={handleStartGame}>Start Game</button>
                        <button className="login-button" onClick={handleLogin}>Log in as Returning User</button>
                    </div>
                    {error && <p className="error-message">{error}</p>}
                </div>
            ) : showLeaderboard ? (
                <div>
                    <Leaderboard leaderboard={leaderboard} /> {/* ✅ Pass updated leaderboard */}
                    <button onClick={() => setShowLeaderboard(false)}>Back to Game</button>
                </div>
            ) : gameOver ? (
                <div className="game-over">
                    <h2>🎮 Game Over!</h2>
                    <p>Your total score: {totalScore}</p>
                    <button onClick={() => setShowLeaderboard(true)}>View Leaderboard</button>
                    <button onClick={handleRestart}>Restart Game</button>
                    <button onClick={handleSwitchUser}>Switch User</button>
                </div>
            ) : (
                <>
                    <h1>Superhero Wordle</h1>
                    <button onClick={() => setShowLeaderboard(true)}>View Leaderboard</button>
                    <p>❤️ Lives Left: {lives}</p> {/* 🔥 NEW: Display Lives */}
                    <GameBoard
                        superhero={shuffledHeroes[round]?.name || ''} // Ensure superhero exists
                        hints={shuffledHeroes[round]?.hints || []} // Ensure hints exist
                        onScoreUpdate={handleScoreUpdate}
                        onGameOver={() => setGameOver(true)}
                        setLives={handleLivesUpdate} // Allow GameBoard to update lives
                    />
                    <p>Total Score: {totalScore}</p>
                </>
            )}
        </div>
    );
};

export default App;
