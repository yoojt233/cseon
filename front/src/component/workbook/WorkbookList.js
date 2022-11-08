import {
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
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { SET_WORKBOOK_INDEX } from "../../redux/WorkbookInfo";
import { getAllWorkbookList } from "../../api/workbook";

export default function WorkbookList() {
  const dispatch = new useDispatch();
  const Token = useSelector((state) => state.UserInfo.accessToken);
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    // console.log("handle", event.target);
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const onChange = (e) => {
    // console.log(e.target.value);
    setSearch(e.target.value);
  };
  const ClickTitle = (id) => {
    console.log("WorkbookTitle Click, id:", id);
    dispatch(SET_WORKBOOK_INDEX(id));
    navigate("/workbookdetail");
  };
  const ClickSearchBtn = ()=>{
    console.log("search keywork: ",search);
  }

  useEffect(() => {
    console.log("workbooklist rendering...")
    getAllWorkbookList(
      Token,
      (res) => {
        console.log("res.data:",res.data);
        // setQuestionTitle(res.data.questionTitle);
        // setQuestionExp(res.data.questionExp);
        // setAnswerRes([
        //   res.data.answerRes.answers,
        //   res.data.answerRes.rightAnswer,
        // ]);
        // console.log(res.data.answerRes);
        // console.log(answerRes[0]);
        // setAnswerList(res.data.answerRes.answers);
      },
      (err) => {
        console.log(err);
      }
    );
    setList(
      Array(53)
        .fill()
        .map(() => ({
          id: 1,
          name: "만든 유저 이름",
          title: "XX의 문제집",
        }))
    );
  }, []);
  return (
    <div>
      <div style={{ marginTop: "3vh" }}>
        {/* <input type="text" value={search} onChange={onChange} /> */}
        <TextField
          focused
          color="info"
          placeholder="문제집 검색하기"
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
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              {/* <TableCell>No</TableCell> */}
              <TableCell>번호</TableCell>
              <TableCell align="left">만든 사람</TableCell>
              <TableCell align="left">문제집 제목</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list
              .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
              .map(({ id, name, title }, i) => (
                <TableRow key={id}>
                  {/* <TableCell component="th" scope="row">
                    {page * rowsPerPage + i + 1}
                  </TableCell> */}
                  <TableCell>{id}</TableCell>
                  <TableCell align="left">{name}</TableCell>
                  <TableCell align="left" onClick={()=>ClickTitle(id)}>
                    {title}
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
    </div>
  );
}