import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  function changeHandler(event) {
    setError(null); // Reset error state on new file selection
    setFile(event.target.files[0]);
  }

  async function clickHandler() {
    if (!file) {
      setError('Please select a file.');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('lasFile', file);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData);
      setData(response.data);
    } catch (error) {
      setError('An error occurred while uploading the file.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <h1>LAS File Viewer</h1>
      <div>
        <input type="file" accept=".las" onChange={changeHandler} />
        <button onClick={clickHandler} disabled={loading || !file}>
          {loading ? 'Uploading...' : 'Submit File'}
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
      </div>
    </>
  );
}

export default App;
