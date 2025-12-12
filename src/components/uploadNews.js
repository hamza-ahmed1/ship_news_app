import React, { useState, useRef } from "react";

const CLOUD_NAME = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;
const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

export default function CloudinaryUploader() {
  const [file, setFile] = useState(null);
  const [previewSrc, setPreviewSrc] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState(null);
  const inputRef = useRef();

  function handleFileChange(e) {
    const f = e.target.files[0];
    setError(null);
    setUploadedUrl(null);
    setProgress(0);
    if (!f) return;
    setFile(f);

    // preview
    const reader = new FileReader();
    reader.onload = (ev) => setPreviewSrc(ev.target.result);
    reader.readAsDataURL(f);
  }

  function uploadFile() {
    if (!file) return setError("Please choose a file first.");
    setUploading(true);
    setError(null);
    setProgress(0);

    const fd = new FormData();
    fd.append("file", file);
    fd.append("upload_preset", UPLOAD_PRESET);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", UPLOAD_URL);

    // progress
    xhr.upload.addEventListener("progress", (ev) => {
      if (ev.lengthComputable) {
        const percent = Math.round((ev.loaded / ev.total) * 100);
        setProgress(percent);
      }
    });

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        setUploading(false);
        if (xhr.status === 200) {
          try {
            const res = JSON.parse(xhr.responseText);
            setUploadedUrl(res.secure_url || res.url);
            setProgress(100);
          } catch (e) {
            setError("Upload succeeded but response parsing failed.");
          }
        } else {
          setError(`Upload failed: ${xhr.status} ${xhr.statusText}`);
        }
      }
    };

    xhr.onerror = () => {
      setUploading(false);
      setError("Network error during upload.");
    };

    xhr.send(fd);
  }

  function reset() {
    setFile(null);
    setPreviewSrc(null);
    setProgress(0);
    setUploading(false);
    setError(null);
    setUploadedUrl(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div style={{ maxWidth: 520, margin: "0 auto", fontFamily: "sans-serif" }}>
      <h3>Upload image to Cloudinary</h3>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />

      {previewSrc && (
        <div style={{ marginTop: 12 }}>
          <div style={{ marginBottom: 8 }}>Preview:</div>
          <img
            src={previewSrc}
            alt="preview"
            style={{ maxWidth: "100%", borderRadius: 6 }}
          />
        </div>
      )}

      <div style={{ marginTop: 12 }}>
        <button
          onClick={uploadFile}
          disabled={uploading || !file}
          style={{ padding: "8px 14px", marginRight: 8 }}
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>

        <button onClick={reset} style={{ padding: "8px 14px" }}>
          Reset
        </button>
      </div>

      {uploading && (
        <div style={{ marginTop: 12 }}>
          <div style={{ marginBottom: 6 }}>Progress: {progress}%</div>
          <div
            style={{
              height: 10,
              background: "#eee",
              borderRadius: 5,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                height: "100%",
                background: "#4caf50",
                transition: "width 200ms linear",
              }}
            />
          </div>
        </div>
      )}

      {error && <div style={{ marginTop: 12, color: "crimson" }}>{error}</div>}

      {uploadedUrl && (
        <div style={{ marginTop: 12 }}>
          <div>Uploaded successfully! URL:</div>
          <a href={uploadedUrl} target="_blank" rel="noopener noreferrer">
            {uploadedUrl}
          </a>
          <div style={{ marginTop: 8 }}>
            <img
              src={uploadedUrl}
              alt="uploaded"
              style={{ maxWidth: "100%", borderRadius: 6, marginTop: 6 }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
