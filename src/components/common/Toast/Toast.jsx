import { toast } from 'react-toastify';

export const showToast = (state, message) => {
  const config = {
    position: "bottom-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  if (state === 'success') {
    toast.success(message, config);
  } else if (state === 'error') {
    toast.error(message, config);
  } else {
    toast(message, config);
  }
};
