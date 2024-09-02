import { API_URL_AUTH, API_URL } from './config';

export const state = {
  user: {},
  token: '',
};

export const validateLogin = async function (data) {
  try {
    const response = await fetch(`${API_URL_AUTH}authenticate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const result = await response.json();
      throw new Error(result.message);
    }

    console.log(response);

    const result = await response.json();

    console.log(result);

    state.token = result.token;
  } catch (err) {
    throw err;
  }
};

export const getLoggedUser = async function () {
  try {
    const token = JSON.parse(localStorage.getItem('token'));
    const response = await fetch(`${API_URL}user/logged`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const result = await response.json();
      throw new Error(result.message);
    }

    const result = await response.json();

    const user = result;

    state.user = {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username,
      country: user.country,
    };
  } catch (err) {
    throw err;
  }
};
