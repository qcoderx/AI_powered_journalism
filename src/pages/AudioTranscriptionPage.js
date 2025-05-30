import React, { useState, useCallback, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import './AudioTranscriptionPage.css'; // Ensure this CSS file is created and styled

// A simple microphone icon (SVG)
const MicIcon = ({ color = "currentColor", size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size} height={size} fill={color}>
    <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.91-3c-.49 0-.9.36-.98.85C16.52 14.26 14.48 16 12 16s-4.52-1.74-4.93-4.15a1.003 1.003 0 00-.98-.85c-.61 0-1.09.54-1 1.14.49 3.02 2.89 5.36 5.91 5.36s5.42-2.34 5.91-5.36c.09-.6-.39-1.14-1-1.14z" />
    <path d="M12 19c-1.1 0-2 .9-2 2v1c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-1c0-1.1-.9-2-2-2z" />
  </svg>
);

// A simple stop icon (SVG)
const StopIcon = ({ color = "currentColor", size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size} height={size} fill={color}>
    <path d="M6 6h12v12H6z"/>
  </svg>
);


const AudioTranscriptionPage = () => {
  const [uploadedFile, setUploadedFile] = useState(null); // Store only one uploaded file
  const [recordedAudioBlob, setRecordedAudioBlob] = useState(null);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState(''); // For playback
  const [transcription, setTranscription] = useState('');
  const [correctedBroadcastText, setCorrectedBroadcastText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const API_BASE_URL = 'https://journalaise-backend.onrender.com';

  const clearPreviousAudio = () => {
    setUploadedFile(null);
    setRecordedAudioBlob(null);
    setRecordedAudioUrl('');
    setTranscription('');
    setCorrectedBroadcastText('');
    setError('');
  };

  const onDrop = useCallback(acceptedFiles => {
    clearPreviousAudio();
    if (acceptedFiles && acceptedFiles.length > 0) {
      setUploadedFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive, open: openFileDialog } = useDropzone({
    onDrop,
    accept: {'audio/*': []}, // Updated accept format for react-dropzone v14+
    multiple: false,
    noClick: true, // We'll use a custom button for opening dialog if needed
    noKeyboard: true,
  });

  const startRecording = async () => {
    clearPreviousAudio();
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorderRef.current = new MediaRecorder(stream);
        audioChunksRef.current = [];

        mediaRecorderRef.current.ondataavailable = event => {
          audioChunksRef.current.push(event.data);
        };

        mediaRecorderRef.current.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' }); // Or use 'audio/webm' etc.
          const audioUrl = URL.createObjectURL(audioBlob);
          setRecordedAudioBlob(audioBlob);
          setRecordedAudioUrl(audioUrl);
          // Stop microphone tracks
          stream.getTracks().forEach(track => track.stop());
        };

        mediaRecorderRef.current.start();
        setIsRecording(true);
        setError('');
      } catch (err) {
        console.error("Error accessing microphone:", err);
        setError("Could not access microphone. Please check permissions.");
      }
    } else {
      setError("Audio recording is not supported by your browser.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
  };

  const handleTranscribe = async () => {
    let audioToTranscribe = null;
    let fileName = "recorded_audio.wav"; // Default for recorded

    if (recordedAudioBlob) {
      audioToTranscribe = new File([recordedAudioBlob], fileName, { type: recordedAudioBlob.type });
    } else if (uploadedFile) {
      audioToTranscribe = uploadedFile;
      fileName = uploadedFile.name;
    } else {
      setError("Please upload or record an audio file first.");
      return;
    }

    setIsLoading(true);
    setError('');
    setTranscription('');
    setCorrectedBroadcastText('');

    const formData = new FormData();
    formData.append('audioFile', audioToTranscribe, fileName);

    try {
      const response = await fetch(`${API_BASE_URL}/api/transcribe-audio`, {
        method: 'POST',
        body: formData, // FormData sets Content-Type to multipart/form-data automatically
      });

      if (!response.ok) {
        let errorMessage = `Error: ${response.status} ${response.statusText}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.detail || errorData.error || errorMessage;
        } catch (e) { /* Could not parse JSON */ }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      setTranscription(data.rawTranscription || '');
      setCorrectedBroadcastText(data.broadcastReadyText || '');
    } catch (err) {
      console.error("Failed to transcribe audio:", err);
      setError(err.message || 'Failed to connect to the AI service. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getAudioSourceName = () => {
    if (recordedAudioBlob) return "Recorded Audio";
    if (uploadedFile) return uploadedFile.name;
    return "";
  }

  const getAudioSourceSize = () => {
    if (recordedAudioBlob) return (recordedAudioBlob.size / 1024 / 1024).toFixed(2);
    if (uploadedFile) return (uploadedFile.size / 1024 / 1024).toFixed(2);
    return "";
  }

  return (
    <div className="audio-transcription-container page-container">
      <h2>Audio to Broadcast-Ready Text</h2>
      <p>Upload an audio file or record directly to get a transcription and an AI-corrected version.</p>

      {error && <p className="error-message" style={{textAlign: 'center', marginBottom: '15px'}}>{error}</p>}

      <div className="transcription-workflow">
        <div className="input-methods-section">
          {/* File Upload Section */}
          <div {...getRootProps({className: `dropzone ${isDragActive ? 'active' : ''}`})}>
            <input {...getInputProps()} />
            {uploadedFile ? (
              <p>Uploaded: {uploadedFile.name}</p>
            ) : isDragActive ? (
              <p>Drop the audio file here ...</p>
            ) : (
              <p>Drag 'n' drop an audio file here, or click button below</p>
            )}
          </div>
          <button type="button" onClick={openFileDialog} className="tool-button browse-button" disabled={isRecording || isLoading}>
            Browse Files
          </button>

          {/* Audio Recording Section */}
          <div className="record-section">
            <p className="record-section-title">Or Record Audio Directly:</p>
            {!isRecording ? (
              <button onClick={startRecording} className="tool-button record-button" disabled={isLoading}>
                <MicIcon /> Start Recording
              </button>
            ) : (
              <button onClick={stopRecording} className="tool-button stop-record-button" disabled={isLoading}>
                <StopIcon /> Stop Recording
              </button>
            )}
            {isRecording && <p className="recording-status">Recording... <span className="pulsing-dot"></span></p>}
          </div>
        </div>
        
        {(uploadedFile || recordedAudioBlob) && !isRecording && (
          <div className="selected-audio-info">
            <p>
              Ready to transcribe: <strong>{getAudioSourceName()}</strong> 
              {getAudioSourceSize() && ` (${getAudioSourceSize()} MB)`}
            </p>
            {recordedAudioUrl && (
              <audio src={recordedAudioUrl} controls style={{marginTop: '10px', width: '100%'}} />
            )}
          </div>
        )}

        <button 
          onClick={handleTranscribe} 
          disabled={isLoading || (!uploadedFile && !recordedAudioBlob) || isRecording} 
          className="tool-button transcribe-main-button"
        >
          {isLoading ? 'Transcribing...' : 'Transcribe & Correct Audio'}
        </button>

        {(transcription || correctedBroadcastText || isLoading) && !error && (
          <div className="results-section">
            {isLoading && (
              <div className="output-box loading-box">
                <p>JournalAIse is processing audio...</p>
              </div>
            )}
            {!isLoading && transcription && (
              <div className="output-box">
                <h4>Raw Transcription:</h4>
                <pre>{transcription}</pre>
              </div>
            )}
            {!isLoading && correctedBroadcastText && (
              <div className="output-box broadcast-text-box">
                <h4>Broadcast-Ready Text:</h4>
                <pre>{correctedBroadcastText}</pre>
              </div>
            )}
          </div>
        )}
         {!isLoading && !error && !transcription && !correctedBroadcastText && (uploadedFile || recordedAudioBlob) && (
             <div className="output-box placeholder-box" style={{marginTop: '20px'}}>
                <p>Click "Transcribe & Correct Audio" to process your selection.</p>
             </div>
          )}
      </div>
    </div>
  );
};

export default AudioTranscriptionPage;
