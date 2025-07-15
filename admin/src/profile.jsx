import { Card, Box, Typography, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
const baseURL=import.meta.env.VITE_BASE_URL;


function Profile() {
  const [data, setData] = useState({});
  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`${baseURL}/profile`, {
        method: "GET",
        headers: {
          token: localStorage.getItem("token"),
          id: localStorage.getItem("id"),
        },
      });
      const data = await response.json();
      setData(data);
      console.log(data);
    }
    fetchData();
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: "grey",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        pt: 8,
        px: 2,
      }}
    >
      <Card elevation={14} sx={{ p: 3, width: "100%", maxWidth: 500 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Profile
        </Typography>

        <Box display="flex" flexDirection="column" gap={2}>
          <Card elevation={7} sx={{ p: 2 }}>
            <strong>Name:</strong> {data.id}
          </Card>
          <Card elevation={7} sx={{ p: 2 }}>
            <strong>Age:</strong> {data.age}
          </Card>
          <Card elevation={7} sx={{ p: 2, overflowX: "auto" }}>
            <strong>Address:</strong> {data.address}
          </Card>
          <Card elevation={7} sx={{ p: 2 }}>
            <strong>Phone Number:</strong> {data.phoneNumber}
          </Card>
          <Card elevation={7} sx={{ p: 2 }}>
            <strong>Qualification:</strong> {data.qualification}
          </Card>
          <Card elevation={7} sx={{ p: 2 }}>
            <strong>Skills:</strong> {data.skills}
          </Card>
          <Card elevation={7} sx={{ p: 2 }}>
            <strong>Join Date:</strong> {data.joinDate}
          </Card>
          <Card elevation={7} sx={{ p: 2 }}>
            <strong>Reference:</strong>{" "}
            {data.linkedln && (
              <Box
                component="a"
                href={data.linkedln}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  mt: 1,
                }}
              >
                Click to view profile
                <Box
                  component="img"
                  src="https://th.bing.com/th/id/R.ef2f3c0ea2d1116f00a5bc56b8c066ce?rik=GYaDoFewrbjMYA&riu=http%3a%2f%2f1000marcas.net%2fwp-content%2fuploads%2f2020%2f01%2fLogo-Linkedin.png&ehk=S4bpGdTYO0hvPM28u%2bFMX4ma7sBWXFdx85iEGZWSx1I%3d&risl=&pid=ImgRaw&r=0"
                  alt="LinkedIn"
                  sx={{ height: 40 }}
                />
              </Box>
            )}
          </Card>
        </Box>
      </Card>
    </Box>
  );
}

export default Profile;
