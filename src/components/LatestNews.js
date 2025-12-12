import React, { useState, useEffect } from "react";

import {

  Box,
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  TextField,
  MenuItem,
  Grid,
  Chip,
  CircularProgress,
  Paper,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton
} from "@mui/material";
import { Refresh, Image as ImageIcon, Close } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/config";
import { signOut } from "firebase/auth";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import Navbar from "./Navbar";
import { Download, Eye } from "lucide-react";

// Separate Image Gallery Component (same as admin panel)
function ImageGallery({ images, loading, onRefresh }) {
  if (loading) {
    return (
      <Paper elevation={0} sx={{ p: 8, textAlign: 'center', bgcolor: 'grey.50' }}>
        <CircularProgress size={48} sx={{ mb: 2 }} />
        <Typography color="text.secondary">Loading images...</Typography>
      </Paper>
    );
  }

  if (images.length === 0) {
    return (
      <Paper elevation={0} sx={{ p: 8, textAlign: 'center', bgcolor: 'grey.50' }}>
        <ImageIcon sx={{ fontSize: 64, color: 'grey.400', mb: 2 }} />
        <Typography variant="h6" color="text.secondary" gutterBottom>
          No news images found
        </Typography>
        <Typography variant="body2" color="text.disabled">
          Check your filters or upload new images
        </Typography>
      </Paper>
    );
  }

  return (
    <Grid container spacing={3}>
      {images.map((image) => (
        <Grid item xs={12} sm={6} md={4} key={image.id}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
              transition: "all 0.3s",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
              },
            }}
          >
            <CardMedia
              component="img"
              alt={image.fileName}
              height="200"
              image={image.url}
              sx={{ objectFit: "cover" }}
            />
            <CardContent>
              <Typography 
                variant="subtitle1" 
                fontWeight={600}
                noWrap
                title={image.fileName}
                gutterBottom
              >
                {image.fileName}
              </Typography>
              <Chip 
                label={image.company} 
                size="small" 
                color="primary" 
                variant="outlined"
                sx={{ mb: 1 }}
              />
              <Typography variant="caption" color="text.secondary" display="block">
                {new Date(image.timestamp).toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default function LatestNews() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState("all");
  const [selectedCompany, setSelectedCompany] = useState("all");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  
  // Add these states for the modal
  const [openDialog, setOpenDialog] = useState(false);
  const [viewImage, setViewImage] = useState(null);

  useEffect(() => {
    loadImages();
  }, []);

  async function loadImages() {
    setLoading(true);
    setError(null);
    try {
      const q = query(collection(db, "newsImages"), orderBy("timestamp", "desc"));
      const snapshot = await getDocs(q);
      const imageList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setImages(imageList);
      setLastUpdated(new Date());
    } catch (err) {
      console.error("Error loading images:", err);
      setError("Failed to load images: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  // Add this function to handle image click
  const handleImageClick = (image) => {
    setViewImage(image);
    setOpenDialog(true);
  };

  // Get unique dates from images
  const getUniqueDates = () => {
    const dates = images.map(img => {
      const date = new Date(img.timestamp);
      return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    });
    return ["all", ...new Set(dates)];
  };

  // Get unique companies from images
  const getUniqueCompanies = () => {
    const companies = images.map(img => img.company);
    return ["all", ...new Set(companies)];
  };

  const uniqueDates = getUniqueDates();
  const uniqueCompanies = getUniqueCompanies();

  // Filter images based on selected filters
  const filteredImages = images.filter(image => {
    const imageDate = new Date(image.timestamp).toLocaleDateString('en-GB', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    });
    
    const dateMatch = selectedDate === "all" || imageDate === selectedDate;
    const companyMatch = selectedCompany === "all" || image.company === selectedCompany;
    
    return dateMatch && companyMatch;
  });

  // Group images by date
  const groupedByDate = filteredImages.reduce((acc, image) => {
    const dateKey = new Date(image.timestamp).toLocaleDateString('en-GB', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    });
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(image);
    return acc;
  }, {});

  const handleHome = () => {
    navigate("/home");
  };
    function handleView(image) {
    setViewImage(image);
    setOpenDialog(true);
  }
const handleDownload = async (url, fileName) => {
   setOpenDialog(false);
  try {
    const res = await fetch(url);
    const blob = await res.blob();
    const blobUrl = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = fileName || "download";
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(blobUrl);
  } catch (err) {
    console.error("Download failed", err);
  }
};
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Navbar />
      <Box sx={{ mb: 4 }}>
        {/* Last Updated */}
        {lastUpdated && (
          <Paper 
            elevation={0} 
            sx={{ 
              display: 'inline-block',
              px: 2, 
              py: 1,
              borderRadius: 2,
              mb: 3
            }}
          >
            <Typography variant="body2" fontWeight={600} color="success.dark">
              Last Updated: {lastUpdated.toLocaleString()}
            </Typography>
          </Paper>
        )}

        {/* Filters */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              select
              fullWidth
              label="Filter by Date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              variant="outlined"
              size="small"
            >
              {uniqueDates.map((date) => (
                <MenuItem key={date} value={date}>
                  {date === "all" ? "All Dates" : date}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              select
              fullWidth
              label="Filter by Company"
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
              variant="outlined"
              size="small"
            >
              {uniqueCompanies.map((company) => (
                <MenuItem key={company} value={company}>
                  {company === "all" ? "All Companies" : company}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<Refresh />}
              onClick={loadImages}
              disabled={loading}
              sx={{ height: '40px' }}
            >
              Refresh
            </Button>
          </Grid>
        </Grid>

        {/* Results Count */}
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Showing {filteredImages.length} of {images.length} images
        </Typography>
      </Box>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {/* News Display - Grouped by Date */}
      {Object.keys(groupedByDate).length === 0 ? (
        <ImageGallery images={[]} loading={loading} onRefresh={loadImages} />
      ) : (
        Object.entries(groupedByDate).map(([date, dateImages]) => (
          <Box key={date} sx={{ mb: 5 }}>
            {/* Date Header */}
            <Typography
              variant="h6"
              sx={{
                mb: 3,
                color: "primary.main",
                fontWeight: 600,
                borderLeft: "4px solid #042546FF",
                pl: 2,
              }}
            >
              {date}
            </Typography>

            {/* Images for this date */}
            <Grid container spacing={3}>
              {dateImages.map((image) => (
                <Grid item xs={12} sm={6} md={4} key={image.id}>
                  <Card
                    onClick={() => handleImageClick(image)}
                    sx={{
                      borderRadius: 3,
                      boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
                      transition: "all 0.3s",
                      cursor: "pointer",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      alt={image.fileName}
                      height="200"
                      image={image.url}
                      sx={{ objectFit: "cover" }}
                    />
                    <CardContent>
                      <Typography 
                        variant="subtitle1" 
                        fontWeight={600}
                        noWrap
                        title={image.fileName}
                        gutterBottom
                      >
                        {image.fileName}
                      </Typography>
                      <Chip 
                        label={image.company} 
                        size="small" 
                        color="primary" 
                        variant="outlined"
                        sx={{ mb: 1 }}
                      />
                      <Typography variant="caption" color="text.secondary" display="block">
                        {new Date(image.timestamp).toLocaleTimeString()}
                      </Typography>
                  <Button size="small" startIcon={<Eye />} onClick={() => handleView(viewImage)}>View</Button>

<Button
  size="small"
  startIcon={<Download />}
  onClick={() => handleDownload(image.url, image.fileName)}
  sx={{ color: "green", paddingLeft: 2 }}
>
  Download
</Button>

                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        ))
      )}

      {/* View Dialog - Full Image Modal */}
      {viewImage && (
        <Dialog 
          open={openDialog} 
          onClose={() => setOpenDialog(false)} 
          maxWidth="lg" 
          fullWidth
        >
          <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" component="div">
              {viewImage.fileName}
            </Typography>
            <IconButton
              aria-label="close"
              onClick={() => setOpenDialog(false)}
              sx={{
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <Close />
            </IconButton>
          </DialogTitle>
 
          <DialogContent dividers>
            <Box 
              component="img" 
              src={viewImage.url} 
              alt={viewImage.fileName} 
              sx={{
                width: "100%", 
                height: "auto",
                borderRadius: 2, 
                mb: 3
              }} 
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Company
                </Typography>
                <Box sx={{ mt: 0.5 }}>
                  <Chip label={viewImage.company} color="primary" size="small" />
                           <Button
  size="small"
  startIcon={<Download />}
  onClick={() => handleDownload(viewImage.url, viewImage.fileName)}
  sx={{ color: "green" }}
>
  Download
</Button>
                </Box>
                
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Uploaded
                </Typography>
                <Typography variant="body2">
                  {new Date(viewImage.timestamp).toLocaleString()}
                </Typography>
              </Box>
              {viewImage.publicId && (
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Public ID
                  </Typography>
                  <Typography variant="body2" sx={{ wordBreak: "break-all" }}>
                    {viewImage.publicId}
                  </Typography>
                </Box>
              )}
            </Box>
          </DialogContent>
        </Dialog>
      )}
    </Container>
  );
}