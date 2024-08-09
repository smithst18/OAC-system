import { toast, type Content } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';


export const useToast = () => {
  
  const successToast = (msg:Content) => {
    toast.success(msg, {
      position: toast.POSITION.TOP_RIGHT,
    });
  }

  const errorToast = (msg:Content) => {
    toast.error(msg, {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
  const warnToast = (msg:Content) => {
    toast.warn(msg, {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
  const infoToast = (msg:Content) => {
    toast.info(msg, {
      position: toast.POSITION.TOP_RIGHT,
    });
  }


  return {
    successToast,
    errorToast,
    warnToast,
    infoToast,
  };
};