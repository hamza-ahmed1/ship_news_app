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
} from "@mui/material";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "../../firebase/config";

/* ---------------- HELPERS ---------------- */
const formatDate = (value) => {
  if (!value) return "-";
  if (value?.toDate) return value.toDate().toLocaleDateString();
  const d = new Date(value);
  return isNaN(d) ? value : d.toLocaleDateString();
};

const formatTime = (value) => {
  if (!value) return "-";
  if (value?.toDate) {
    return value.toDate().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }
  const d = new Date(value);
  return isNaN(d)
    ? value
    : d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};
/* ----------------------------------------- */

function BerthWiseCargoHandling() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const colRef = collection(
          db,
          "port_companies",
          "port_qasim",
          "BerthWiseCargoHandling"
        );

        const snapshot = await getDocs(colRef);
        setRecords(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );

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

    fetchRecords();
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
              Berth Wise Cargo Handling
            </Typography>

            {lastUpdated && (
              <Typography variant="caption" color="text.secondary">
                Last Updated:
                <b>
                  {" "}
                  {lastUpdated.toDate().toLocaleDateString()}{" "}
                  {lastUpdated.toDate().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </b>
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
              No cargo handling records found.
            </Typography>
          ) : (
            <TableContainer component={Paper}>
              <Table size="small">
                <TableHead sx={{ backgroundColor: "#f5f7fa" }}>
                  <TableRow>
                    <TableCell><b>Berth No.</b></TableCell>
                    <TableCell><b>Name Of Ship</b></TableCell>
                    <TableCell><b>PQA Reg No</b></TableCell>
                    <TableCell><b>Berthing Date</b></TableCell>
                    <TableCell><b>Berthing Time</b></TableCell>
                    <TableCell><b>Ship Agent</b></TableCell>
                    <TableCell><b>Discharging / Loading Port</b></TableCell>
                    <TableCell><b>Commodity (Import/Export)</b></TableCell>
                    <TableCell><b>Manifest Qty</b></TableCell>
                    <TableCell><b>Cargo Handling (Last 24h)</b></TableCell>
                    <TableCell><b>Previous Unloaded</b></TableCell>
                    <TableCell><b>Previous Loaded</b></TableCell>
                    <TableCell><b>Balance Unloaded</b></TableCell>
                    <TableCell><b>Balance Loaded</b></TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {records.map((r) => {
                    const prev = r["Previous Unloaded Loaded"]?.split(" ") || [];
                    return (
                      <TableRow key={r.id} hover>
                        <TableCell>{r["Berth No."]}</TableCell>
                        <TableCell>{r["Name Of Ship"]}</TableCell>
                        <TableCell>{r["PQA Reg No"]}</TableCell>
                        <TableCell>{formatDate(r["Berthing Date"])}</TableCell>
                        <TableCell>{formatTime(r["Berthing Time"])}</TableCell>
                        <TableCell>{r["Ship Agent"]}</TableCell>
                        <TableCell>{r["Discharging/ Loading Port"]}</TableCell>
                        <TableCell>{r["Commodity (Import/Export)"]}</TableCell>
                        <TableCell>{r["Manifest Qty (Import) (Export)"]}</TableCell>
                        <TableCell>
                          {r["Cargo Handling (Last 24 Hours) Unloaded Loaded"]}
                        </TableCell>
                        <TableCell>{prev[0] || "-"}</TableCell>
                        <TableCell>{prev[1] || "-"}</TableCell>
                        <TableCell>{r["Balance Unloaded"]}</TableCell>
                        <TableCell>{r["Balance Loaded"]}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}

export default BerthWiseCargoHandling;
