import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import { createTheme } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const theme = createTheme({
  zIndex: {
    modal: 1060,
  },
})

export default function LoginModal(prop) {
  const { open, openToggle } = prop;
  const [login, setLogin] = useState(false);

  const handleLogin = () => {
    setLogin(!login)
  }
  const title = !login ? "로그인" : "회원가입";
  const contents = !login ? <SignIn handleLogin={handleLogin}/> : <SignUp handleLogin={handleLogin}/>;

  return (
    <div>
      <Modal
        open={open}
        theme={theme}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl "
        >
          <button
            onClick={openToggle}
            className="absolute top-0 right-0 p-3 m-2 text-lg text-gray-400 transition-colors duration-200 transform rounded-full hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus:bg-gray-100 focus:text-gray-600"
          >
            X
          </button>

          <div className="font-semibold text-center text-3xl text-orange-400">
            {title}
          </div>
            {contents}
        </Box>
      </Modal>
    </div>
  );
}
