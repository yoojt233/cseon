import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import axios from "axios";
import { SET_LOGIN, SET_TOKEN } from "../redux/AccountInfo";
import { useDispatch } from "react-redux";

function RedirectPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const CODE = location.search.split("code=")[1];
  // let code = new URL(window.location.href).searchParams.get("code");

  const sendCode = () => {
    axios({
      method: "get",
      url: `/api/login/kakao/${CODE}`,
    })
      .then((res) => {
        dispatch(SET_LOGIN());
        dispatch(SET_TOKEN(res.data.token));
        navigate("/mainpage");
      })
      .catch((err) => {
        console.error(err);
        alert("kakao login 실패");
        navigate("/");
      });
  };
  useEffect(() => {
    sendCode();
  }, []);
  return <></>;
}
export default RedirectPage;
