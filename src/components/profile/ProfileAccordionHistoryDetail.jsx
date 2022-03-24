import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useContext } from "react";
import { Context } from "../../store";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { format } from "date-fns";

export default function HistoryDetail() {
  const { store } = useContext(Context);
  const { tasks } = store;
  const completedTasks = [];

  tasks.forEach((task) => {
    if (task.completed) {
      completedTasks.push(task);
    }
  });

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {completedTasks.length < 1 ? (
            <Typography>There are no completed tasks.</Typography>
          ) : (
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 480 }}
                size="small"
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Description</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Penalty</TableCell>
                    <TableCell>Completion Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {completedTasks.map((row) => {
                    let date = new Date(row.completion);
                    date = format(date, "E,dd-MMM-yy, h:mm a");

                    return (
                      <TableRow
                        key={row._id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell>{row.description}</TableCell>
                        <TableCell>{row.taskTag}</TableCell>
                        <TableCell>{row.financialPenalty.toString()}</TableCell>
                        <TableCell>{date}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Grid>
      </Grid>
    </>
  );
}
