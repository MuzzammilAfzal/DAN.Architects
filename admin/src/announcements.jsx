import { Button, Card, TextField, Box, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Announcements() {
  const navigate = useNavigate();
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!localStorage.getItem("token")) {
    return <h2>"message: unauthorized"</h2>;
  }

  const handlePublish = async () => {
    if (announcement.trim() === "") {
      alert("Note cannot be empty");
      return;
    }

    const payload = {
      announcement,
      id: localStorage.getItem("id"),
    };

    try {
      const response = await fetch("http://localhost:3000/announcements", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        navigate("/dashboard");
      } else {
        alert("Failed to publish announcement.");
      }
    } catch (err) {
      console.error(err);
      alert("Error while publishing.");
    }
  };

  return (
    <Box sx={{ px: 2, py: 8, backgroundColor: "grey", minHeight: "100vh", display: "flex", justifyContent: "center" }}>
      <Card elevation={14} sx={{ width: "100%", maxWidth: 700, p: 3 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Publish Notice
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <TextField
            multiline
            minRows={10}
            fullWidth
            placeholder="Write your announcement..."
            variant="outlined"
            onChange={(e) => setAnnouncement(e.target.value)}
          />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            sx={{ backgroundColor: "grey", color: "white", '&:hover': { backgroundColor: "#555" } }}
            onClick={handlePublish}
          >
            Publish
          </Button>
        </Box>
      </Card>
    </Box>
  );
}

export default Announcements;
