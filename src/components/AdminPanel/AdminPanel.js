import React, { useState, useRef, useEffect } from "react";

import { CircularProgress } from "@mui/material";   
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Select,
  MenuItem,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Alert,
  Stack,
} from "@mui/material";
import { CloudUpload, Trash2, Eye, X, RefreshCw } from "lucide-react";
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy } from "firebase/firestore";
import { db } from "../../firebase/config";

import TemporaryDrawer from './mainSideBar';

const COMPANIES = [
  "(PIL) Paceific International Lines",
  "WAN HAN LINES LTD.",
  "HMM (HYUNDAI MERCHANT MARINE)",
  "RAVIAN INTERNATIONAL AGENCIES",
  "UAFL (UNITED AFRICA FEEDER LINES)",
  "CIM",
  
];

export default function AdminImageManager() {
  const [file, setFile] = useState(null);
  const [previewSrc, setPreviewSrc] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [images, setImages] = useState([]);
  const [viewImage, setViewImage] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const inputRef = useRef();

  useEffect(() => {
    loadImages();
  }, []);

  async function loadImages() {
    setLoading(true);
    try {
      const q = query(collection(db, "newsImages"), orderBy("timestamp", "desc"));
      const snapshot = await getDocs(q);
      const imageList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setImages(imageList);
    } catch (err) {
      setError("Failed to load images: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleFileChange(e) {
    const f = e.target.files[0];
    setError(null);
    setSuccess(null);
    if (!f) return;
    setFile(f);

    const reader = new FileReader();
    reader.onload = (ev) => setPreviewSrc(ev.target.result);
    reader.readAsDataURL(f);
  }

  function generateFileName(company, originalName) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const ext = originalName.split(".").pop();
    return `${company}_${timestamp}.${ext}`;
  }

  async function uploadFile() {
    if (!file) return setError("Please choose a file first.");
    if (!selectedCompany) return setError("Please select a company.");

    setUploading(true);
    setError(null);
    setSuccess(null);

    const newFileName = generateFileName(selectedCompany, file.name);

    const fd = new FormData();
    fd.append("file", file);
    fd.append("upload_preset", process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);
    fd.append("folder", "news");
    fd.append("tags", `news,${selectedCompany}`);
    fd.append("public_id", newFileName.split(".")[0]);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`);

    xhr.upload.addEventListener("progress", (ev) => {
      if (ev.lengthComputable) {
        setProgress(Math.round((ev.loaded / ev.total) * 100));
      }
    });

    xhr.onreadystatechange = async () => {
      if (xhr.readyState === 4) {
        setUploading(false);
        if (xhr.status === 200) {
          try {
            const res = JSON.parse(xhr.responseText);
            const imageData = {
              url: res.secure_url,
              publicId: res.public_id,
              fileName: newFileName,
              company: selectedCompany,
              timestamp: Date.now(),
            };
            await addDoc(collection(db, "newsImages"), imageData);
            setSuccess("Image uploaded successfully!");
            setTimeout(() => {
              reset();
              loadImages();
            }, 500);
          } catch (err) {
            setError("Firestore save failed: " + err.message);
          }
        } else {
          setError(`Upload failed: ${xhr.statusText}`);
        }
      }
    };

    xhr.onerror = () => setError("Network error during upload.");
    xhr.send(fd);
  }

  function reset() {
    setFile(null);
    setPreviewSrc(null);
    setSelectedCompany("");
    setProgress(0);
    if (inputRef.current) inputRef.current.value = "";
  }

  async function handleDelete(imageId) {
    if (window.confirm("Are you sure you want to delete this image?")) {
      try {
        await deleteDoc(doc(db, "newsImages", imageId));
        setImages(images.filter((img) => img.id !== imageId));
        setSuccess("Image deleted successfully!");
        setTimeout(() => setSuccess(null), 3000);
      } catch (err) {
        setError("Failed to delete image: " + err.message);
      }
    }
  }

  function handleView(image) {
    setViewImage(image);
    setOpenDialog(true);
  }

  return (
    <Box sx={{ p: 4, bgcolor: "#f9fafb", minHeight: "100vh" }}>
    
            <TemporaryDrawer/>

      {/* Upload Form */}
      <Card sx={{ p: 3, mb: 6, boxShadow: 3 }}>
        <Typography variant="h6" mb={2}>Upload New Image</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Select
              fullWidth
              value={selectedCompany}
              displayEmpty
              onChange={(e) => setSelectedCompany(e.target.value)}
            >
              <MenuItem value="" disabled>Select Company</MenuItem>
              {COMPANIES.map((c) => (
                <MenuItem key={c} value={c}>{c}</MenuItem>
              ))}
            </Select>
          </Grid>

          <Grid item xs={12} md={6}>
            <Button
              variant="outlined"
              component="label"
              fullWidth
              startIcon={<CloudUpload />}
            >
              {file ? file.name : "Select File"}
              <input type="file" hidden accept="image/*" ref={inputRef} onChange={handleFileChange} />
            </Button>
          </Grid>
        </Grid>

        {previewSrc && (
          <Box mt={3} textAlign="center">
            <Typography variant="subtitle2" mb={1}>Preview:</Typography>
            <img src={previewSrc} alt="preview" style={{ maxHeight: 200, borderRadius: 8 }} />
          </Box>
        )}

        {uploading && (
          <Box mt={2}>
            <LinearProgress variant="determinate" value={progress} />
            <Typography variant="body2" mt={1}>{progress}%</Typography>
          </Box>
        )}

        <Stack direction="row" spacing={2} mt={3}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<CloudUpload />}
            onClick={uploadFile}
            disabled={uploading || !file || !selectedCompany}
          >
            Upload
          </Button>
          <Button variant="outlined" color="inherit" onClick={reset}>Reset</Button>
        </Stack>

        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}
      </Card>

      {/* Gallery Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h6">Image Gallery ({images.length})</Typography>
        <Button
          variant="outlined"
          startIcon={<RefreshCw />}
          onClick={loadImages}
          disabled={loading}
        >
          Refresh
        </Button>
      </Box>

      {/* Gallery */}
      <Grid container spacing={3}>
        {loading
          ?  <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh", // center vertically
      }}
    >
      <CircularProgress />
    </Box>
          : images.length === 0
            ? <Typography>No images uploaded yet.</Typography>
            : images.map((image) => (
                <Grid item xs={12} sm={6} md={4} key={image.id}>
                  <Card sx={{ boxShadow: 2, transition: "0.3s", "&:hover": { boxShadow: 6 } }}>
                    <CardMedia component="img" height="180" image={image.url} alt={image.fileName} />
                    <CardContent>
                      <Typography variant="subtitle1" noWrap>{image.fileName}</Typography>
                      <Typography variant="caption" color="text.secondary">{image.company}</Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" startIcon={<Eye />} onClick={() => handleView(image)}>View</Button>
                      <Button size="small" startIcon={<Trash2 />} color="error" onClick={() => handleDelete(image.id)}>Delete</Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))
        }
      </Grid>

      {/* View Dialog */}
      {viewImage && (
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
          <DialogTitle>
            {viewImage.fileName}
            <IconButton
              aria-label="close"
              onClick={() => setOpenDialog(false)}
              sx={{ position: 'absolute', right: 8, top: 8 }}
            >
              <X />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <Box component="img" src={viewImage.url} alt={viewImage.fileName} width="100%" borderRadius={2} mb={2} />
            <Typography>Company: {viewImage.company}</Typography>
            <Typography variant="caption" color="text.secondary">
              Uploaded: {new Date(viewImage.timestamp).toLocaleString()}
            </Typography>
            <Typography variant="caption" display="block" color="text.secondary" sx={{ wordBreak: "break-all" }}>
              Public ID: {viewImage.publicId}
            </Typography>
          </DialogContent>
        </Dialog>
      )}
    </Box>
  );
}
