const [isMuted, setIsMuted] = useState(false);

const playSound = (soundFile) => {
    if (!isMuted) {
        const audio = new Audio(soundFile);
        audio.play();
    }
};

const toggleMute = () => {
    setIsMuted(!isMuted);
};
