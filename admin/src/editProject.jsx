import {
  Button,
  Card,
  Grid,
  TextField,
  Typography,
  Box,
  Select,
  MenuItem,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
const baseURL=import.meta.env.VITE_BASE_URL;


function EditProject() {
  const [Project, setProject] = useState();
  const [Team, setTeam] = useState([]);
  const [temp, setTemp] = useState("");
  const [file, setFile] = useState(null);
  const [employeesData, setEmployeesData] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (location.state?.project) {
      setProject(location.state.project);
    }
  }, [location.state]);

  useEffect(() => {
    if (Project?.team) {
      setTeam(Project.team);
    }
  }, [Project?.team]);

  useEffect(() => {
    fetch(`${baseURL}/employeesData`, {
      method: "GET",
      headers: {
        token: localStorage.getItem("token"),
      },
    }).then((res) => res.json().then((data) => setEmployeesData(data)));
  }, []);

  const renderInput = () => {
    if (Project?.file === "") {
      return (
        <Button
          variant="outlined"
          component="label"
          fullWidth
        >
          Upload File
          <input
            type="file"
            hidden
            onChange={(event) => {
              const fileInput = event.target.files[0];
              const finalFile = new File([fileInput], Project.projectName + "file");
              setFile(finalFile);
              setProject((prev) => ({
                ...prev,
                file: Project.projectName + "file",
              }));
            }}
          />
        </Button>
      );
    } else {
      return (
        <Button
          variant="contained"
          color="error"
          fullWidth
          onClick={async () => {
            await fetch(`${baseURL}/delete-file/${Project.file}`, {
              method: "DELETE",
              headers: {
                token: localStorage.getItem("token"),
              },
            });
            setProject((prev) => ({
              ...prev,
              file: "",
            }));
          }}
        >
          Delete Previous & Upload New
        </Button>
      );
    }
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 6 }, bgcolor: "#B5B5B5", minHeight: "100vh" }}>
      <Card elevation={10} sx={{ p: { xs: 2, sm: 4 }, maxWidth: "100%", mx: "auto" }}>
        <Typography variant="h5" align="center" gutterBottom>
          Project Details
        </Typography>

        <Grid container spacing={4}>
          {/* LEFT SIDE */}
          <Grid item xs={12} md={8}>
            <Typography variant="subtitle1" gutterBottom>
              Note: Project Name Cannot be Changed
            </Typography>

            <TextField
              fullWidth
              variant="standard"
              label="Project Name"
              value={Project?.projectName || ""}
              disabled
            />

            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Start Date"
                  variant="standard"
                  value={Project?.startDate || ""}
                  onChange={(e) =>
                    setProject((prev) => ({ ...prev, startDate: e.target.value }))
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Target Date"
                  variant="standard"
                  value={Project?.targetDate || ""}
                  onChange={(e) =>
                    setProject((prev) => ({ ...prev, targetDate: e.target.value }))
                  }
                />
              </Grid>
            </Grid>

            <TextField
              fullWidth
              variant="standard"
              label="Site Location"
              sx={{ mt: 2 }}
              value={Project?.siteLocation || ""}
              onChange={(e) =>
                setProject((prev) => ({ ...prev, siteLocation: e.target.value }))
              }
            />

            <Typography sx={{ mt: 3 }}>Select Team Member</Typography>
            <Select
              fullWidth
              value={temp}
              displayEmpty
              onChange={(e) => setTemp(e.target.value)}
              sx={{ my: 1 }}
            >
              <MenuItem value="" disabled>
                Select Team
              </MenuItem>
              {employeesData.map((e) => (
                <MenuItem key={e.id} value={e.id}>
                  {e.id}
                </MenuItem>
              ))}
            </Select>

            <Box display="flex" gap={1} flexWrap="wrap" mt={1}>
              <Button
                variant="contained"
                size="small"
                onClick={() => {
                  if (!temp) return alert("Please select a team member");
                  if (Team.includes(temp)) return alert("Already added");
                  setTeam([...Team, temp]);
                }}
              >
                Add
              </Button>
              <Button
                variant="outlined"
                size="small"
                onClick={() => {
                  const newTeam = [...Team];
                  newTeam.pop();
                  setTeam(newTeam);
                }}
              >
                Delete
              </Button>
              <Button
                variant="contained"
                size="small"
                color="success"
                onClick={() =>
                  setProject((prev) => ({
                    ...prev,
                    team: Team,
                  }))
                }
              >
                Upload Team
              </Button>
            </Box>

            <Card elevation={3} sx={{ mt: 2, p: 2, bgcolor: "#A9A9A9" }}>
              <Typography variant="subtitle2" gutterBottom>
                Team Members
              </Typography>
              {Team.map((e, i) => (
                <Typography key={i} fontSize="small">
                  {e}
                </Typography>
              ))}
            </Card>

            <TextField
              fullWidth
              multiline
              minRows={4}
              label="Details"
              sx={{ mt: 3 }}
              value={Project?.details || ""}
              onChange={(e) =>
                setProject((prev) => ({ ...prev, details: e.target.value }))
              }
            />

            <Typography sx={{ mt: 3 }}>Completed Percentage</Typography>
            <Select
              fullWidth
              value={Project?.completedPercentage || ""}
              onChange={(e) =>
                setProject((prev) => ({ ...prev, completedPercentage: e.target.value }))
              }
              sx={{ my: 1 }}
            >
              {[...Array(11)].map((_, i) => (
                <MenuItem key={i} value={`${i * 10}%`}>
                  {i * 10}%
                </MenuItem>
              ))}
            </Select>
          </Grid>

          {/* RIGHT SIDE */}
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Upload Project File
              </Typography>
              <Box mt={2}>{renderInput()}</Box>
            </Card>
          </Grid>
        </Grid>

        {/* Save Button */}
        <Box mt={4} display="flex" justifyContent="center">
          <Button
            variant="contained"
            size="large"
            onClick={async () => {
              if (file) {
                const formData = new FormData();
                formData.append("file", file);
                await fetch(`${baseURL}/upload/files`, {
                  method: "POST",
                  headers: {
                    token: localStorage.getItem("token"),
                  },
                  body: formData,
                });
              }

              await fetch(`${baseURL}/upload/update`, {
                method: "PUT",
                headers: {
                  token: localStorage.getItem("token"),
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(Project),
              });

              navigate("/viewProjectDetails?" + Project.projectName);
            }}
          >
            Save Changes
          </Button>
        </Box>
      </Card>
    </Box>
  );
}

export default EditProject;
