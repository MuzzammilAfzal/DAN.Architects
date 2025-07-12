import { useLocation, useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Typography,
  Box,
  Grid,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";

function ViewProjectDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const query = location.search;
  const projectName = query.replace("?", "");
  const [project, setProject] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch("http://localhost:3000/project/projectDetails", {
      method: "GET",
      headers: {
        token: localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const match = data.find((e) => e.projectName === projectName);
        if (match) setProject(match);
      });
  }, [projectName]);

  const RenderEditButton = () => {
    if (project.completedPercentage !== "100%") {
      return (
        <Button
          variant="contained"
          sx={{ backgroundColor: "grey", mt: 2 }}
          onClick={() => navigate("/editProject", { state: { project } })}
        >
          Edit
        </Button>
      );
    } else {
      return (
        <Typography variant="subtitle2" mt={2}>
          (Note: Completed Projects Details cannot be Edited)
        </Typography>
      );
    }
  };

  return (
    <Box sx={{ p: { xs: 2, md: 6 }, bgcolor: "#B5B5B5", minHeight: "100vh" }}>
      <Card elevation={24} sx={{ p: { xs: 2, md: 4 } }}>
        <Typography variant="h5" align="center" gutterBottom>
          Project Details
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 2, fontWeight: "bold" }}>
              Project Name: {project.projectName}
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ p: 2, fontWeight: "bold" }}>
              Start Date: {project.startDate}
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ p: 2, fontWeight: "bold" }}>
              Target Date: {project.targetDate}
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <Card sx={{ p: 2, fontWeight: "bold" }}>
              Site Location: {project.siteLocation}
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Card sx={{ p: 2, fontWeight: "bold" }}>
              Team: {project?.team?.join(", ")}
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" mt={2}>
              Details
            </Typography>
            <TextField
              fullWidth
              multiline
              minRows={6}
              value={project.details || ""}
              InputProps={{ readOnly: true }}
              sx={{ mt: 1 }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Card sx={{ p: 2, fontWeight: "bold" }}>
              Percentage of Completion: {project.completedPercentage}
            </Card>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Card sx={{ p: 2, fontWeight: "bold" }}>
              Project File:
              <Button
                variant="contained"
                sx={{ ml: 2, backgroundColor: "grey" }}
                onClick={async () => {
                  if (!project.file) {
                    alert("There is no file for this project");
                    return;
                  }
                  const response = await fetch(
                    `http://localhost:3000/download/${project.file}`,
                    {
                      method: "GET",
                      headers: {
                        token: localStorage.getItem("token"),
                      },
                    }
                  );
                  const blob = await response.blob();
                  const url = window.URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = project.file;
                  document.body.appendChild(a);
                  a.click();
                  a.remove();
                }}
              >
                Click Here to Download
              </Button>
            </Card>
          </Grid>

          <Grid item xs={12} display="flex" justifyContent="center">
            {RenderEditButton()}
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
}

export default ViewProjectDetails;
