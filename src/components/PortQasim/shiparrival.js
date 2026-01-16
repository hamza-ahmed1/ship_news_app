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
  Chip,
  Stack
} from "@mui/material";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit
} from "firebase/firestore";
import { db } from "../../firebase/config";

function ExpectedShipArrivalAtOuterAnchorage() {
  const [arrivals, setArrivals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    const fetchArrivals = async () => {
      try {
        const colRef = collection(
          db,
          "port_companies",
          "port_qasim",
          "ExpectedShipArrivalAtOuterAnchorage"
        );

        /** 🔹 Get all records */
        const snapshot = await getDocs(colRef);
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setArrivals(data);

        /** 🔹 Get latest inserted/updated record */
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

    fetchArrivals();
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
              Expected Ship Arrivals – Outer Anchorage
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
          ) : arrivals.length === 0 ? (
            <Typography align="center" color="text.secondary">
              No expected arrivals found.
            </Typography>
          ) : (
            <TableContainer component={Paper}>
              <Table size="small">
                <TableHead sx={{ backgroundColor: "#f5f7fa" }}>
                  <TableRow>
                    <TableCell><b>Ship Name</b></TableCell>
                    <TableCell><b>Agent</b></TableCell>
                    <TableCell><b>Commodity</b></TableCell>
                    <TableCell><b>Import</b></TableCell>
                    <TableCell><b>Export</b></TableCell>
                    <TableCell><b>Arrival Date</b></TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {arrivals.map(item => (
                    <TableRow key={item.id} hover>
                      <TableCell>
                        <Typography fontWeight={600}>
                          {item["Ship Name"]}
                        </Typography>
                      </TableCell>

                      <TableCell>{item.Agent}</TableCell>

                      <TableCell>
                        <Chip
                          label={item.Commodity}
                          size="small"
                          variant="outlined"
                          color="primary"
                        />
                      </TableCell>

                      <TableCell>
                        <Chip label={item.Imp} size="small" />
                      </TableCell>

                      <TableCell>
                        <Chip label={item.Exp} size="small" color="success" />
                      </TableCell>

                      <TableCell>
                        {item["Arrival Date"]?.toDate().toLocaleString()}
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

export default ExpectedShipArrivalAtOuterAnchorage;
