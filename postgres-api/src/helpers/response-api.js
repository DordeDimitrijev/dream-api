const responseApi = (status, result, message) => {
  if (status >= 400 && message) {
    return {
      status,
      error: {
        errorMessage: message,
      },
    };
  }
  if (result >= 400) {
    return {
      status,
      error: result,
    };
  }
  if ((status) => 200 && status < 300 && message) {
    return {
      status,
      message,
      data: result,
    };
  }

  if ((status) => 200 && status < 300) {
    return {
      status,
      data: result,
    };
  }
};

export { responseApi };
