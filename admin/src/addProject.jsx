import { Button, Card, TextField, Grid, Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const baseURL=import.meta.env.VITE_BASE_URL;

function AddProject() {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:768px)");

  const [Project, setProject] = useState({
    projectName: "",
    startDate: "",
    targetDate: "",
    siteLocation: "",
    team: null,
    details: "",
    completedPercentage: "0%",
    file: "",
  });

  const [employeesData, setemployeesData] = useState([]);
  const [Team, setTeam] = useState([]);
  const [temp, settemp] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    fetch(`${baseURL}/employeesData`, {
      method: "GET",
      headers: {
        token: localStorage.getItem("token"),
      },
    }).then((response) => {
      response.json().then((data) => {
        setemployeesData(data);
      });
    });
  }, []);

  return (
    <Box sx={{ p: isMobile ? 2 : 6, background: "#B5B5B5", minHeight: "100vh" }}>
      <Card elevation={6} sx={{ p: isMobile ? 2 : 4 }}>
        <Box textAlign="center" mb={3}>
          <h3>Project Details</h3>
        </Box>
        <Grid container spacing={4}>
          {/* LEFT SIDE */}
          <Grid item xs={12} md={7}>
            <TextField
              fullWidth
              label="Project Name"
              variant="standard"
              onChange={(e) => {
                const value = e.target.value.replace(" ", "_");
                setProject((prev) => ({ ...prev, projectName: value }));
              }}
            />
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Start Date"
                  variant="standard"
                  onChange={(e) => setProject((prev) => ({ ...prev, startDate: e.target.value }))}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Target Date"
                  variant="standard"
                  onChange={(e) => setProject((prev) => ({ ...prev, targetDate: e.target.value }))}
                />
              </Grid>
            </Grid>

            <TextField
              fullWidth
              label="Site Location"
              variant="standard"
              sx={{ mt: 2 }}
              onChange={(e) => setProject((prev) => ({ ...prev, siteLocation: e.target.value }))}
            />

            <Box mt={3}>
              <label>Select Team Members:</label>
              <select
                onChange={() => settemp(document.getElementById("team").value)}
                id="team"
                defaultValue=""
              >
                <option value="" disabled hidden>Team</option>
                {employeesData.map((e) => (
                  <option key={e.id} value={e.id}>{e.id}</option>
                ))}
              </select>

              <Box mt={1} display="flex" gap={2}>
                <Button
                  variant="contained"
                  sx={{ background: "grey" }}
                  onClick={() => {
                    if (temp === "") return alert("Please select a team member");
                    if (Team.includes(temp)) return alert("Team member already added");
                    setTeam((prev) => [...prev, temp]);
                  }}
                >
                  Add
                </Button>
                <Button
                  variant="contained"
                  sx={{ background: "grey" }}
                  onClick={() => {
                    if (Team.length === 0) return;
                    setTeam((prev) => prev.slice(0, -1));
                  }}
                >
                  Delete
                </Button>
              </Box>

              <Card elevation={3} sx={{ mt: 2, p: 2, height: 200, overflow: "auto", background: "#A9A9A9" }}>
                <h4>Team Members</h4>
                {Team.map((e, idx) => (
                  <div key={idx}>{e}</div>
                ))}
              </Card>

              <Button
                variant="contained"
                sx={{ mt: 2, background: "grey" }}
                onClick={() => {
                  if (!Team.length) return alert("No team members selected");
                  setProject((prev) => ({ ...prev, team: Team }));
                }}
              >
                Upload Team Members
              </Button>
            </Box>

            <Box mt={4}>
              <h3>Details</h3>
              <textarea
                style={{ width: "100%", height: 200 }}
                onChange={(e) => setProject((prev) => ({ ...prev, details: e.target.value }))}
              />
            </Box>

            <Box mt={3}>
              <h3>Completed Percentage</h3>
              <select
                onChange={(e) =>
                  setProject((prev) => ({ ...prev, completedPercentage: e.target.value }))
                }
                defaultValue="0%"
              >
                {[...Array(11)].map((_, i) => (
                  <option key={i} value={`${i * 10}%`}>
                    {i * 10}%
                  </option>
                ))}
              </select>
            </Box>
          </Grid>

          {/* RIGHT SIDE */}
          <Grid item xs={12} md={5}>
            <Card elevation={3} sx={{ p: 2, mb: 4 }}>
              <h4>Upload Single Project File</h4>
              <input
                type="file"
                onChange={(e) => {
                  const fileInput = e.target.files[0];
                  if (!fileInput) return;
                  const finalFile = new File([fileInput], Project.projectName + "file");
                  setFile(finalFile);
                  setProject((prev) => ({ ...prev, file: Project.projectName + "file" }));
                }}
              />
            </Card>
          </Grid>
        </Grid>

        <Box textAlign="center" mt={4}>
          <Button
            variant="contained"
            sx={{ background: "grey" }}
            onClick={async () => {
              if (!Project.team || Project.team.length === 0) {
                return alert("Please select and upload at least one team member");
              }

              const formData = new FormData();
              formData.append("file", file);

              const uploadRes = await fetch(`${baseURL}/upload/files`, {
                method: "POST",
                headers: {
                  token: localStorage.getItem("token"),
                },
                body: formData,
              });
              const uploadData = await uploadRes.json();

              const projectRes = await fetch(`${baseURL}/upload/projectDetails`, {
                method: "POST",
                headers: {
                  token: localStorage.getItem("token"),
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(Project),
              });
              const projectData = await projectRes.json();

              navigate("/dashboard");
            }}
          >
            Add Project
          </Button>
        </Box>
      </Card>
    </Box>
  );
}

export default AddProject;
