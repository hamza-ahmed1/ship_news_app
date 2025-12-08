import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";

const newsData = [
  {
    date: "12 Feb 2025",
    companies: [
      { 
        name: "Maersk", 
        img: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=400&h=300&fit=crop",
        logo: "https://upload.wikimedia.org/wikipedia/commons/0/03/Maersk_Logo.svg"
      },
      { 
        name: "MSC", 
        img: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=400&h=300&fit=crop",
        logo: "https://upload.wikimedia.org/wikipedia/commons/0/05/MSC_logo_2017.svg"
      },
      { 
        name: "CMA CGM", 
        img: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=400&h=300&fit=crop",
        logo: "https://upload.wikimedia.org/wikipedia/commons/a/a3/CMA_CGM_logo_2013.svg"
      }
    ]
  },
  {
    date: "11 Feb 2025",
    companies: [
      { 
        name: "Hapag-Lloyd", 
        img: "https://images.unsplash.com/photo-1590433816708-f87f43fccf8b?w=400&h=300&fit=crop",
        logo: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Hapag-Lloyd_logo.svg"
      },
      { 
        name: "Evergreen", 
        img: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=300&fit=crop",
        logo: "https://upload.wikimedia.org/wikipedia/commons/2/20/Evergreen_Marine_logo.svg"
      }
    ]
  },
  {
    date: "10 Feb 2025",
    companies: [
      { 
        name: "Maersk", 
        img: "https://images.unsplash.com/photo-1568484876632-9e9d3f6072f1?w=400&h=300&fit=crop",
        logo: "https://upload.wikimedia.org/wikipedia/commons/0/03/Maersk_Logo.svg"
      },
      { 
        name: "COSCO", 
        img: "https://images.unsplash.com/photo-1600375257938-8c5c9bd16ee4?w=400&h=300&fit=crop",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/COSCO_logo.svg/320px-COSCO_logo.svg.png"
      }
    ]
  },
];

export default function LatestNews() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = React.useState("all");
  const [selectedCompany, setSelectedCompany] = React.useState("all");

  // Get unique dates
  const uniqueDates = ["all", ...newsData.map(news => news.date)];

  // Get unique company names
  const allCompanies = newsData.flatMap(news => news.companies.map(c => c.name));
  const uniqueCompanies = ["all", ...new Set(allCompanies)];

  // Filter news data
  const filteredNews = newsData
    .filter(news => selectedDate === "all" || news.date === selectedDate)
    .map(news => ({
      ...news,
      companies: news.companies.filter(
        company => selectedCompany === "all" || company.name === selectedCompany
      )
    }))
    .filter(news => news.companies.length > 0);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  const handle_home = async () => {
    navigate("/home");
  };

  return (
    <React.Fragment>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{
          fontSize: '36px',
          fontWeight: 'bold',
          background: 'linear-gradient(to right, #001A62FF, #60a5fa)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          margin: '8px'
        }}>
          Port Operations &gt; Latest Shipping News
        </h1>
        
        <Box sx={{ mb: 2 }}>
          <Button 
            variant="outlined" 
            color="error" 
            onClick={handleLogout}
            style={{ marginRight: '10px', marginLeft: '10px' }}
          >
            Logout
          </Button>
          <Button 
            variant="outlined" 
            color="primary" 
            onClick={handle_home}
          >
            Home 
          </Button>
        </Box>
        
        <p style={{ color: '#94a3b8', fontSize: '18px', margin: '10px', marginBottom: '20px' }}>
          Real-time vessel tracking and shipping management
        </p>

        {/* Filters */}
        <Grid container spacing={2} sx={{ mb: 3, ml: 0.5 }}>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              select
              fullWidth
              label="Filter by Date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              variant="outlined"
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
            >
              {uniqueCompanies.map((company) => (
                <MenuItem key={company} value={company}>
                  {company === "all" ? "All Companies" : company}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </div>

      {/* News Display */}
      {filteredNews.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 5 }}>
          <Typography variant="h6" color="text.secondary">
            No news found for the selected filters
          </Typography>
        </Box>
      ) : (
        filteredNews.map((news, index) => (
          <Box key={index} sx={{ mb: 5 }}>
            {/* Date Header */}
            <Typography
              variant="h6"
              sx={{
                mb: 2,
                color: "primary.main",
                fontWeight: 600,
                borderLeft: "4px solid #042546FF",
                pl: 1.5,
              }}
            >
              {news.date}
            </Typography>

            {/* Company Images Grid */}
            <Grid container spacing={3}>
              {news.companies.map((company, i) => (
                <Grid item xs={12} sm={6} md={4} key={i}>
                  <Card
                    sx={{
                      borderRadius: 3,
                      boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
                      transition: "0.3s",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
                      },
                    }}
                  >
                    {/* Unsplash shipping image */}
                    <CardMedia
                      component="img"
                      alt={company.name}
                      height="200"
                      image={company.img}
                      sx={{ objectFit: "cover" }}
                    />
                    <CardContent sx={{ textAlign: "center" }}>
                      {/* Company logo */}
                      <Box 
                        component="img" 
                        src={company.logo} 
                        alt={company.name}
                        sx={{ 
                          height: '40px', 
                          mb: 1,
                          objectFit: 'contain',
                          maxWidth: '100%'
                        }}
                      />
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {company.name}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        ))
      )}
    </React.Fragment>
  );
}