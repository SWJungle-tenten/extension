import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CreateGroup from "./CreateGroup";
import { createTheme } from "@mui/material";
import InviteGroup from "./InviteGroup";

const theme = createTheme({
  zIndex: {
    modal: 1060,
  },
})

export default function GroupModal(prop) {
    const { open, modaltoggle, change } = prop;

    const title = change==="group" ? "그룹 생성하기" : "그룹으로 초대하기";
    const contents = change==="group" ? <CreateGroup modaltoggle={modaltoggle}/> : <InviteGroup modaltoggle={modaltoggle}/>;
    
  return (
    <div>
      <Modal
        open={open}
        onClose={modaltoggle}
        theme={theme}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl "
        >
          <button 
          onClick={modaltoggle}
          className="absolute top-0 right-0 p-3 m-2 text-lg text-gray-400 transition-colors duration-200 transform rounded-full hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus:bg-gray-100 focus:text-gray-600">
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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
//   border: "2px solid #FF9100",
  boxShadow: 24,
  p: 4,
};
