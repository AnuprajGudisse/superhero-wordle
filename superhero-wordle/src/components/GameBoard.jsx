import React, { useState, useEffect } from 'react';
import './GameBoard.css';

const GameBoard = ({ superhero, hints, onScoreUpdate, onGameOver, lives, setLives }) => {
    const [currentGuess, setCurrentGuess] = useState('');
    const [hintIndex, setHintIndex] = useState(0); // Start with the first hint
    const [feedback, setFeedback] = useState(''); // Feedback for the user
    const [hintsLeft, setHintsLeft] = useState(5); // 🔥 Start with 5 hints
    const [hintPenalty, setHintPenalty] = useState(0); // 🔥 Tracks penalty points

    useEffect(() => {
        // Reset hints & penalty when a new word is loaded
        setHintsLeft(5);
        setHintIndex(0); // Show the first hint on load
        setHintPenalty(0); // Reset hint penalty
    }, [superhero]);

    // Handles user input changes
    const handleInputChange = (e) => {
        setCurrentGuess(e.target.value.toUpperCase()); // Convert to uppercase for consistency
    };

    // Handles the submission of a guess
    const handleSubmitGuess = () => {
        if (currentGuess === superhero.toUpperCase()) {
            const baseScore = 10; // Max score
            const finalScore = Math.max(0, baseScore - hintPenalty); // 🔥 Deduct penalty points

            setFeedback(`🎉 Correct! You scored ${finalScore} points!`);
            onScoreUpdate(finalScore); // Update score
            setHintsLeft(5); // 🔥 Reset hints for the next word
            setHintPenalty(0); // 🔥 Reset penalty
        } else {
            setFeedback('❌ Wrong! Try again.');
            setLives(lives - 1); // Reduce a life
            if (lives - 1 <= 0) {
                setFeedback(`💀 Game Over! The answer was: ${superhero}`);
                onGameOver();
            }
        }
        setCurrentGuess(''); // Clear input field
    };

    // Reveal the next hint when clicked
    const handleHintClick = () => {
        if (hintsLeft > 0 && hintIndex < hints.length - 1) {
            setHintIndex(hintIndex + 1); // Show the next hint
            setHintsLeft(hintsLeft - 1); // Reduce hints available
            setHintPenalty(hintPenalty + 2); // 🔥 Deduct 2 points per hint
        }
    };

    return (
        <div className="game-board">
            <div className="word-display">
                <p>{'_ '.repeat(superhero.length).trim()}</p> {/* Display blank spaces */}
            </div>

            <div className="hint-box">
                <p>🔍 Hint: {hints[hintIndex]}</p>
                <button onClick={handleHintClick} disabled={hintsLeft <= 0}>
                    Get Hint {hintsLeft > 0 ? `(${hintsLeft} left)` : "(No hints left)"}
                </button>
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

        </div>
    );
};

export default GameBoard;
