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
  Chip
} from "@mui/material";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit
} from "firebase/firestore";
import { db } from "../../firebase/config";

function OffPort() {
  const [vessels, setVessels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    const fetchOffPort = async () => {
      try {
        const colRef = collection(
          db,
          "port_companies",
          "port_qasim",
          "OffPort"
        );

        /** 🔹 All records */
        const snapshot = await getDocs(colRef);
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setVessels(data);

        /** 🔹 Latest update */
        const lastQuery = query(
          colRef,
          orderBy("timestamp", "desc"),
          limit(1)
        );

        const lastSnap = await getDocs(lastQuery);
        if (!lastSnap.empty) {
          setLastUpdated(lastSnap.docs[0].data().timestamp);
        }
      } catch (err) {
        console.error("Firestore error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOffPort();
  }, []);

  return (
    <Box p={3}>
      <Card elevation={4}>
        <CardContent>
          {/* HEADER */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", sm: "center" }}
            mb={2}
          >
            <Typography variant="h5" fontWeight="bold">
              Off-Port Vessels
            </Typography>

            {lastUpdated && (
              <Typography variant="caption" color="text.secondary">
                Last Updated:{" "}
                <b>{lastUpdated.toDate().toLocaleString()}</b>
              </Typography>
            )}
          </Stack>

          {/* BODY */}
          {loading ? (
            <Box display="flex" justifyContent="center" py={5}>
              <CircularProgress />
            </Box>
          ) : vessels.length === 0 ? (
            <Typography align="center" color="text.secondary">
              No off-port vessels found.
            </Typography>
          ) : (
            <TableContainer component={Paper}>
              <Table size="small">
                <TableHead sx={{ backgroundColor: "#f5f7fa" }}>
                  <TableRow>
                    <TableCell><b>Vessel Name</b></TableCell>
                    <TableCell><b>Agent</b></TableCell>
                    <TableCell><b>Nationality</b></TableCell>
                    <TableCell><b>Commodity</b></TableCell>
                    <TableCell><b>Draft (M)</b></TableCell>
                    <TableCell><b>PQA Reg No</b></TableCell>
                    <TableCell><b>Arrival Date & Time</b></TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {vessels.map(v => (
                    <TableRow key={v.id} hover>
                      <TableCell>
                        <Typography fontWeight={600}>
                          {v["Vessel Name"]}
                        </Typography>
                      </TableCell>

                      <TableCell>{v.Agent}</TableCell>

                      <TableCell>
                        <Chip
                          label={v.Nationality}
                          size="small"
                          variant="outlined"
                        />
                      </TableCell>

                      <TableCell>{v.Commodity}</TableCell>

                      <TableCell>
                        {Number(v["Draft(M)"]).toFixed(2)}
                      </TableCell>

                      <TableCell>{v.PQA_REG_NO}</TableCell>

                      <TableCell>
                        {v["Arrival Date & Time"]}
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

export default OffPort;
