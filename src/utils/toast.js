import { toast } from 'react-toastify';

export const Toast = {
  success: {
    removed: 'removed from cart succesfully!',
    added: 'added to cart',
  },
  welcome: 'Welcome',
  error: {
    400: 'Bad Request',
    404: '404 Not Found',
    500: 'Internal error 500',
    401: 'Unauthorized',
    403: 'Forbiden',
  },
};

export const handleError = (error) => {
  if (error.response && error.response.status) {
    const statusCode = error.response.status;
    const errorMessage = Toast.error[statusCode];
    if (errorMessage) {
      toast.error(errorMessage);
    } else {
      toast.error('An error occurred');
    }
  } else {
    toast.error('An error occurred');
  }
};

export const handleSuccess = () => {
  toast.success(Toast.welcome);
};
