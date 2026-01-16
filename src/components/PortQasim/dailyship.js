import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Stack,
  Chip,
} from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";

function DailyShippingProgram() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const colRef = collection(
          db,
          "port_companies",
          "port_qasim",
          "DailyShippingProgram"
        );

        const snapshot = await getDocs(colRef);

        const rows = [];
        snapshot.forEach((doc) => {
          if (doc.id === "last_updated") {
            setLastUpdated(doc.data()?.date);
          } else {
            rows.push({
              id: doc.id,
              ...doc.data(),
            });
          }
        });

        setRecords(rows);
      } catch (error) {
        console.error("Firestore error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const typeColor = (type) => {
    if (!type) return "default";
    if (type.toLowerCase().includes("sailing")) return "success";
    if (type.toLowerCase().includes("arrival")) return "primary";
    return "warning";
  };

  return (
    <Box p={3}>
      <Card elevation={4}>
        <CardContent>
          {/* HEADER */}
          <Stack spacing={1} mb={2}>
            <Typography variant="h5" fontWeight="bold">
              Daily Shipping Program
            </Typography>

            {lastUpdated && (
              <Typography variant="subtitle2" sx={{ color: "red" }}>
                Last Updated: <b>{lastUpdated}</b>
              </Typography>
            )}
          </Stack>

          {/* BODY */}
          {loading ? (
            <Box display="flex" justifyContent="center" py={5}>
              <CircularProgress />
            </Box>
          ) : records.length === 0 ? (
            <Typography align="center" color="text.secondary">
              No shipping records found.
            </Typography>
          ) : (
            <TableContainer component={Paper}>
              <Table size="small">
                <TableHead sx={{ backgroundColor: "#f5f7fa" }}>
                  <TableRow>
                    <TableCell><b>Type</b></TableCell>
                    <TableCell><b>Berth</b></TableCell>
                    <TableCell><b>Ship Name</b></TableCell>
                    <TableCell><b>PQA Reg No</b></TableCell>
                    <TableCell><b>Commodity</b></TableCell>
                    <TableCell><b>Manifest Qty</b></TableCell>
                    <TableCell><b>Draft FWR (m)</b></TableCell>
                    <TableCell><b>Draft Aft (m)</b></TableCell>
                    <TableCell><b>L.O.A</b></TableCell>
                    <TableCell><b>ETD</b></TableCell>
                    <TableCell><b>Ship Agent</b></TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {records.map((r) => (
                    <TableRow key={r.id} hover>
                      <TableCell>
                        <Chip
                          label={r.Type}
                          color={typeColor(r.Type)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{r.Berth}</TableCell>
                      <TableCell>{r["Ship Name"]}</TableCell>
                      <TableCell>{r["PQA Reg No"]}</TableCell>
                      <TableCell>{r.Commodity}</TableCell>
                      <TableCell>
                        {r["Manifest Qty. (Import) (Export)"]}
                      </TableCell>
                      <TableCell>{r["Draft FWR (Meters)"]}</TableCell>
                      <TableCell>{r["Draft Aft (Meters)"]}</TableCell>
                      <TableCell>{r["L.O.A"]}</TableCell>
                      <TableCell>{r.ETD}</TableCell>
                      <TableCell>{r["Ship Agent Name"]}</TableCell>
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

export default DailyShippingProgram;
