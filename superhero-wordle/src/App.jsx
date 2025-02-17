import React, { useState, useEffect } from 'react';
import GameBoard from './components/GameBoard';
import Leaderboard from './components/LeaderBoard';
import superheroes from './superheroes'; // Import superheroes data
import './styles/ArcadeTheme.css';
import axios from 'axios';

const bgMusic = new URL('./assets/sounds/bgMusic.wav', import.meta.url).href;

const App = () => {
    const [shuffledHeroes, setShuffledHeroes] = useState([]); // Store shuffled superheroes
    const [round, setRound] = useState(0);
    const [totalScore, setTotalScore] = useState(0);
    const [showLeaderboard, setShowLeaderboard] = useState(false);
    const [username, setUsername] = useState('');
    const [gameOver, setGameOver] = useState(false);
    const [showUsernameInput, setShowUsernameInput] = useState(true);
    const [existingUsernames, setExistingUsernames] = useState([]);
    const [error, setError] = useState('');
    const [isPlaying, setIsPlaying] = useState(false);

    // Shuffle the superheroes array on the first render
    useEffect(() => {
        const shuffled = shuffleArray(superheroes);
        setShuffledHeroes(shuffled);
    }, []);

    // Fetch existing usernames from the leaderboard
    useEffect(() => {
        axios
            .get('http://localhost:8080/leaderboard')
            .then((response) => {
                const usernames = response.data.map((entry) => entry.name.toLowerCase());
                setExistingUsernames(usernames);
            })
            .catch((error) => {
                console.error('Error fetching leaderboard usernames:', error);
            });
    }, []);

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

        setShowUsernameInput(false);
        setError('');
    };

    // Handle Score Update
    const handleScoreUpdate = (score) => {
        setTotalScore((prevScore) => prevScore + score);
        if (round < shuffledHeroes.length - 1) {
            setRound((prevRound) => prevRound + 1);
        } else {
            setGameOver(true);
        }
    };

    // Restart Game
    const handleRestart = () => {
        const reshuffled = shuffleArray(superheroes); // Reshuffle superheroes
        setShuffledHeroes(reshuffled);
        setRound(0);
        setTotalScore(0);
        setGameOver(false);
        setShowLeaderboard(false);
    };

    // Debugging fallback: Prevent blank screens
    if (!shuffledHeroes.length) {
        return <div>Loading superheroes...</div>;
    }

    if (showUsernameInput) {
        return (
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
                    <button className="start-button" onClick={handleStartGame}>
                        Start Game
                    </button>
                </div>
                {error && <p className="error-message">{error}</p>}
            </div>
        );
    }

    return (
        <div className="container">
            <audio id="bg-music" src={bgMusic} loop />
            <button className="music-toggle" onClick={handleMusicToggle}>
                {isPlaying ? 'Pause Music' : 'Play Music'}
            </button>

            {showLeaderboard ? (
                <div>
                    <Leaderboard />
                    <button onClick={() => setShowLeaderboard(false)}>Back to Game</button>
                </div>
            ) : gameOver ? (
                <div className="game-over">
                    <h2>🎮 Game Over!</h2>
                    <p>Your total score: {totalScore}</p>
                    <button onClick={() => setShowLeaderboard(true)}>View Leaderboard</button>
                    <button onClick={handleRestart}>Restart Game</button>
                </div>
            ) : (
                <GameBoard
                    superhero={shuffledHeroes[round]?.name} // Use shuffled superheroes safely
                    hints={shuffledHeroes[round]?.hints}
                    onScoreUpdate={handleScoreUpdate}
                    onGameOver={() => setGameOver(true)}
                />
            )}
        </div>
    );
};

export default App;
