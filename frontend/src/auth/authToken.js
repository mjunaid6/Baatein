let accessToken = null;

export const setToken = (token) => {
  accessToken = token;
};

export const getAccessToken = () => accessToken;