import { useState, useRef } from "react";

const SpeechToText = () => {
  const [isListening, setIsListening] = useState(false);
  const [text, setText] = useState('');
  const recognitionRef = useRef(null); // <- store recognition here

  if (!recognitionRef.current && (window.SpeechRecognition || window.webkitSpeechRecognition)) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'ar-SA';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      console.log("Captured text:", transcript);
      setText(transcript);
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognitionRef.current = recognition;
  }

  const startListening = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported.');
      return;
    }
    setIsListening(true);
    recognitionRef.current.start();
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <button 
        onClick={startListening} 
        style={{
          backgroundColor: isListening ? 'red' : '#4CAF50',
          color: 'white',
          border: 'none',
          padding: '15px 32px',
          fontSize: '16px',
          borderRadius: '50%',
          cursor: 'pointer'
        }}
      >
        🎤 Speak
      </button>

        
        <p style={{ marginTop: '20px', fontSize: '20px' }}>
          <strong>Detected Text:</strong> {text}
        </p>
      
    </div>
  );
};

export default SpeechToText;
