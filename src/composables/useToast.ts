import { useToast, POSITION } from "vue-toastification";

export const useCartierToast = () => {
  const toast = useToast();

  const showSuccessMessage = (message: string) => {
    toast.success(message, {
      position: POSITION.BOTTOM_RIGHT,
    });
  };

  const showErrorMessage = (message: string, timeout: number = 3000) => {
    toast.error(message, {
      timeout,
      position: POSITION.BOTTOM_RIGHT,
    });
  };

  const showInfoMessage = (message: string) => {
    toast.warning(message, {
      position: POSITION.BOTTOM_RIGHT,
    });
  };

  return {
    showSuccessMessage,
    showErrorMessage,
    showInfoMessage,
  };
};
