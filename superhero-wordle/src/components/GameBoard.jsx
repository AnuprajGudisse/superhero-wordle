import React, { useState } from 'react';

const GameBoard = ({ superhero, hints, onScoreUpdate, onGameOver }) => {
    const [currentGuess, setCurrentGuess] = useState('');
    const [attemptsLeft, setAttemptsLeft] = useState(5); // Total attempts per round
    const [hintIndex, setHintIndex] = useState(0); // Tracks which hint to display
    const [feedback, setFeedback] = useState(''); // Feedback for the user

    // Handles user input changes
    const handleInputChange = (e) => {
        setCurrentGuess(e.target.value.toUpperCase()); // Convert to uppercase for consistency
    };

    // Handles the submission of a guess
    const handleSubmitGuess = () => {
        if (currentGuess === superhero.toUpperCase()) {
            setFeedback('🎉 Correct! Well done!');
            onScoreUpdate(attemptsLeft * 2); // Update score based on attempts left
        } else {
            const remainingAttempts = attemptsLeft - 1;
    
            if (remainingAttempts > 0) {
                setFeedback('❌ Wrong! Try again.');
                setAttemptsLeft(remainingAttempts);
                setHintIndex((prevIndex) => Math.min(prevIndex + 1, hints.length - 1)); // Show next hint
            } else {
                setFeedback(`💀 Game Over! The answer was: ${superhero}`);
                onGameOver(); // Signal the game is over
            }
        }
    
        setCurrentGuess(''); // Clear input field
    };
    
    // Resets the state when the parent moves to the next superhero
    useEffect(() => {
        setAttemptsLeft(5); // Reset attempts when the round changes
        setHintIndex(0); // Reset hints
        setFeedback(''); // Clear feedback
    }, [superhero]);
    

    return (
        <div className="game-board">
            <div className="word-display">
                <p>{'_ '.repeat(superhero.length).trim()}</p> {/* Display blank spaces */}
            </div>

            <div className="hint-box">
                <p>{hints[hintIndex]}</p> {/* Show the current hint */}
            </div>

            <div className="input-box">
                <input
                    type="text"
                    value={currentGuess}
                    onChange={handleInputChange}
                    placeholder="Enter your guess"
                    maxLength={superhero.length} // Restrict input length to match the superhero name
                />
                <button onClick={handleSubmitGuess}>Submit</button>
            </div>

            <div className="feedback">
                <p className={feedback.includes('Correct') ? 'correct' : 'wrong'}>{feedback}</p>
            </div>

            <div className="attempts-left">
                <p>Attempts Left: {attemptsLeft}</p>
            </div>
        </div>
    );
};

export default GameBoard;
