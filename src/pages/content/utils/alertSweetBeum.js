import Swal from "sweetalert2"

const alertSweetBeum = (sweet, type) => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
    if(sweet === "성공"){

        Toast.fire({
          icon: 'success',
          title: `${type} 스크랩 완료!`
        })
    }
    else{
        Toast.fire({
            icon: 'error',
            title: `${type} 스크랩 실패!`
          })
    }  
}

export default alertSweetBeum;
