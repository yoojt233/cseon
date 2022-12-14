import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import SearchIcon from "@mui/icons-material/Search";
import { getAllWorkbookList, getWorkbookWithKeyWord } from "../../api/workbook";
import { createContest } from "../../api/contest";
import { useNavigate } from "react-router";
export default function ContestCreate() {
  const navigate = useNavigate();
  const dispatch = new useDispatch();
  const Token = useSelector((state) => state.AccountInfo.accessToken);
  const [value, setValue] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");
  const [checkedworkbook, setCheckedworkbook] = useState(-1);
  const [contestTitle, setContestTitle] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const onChange = (e) => {
    setSearch(e.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const ClickSearchBtn = () => {
    if (search !== "") {
      getWorkbookWithKeyWord(
        search,
        Token,
        (res) => {
          setList(res.data);
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      getAllWorkbookList(
        Token,
        (res) => {
          setList(res.data);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  };
  // ???????????? ??????
  const handleSingleCheck = (checked, id) => {
    if (checked) {
      setCheckedworkbook(id);
    } else {
      setCheckedworkbook(-1);
    }
  };
  const timesetting = (time) => {
    function pad(n) {
      return n < 10 ? "0" + n : n;
    }
    let year = time.$y;
    let month = pad(time.$M + 1);
    let day = pad(time.$D);
    let hour = pad(time.$H);
    let minute = pad(time.$m);
    return year + "-" + month + "-" + day + "T" + hour + ":" + minute + ":00+09:00[Asia/Seoul]";
  };
  function timestamp() {
    var today = new Date();
    today.setHours(today.getHours() + 9);
    return today.toISOString().substring(0, 18) + "+09:00[Asia/Seoul]";
  }

  const ClickContestRegist = () => {
    let stime = timesetting(startTime);
    let etime = timesetting(endTime);
    let nowtime = timestamp();
    // ?????? ???????????? ????????????
    if (nowtime >= stime) alert("???????????? ?????? ??????????????????~ (?????? ???????????? ??????)");
    else if (stime >= etime) alert("?????? ?????? ?????? ??????????????????~");
    else {
      const contestReq = {
        workbookId: checkedworkbook,
        contestName: contestTitle,
        contestStart: stime,
        contestEnd: etime,
      };
      createContest(
        contestReq,
        Token,
        (res) => {
          alert("?????? ??????");
          navigate("/contestlist");
        },
        (err) => {
          console.log(err);
        }
      );
    }
  };

  useEffect(() => {
    getAllWorkbookList(
      Token,
      (res) => {
        setList(res.data);
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);
  return (
    <Box style={{ width: "100%", marginTop: "3vh" }}>
      <h1 style={{ wordBreak: "break-all" }}>
        ?????????{" "}
        <TextField
          helperText="25??? ????????? ??????????????????."
          placeholder="???????????? ??????????????????."
          style={{ width: "70%" }}
          value={contestTitle}
          onChange={(e) => {
            setContestTitle(e.target.value);
          }}
        />
      </h1>

      <h1>
        ?????? ??????{" "}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            renderInput={(props) => <TextField {...props} />}
            label="DateTimePicker"
            value={startTime}
            onChange={(newValue) => {
              setStartTime(newValue);
            }}
          />
        </LocalizationProvider>
      </h1>
      <h1>
        ?????? ??????{" "}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            renderInput={(props) => <TextField {...props} />}
            label="DateTimePicker"
            value={endTime}
            onChange={(newValue) => {
              setEndTime(newValue);
            }}
          />
        </LocalizationProvider>
      </h1>
      <h1>
        ????????? ????????????{" "}
        <div
          style={{
            margin: "auto",
            border: "1px black solid",
            width: "80%",
            padding: "2vh",
          }}
        >
          <div style={{ marginTop: "3vh" }}>
            {/* <input type="text" value={search} onChange={onChange} /> */}
            <TextField
              focused
              color="info"
              placeholder="????????? ????????????"
              value={search}
              onChange={onChange}
              id="outlined-start-adornment"
              sx={{ mb: 4, width: "40vh" }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      type="button"
                      sx={{ p: "10px" }}
                      aria-label="search"
                      onClick={ClickSearchBtn}
                    >
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <TableContainer component={Paper} sx={{ mb: 4 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  {/* <TableCell>No</TableCell> */}
                  <TableCell>??????</TableCell>
                  <TableCell align="left">?????? ??????</TableCell>
                  <TableCell align="left">????????? ??????</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {list
                  .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                  .map(({ workbookId, workbookCreatedBy, workbookName }, i) => (
                    <TableRow key={workbookId}>
                      {/* <TableCell component="th" scope="row">
                    {page * rowsPerPage + i + 1}
                  </TableCell> */}
                      <TableCell>{workbookId}</TableCell>
                      <TableCell align="left">{workbookCreatedBy}</TableCell>
                      <TableCell align="left">{workbookName}</TableCell>
                      <TableCell align="left">
                        <input
                          type="checkbox"
                          name={workbookName}
                          onChange={(e) => handleSingleCheck(e.target.checked, workbookId)}
                          // ????????? ????????? ????????? ?????? ???????????? ?????? ?????? ?????? ?????????, ?????? ??? ??????
                          checked={checkedworkbook === workbookId ? true : false}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    count={list.length}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </div>{" "}
      </h1>
      <Button
        variant="contained"
        size="large"
        onClick={ClickContestRegist}
        sx={{ color: "#64b5f6" }}
      >
        ?????????
      </Button>
    </Box>
  );
}
