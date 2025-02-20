// components/Toast.tsx
import { ToastContainer, toast, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export enum ToastType {
  SUCCESS = "success",
  ERROR = "error",
}

const defaultToastOptions: ToastOptions = {
  position: "bottom-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

const showToast = (
  message: string,
  type: ToastType,
  duration = 3000
) => {
  const options: ToastOptions = { ...defaultToastOptions, autoClose: duration };

  if (type === ToastType.SUCCESS) {
    toast.success(message, options);
  } else if (type === ToastType.ERROR) {
    toast.error(message, options);
  }
};

const CustomToast = () => {
  return (
    <ToastContainer
      toastClassName="custom-toast"
      bodyClassName="custom-toast-body"
      className="custom-toast-container"
    />
  );
};

export { showToast };
export default CustomToast;
