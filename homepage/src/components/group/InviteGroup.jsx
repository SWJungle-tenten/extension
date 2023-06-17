import { useState } from "react";
import Swal from "sweetalert2";
import InviteFriends from "./InviteFriends";
import axios from "axios";
import { useCookies } from "react-cookie";

export default function InviteGroup(prop) {
  const { modaltoggle } = prop;
  const [inviteEmail, setInviteEmail] = useState([]);
  const [cookies] = useCookies("accessToken");


  const submitHandler = async (event) => {
    event.preventDefault();
  };

  const a = () => {
    console.log(inviteEmail);
  };

  // API연결 해야 함
  const successInvite = async () => {
    // console.log(cookies.accessToken);
    // await axios
    //   .post(`${process.env.REACT_APP_SERVER_ADDR}/api/addGroupMember`, {
    //     email: inviteEmail,
    //     userToken: cookies.accessToken,
    //     // groupName: ,
    //   })
    //   .then((res) => {
    //     console.log(res);
    //     Swal.fire({
    //       icon: "success",
    //       title: "친구 초대 완료!",
    //     });
    //     modaltoggle();
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    // console.log(inviteEmail);
  };
  return (
    <div className="p-6  pb-0">
      <form className="space-y-1" onSubmit={submitHandler}>
        <InviteFriends
          inviteEmail={inviteEmail}
          setInviteEmail={setInviteEmail}
        />
        <div className="flex justify-end ">
          <button className="px-5" onClick={a}>
            dd
          </button>

          <button
            onClick={successInvite}
            type="submit"
            className="text-white bg-orange-400 hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-orange-300 font-semibold rounded-lg text-sm mt-4 px-5 py-2.5 dark:bg-orange-600 dark:hover:bg-orange-500 dark:focus:ring-orange-800"
          >
            친구 초대
          </button>
        </div>
      </form>
    </div>
  );
}
