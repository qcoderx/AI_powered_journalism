import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone'; // You'll need to install this: npm install react-dropzone
import './AudioTranscriptionPage.css';

const AudioTranscriptionPage = () => {
  const [files, setFiles] = useState([]);
  const [transcription, setTranscription] = useState('');
  const [correctedBroadcastText, setCorrectedBroadcastText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onDrop = useCallback(acceptedFiles => {
    setFiles(acceptedFiles);
    setTranscription(''); // Clear previous transcription
    setCorrectedBroadcastText(''); // Clear previous corrected text
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'audio/*', // Accept all audio types
    multiple: false // Allow only one file at a time for simplicity
  });

  const handleTranscribe = async () => {
    if (files.length === 0) {
      alert("Please upload an audio file first.");
      return;
    }
    setIsLoading(true);
    // Simulate API call for transcription
    // const formData = new FormData();
    // formData.append('audioFile', files[0]);
    // const response = await fetch('/api/transcribe', { method: 'POST', body: formData });
    // const data = await response.json();
    // setTranscription(data.rawTranscription);
    // setCorrectedBroadcastText(data.broadcastReadyText);
    setTimeout(() => {
      setTranscription(`Placeholder raw transcription for: ${files[0].name}`);
      setCorrectedBroadcastText(`Placeholder AI corrected broadcast text for: ${files[0].name}`);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="audio-transcription-container page-container">
      <h2>Audio to Broadcast-Ready Text</h2>
      <p>Upload your audio file to get a transcription and an AI-corrected version suitable for broadcasting.</p>

      <div className="transcription-workflow">
        <div className="upload-section">
          <h3>Upload Audio</h3>
          <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}>
            <input {...getInputProps()} />
            {
              files.length > 0 ? <p>{files[0].name}</p> :
              isDragActive ? <p>Drop the audio file here ...</p> :
              <p>Drag 'n' drop an audio file here, or click to select file</p>
            }
          </div>
          {files.length > 0 && <p className="file-info">Selected file: {files[0].name} ({(files[0].size / 1024 / 1024).toFixed(2)} MB)</p>}
          <button onClick={handleTranscribe} disabled={isLoading || files.length === 0} className="tool-button">
            {isLoading ? 'Transcribing...' : 'Transcribe & Correct'}
          </button>
        </div>

        {(transcription || correctedBroadcastText || isLoading) && (
          <div className="results-section">
            {isLoading && (
                <div className="output-box loading-box">
                    <p>JournalAIse is processing audio...</p>
                </div>
            )}
            {transcription && !isLoading && (
              <div className="output-box">
                <h4>Raw Transcription:</h4>
                <p>{transcription}</p>
              </div>
            )}
            {correctedBroadcastText && !isLoading && (
              <div className="output-box broadcast-text-box">
                <h4>Broadcast-Ready Text:</h4>
                <p>{correctedBroadcastText}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AudioTranscriptionPage;
