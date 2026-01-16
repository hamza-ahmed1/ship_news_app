import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Stack,
  Link,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
} from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";

function PortQasimReports() {
  const [reports, setReports] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const colRef = collection(
          db,
          "port_companies",
          "port_qasim",
          "reports"
        );

        const snapshot = await getDocs(colRef);
        setReports(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      } catch (error) {
        console.error("Firestore error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  /* 🔍 Search filter */
  const filteredReports = reports.filter((r) =>
    `${r["Publish date"]} ${r.link}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <Box p={3}>
      <Card elevation={4}>
        <CardContent>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems="center"
            mb={2}
            spacing={2}
          >
            <Typography variant="h5" fontWeight="bold">
              Daily Shipping and Cargo Handling Reports
            </Typography>

            <TextField
              size="small"
              label="Search reports"
              placeholder="Search by date or link"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Stack>

          {loading ? (
            <Box display="flex" justifyContent="center" py={4}>
              <CircularProgress />
            </Box>
          ) : filteredReports.length === 0 ? (
            <Typography align="center" color="text.secondary">
              No matching reports found.
            </Typography>
          ) : (
            <TableContainer component={Paper}>
              <Table size="small">
                <TableHead sx={{ backgroundColor: "#f5f7fa" }}>
                  <TableRow>
                    <TableCell><b>Publish Date</b></TableCell>
                    <TableCell><b>Report Link</b></TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {filteredReports.map((r) => (
                    <TableRow key={r.id} hover>
                      <TableCell>{r["Publish date"]}</TableCell>
                      <TableCell>
                        <Link
                          href={r.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          underline="hover"
                          fontWeight="bold"
                        >
                          View Report
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}

export default PortQasimReports;
