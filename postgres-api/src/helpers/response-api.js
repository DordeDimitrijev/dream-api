const responseApi = (status, data, message) => {
  if (status >= 400 && message) {
    return {
      status,
      error: {
        message,
      },
    };
  } else if (status >= 400) {
    return {
      status,
      error: {
        type: data.name,
        message: data.message,
      },
    };
  } else if (status >= 200 && status < 300 && message) {
    return {
      status,
      message,
      data,
    };
  } else if (status >= 200 && status < 300) {
    return {
      status,
      data,
    };
  }
};

export { responseApi };
