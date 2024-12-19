import { API_URL_AUTH_PROD } from '../config.js';

checkAuthToken = async function () {
  try {
    const isValid = await isTokenValid();
    console.log(window.location.href);
    if (
      isValid &&
      (window.location.href.endsWith('index.html') ||
        window.location.href.endsWith('study/'))
    ) {
      window.location.href = 'homePage.html';
    }

    if (
      !isValid &&
      !(
        window.location.href.endsWith('index.html') ||
        window.location.href.endsWith('study/')
      )
    ) {
      window.location.href = 'index.html';
    }
  } catch (err) {
    console.log(err);
  }
};

export const isTokenValid = async function () {
  try {
    const token = JSON.parse(localStorage.getItem('token'));
    const response = await fetch(`${API_URL_AUTH_PROD}tokenValid`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return false;
    }

    return true;
  } catch (err) {
    throw err;
  }
};

checkAuthToken();
