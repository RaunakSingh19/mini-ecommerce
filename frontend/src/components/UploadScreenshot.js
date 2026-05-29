import React, { useState } from 'react';
// import axios from 'axios';
import API from "../services/api";

export default function UploadScreenshot({ onUploaded }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");

  const handleChange = e => {
    const f = e.target.files[0];
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);
    // Assumes you have an API endpoint for direct-to-Cloudinary or via backend
    // const { data } = await axios.post('/api/upload', formData); // Or Cloudinary widget/client approach
    const { data } =
  await API.post(
    "/upload",
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );
    onUploaded(data.secure_url);
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleChange} />
      {preview && <img src={preview} alt="Payment Screenshot" style={{ width: 200 }} />}
      <button disabled={!file} onClick={handleUpload}>Upload Screenshot</button>
    </div>
  );
}       