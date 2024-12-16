import { API_URL_AUTH, API_URL } from './config';

export const state = {
  user: {},
  token: '',
  currentList: '',
  userAnswers: [],
  weekRank: [],
  userRank: {},
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

export const getCurrrentList = async function () {
  try {
    const token = JSON.parse(localStorage.getItem('token'));
    const response = await fetch(`${API_URL}exerciseList/currentList`, {
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

    state.currentList = result;
  } catch (err) {
    throw err;
  }
};

export const processAnswer = function (exerciseId, status) {
  if (exerciseId == undefined || status == undefined) return;

  let userAnswer = state.userAnswers.find((userAnswer) => {
    return userAnswer.exerciseId === exerciseId;
  });

  // if there is already an answers of this exercise on the userAnswers list
  if (userAnswer) {
    if (status === 'correct') {
      userAnswer.userResponseStatusId = 1;
      console.log(state.userAnswers);
      return;
    }

    userAnswer.userResponseStatusId = 2;
    userAnswer.errors++;
    console.log(state.userAnswers);

    return;
  }

  // when the answer is not on the userAnswers list yet

  let userResponseStatusId;
  let errors;

  if (status === 'correct') {
    errors = 0;
    userResponseStatusId = 1;
  } else {
    errors = 1;
    userResponseStatusId = 2;
  }

  userAnswer = {
    exerciseId: exerciseId,
    userId: state.user.id,
    userResponseStatusId: userResponseStatusId,
    errors: errors,
  };

  state.userAnswers.push(userAnswer);

  console.log(state.userAnswers);
};

export const allExerciseDone = function () {
  return (
    state.userAnswers.length === state.currentList.exercises.length &&
    !state.userAnswers.find((userAnswer) => {
      return userAnswer.userResponseStatusId == 2;
    })
  );
};

export const postUserAnswers = async function (userAnswers) {
  try {
    const token = JSON.parse(localStorage.getItem('token'));
    const response = await fetch(`${API_URL}userAnswer/sendAll`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userAnswers),
    });

    if (!response.ok) {
      const result = await response.json();
      throw new Error(result.message);
    }

    console.log(response);

    const result = await response.json();

    console.log(result);
  } catch (err) {
    throw err;
  }
};

export const getWeekRank = async function () {
  try {
    const token = JSON.parse(localStorage.getItem('token'));
    const response = await fetch(`${API_URL}userAnswer/weekRank`, {
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

    state.weekRank = result;

    console.log(state.weekRank);
  } catch (err) {
    throw err;
  }
};

export const getUserWeekRank = async function () {
  try {
    const token = JSON.parse(localStorage.getItem('token'));
    const response = await fetch(`${API_URL}userAnswer/userRank`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response);
    if (!response.ok) {
      const result = await response.json();
      console.log(result);
      throw new Error(result.message);
    }

    const result = await response.json();

    state.userRank = result;

    console.log(state.userRank);
  } catch (err) {
    throw err;
  }
};

export const isUserinTop10 = function () {
  return state.userRank.position !== null && state.userRank.position <= 3;
};

export const UserAlreadyDoneList = async function (exerciseListId) {
  try {
    const list = await getUserAnswersByUserAndList(exerciseListId);

    if (list.length > 0) return true;

    return false;
  } catch (err) {
    throw err;
  }
};

export const getUserAnswersByUserAndList = async function (exerciseListId) {
  try {
    const token = JSON.parse(localStorage.getItem('token'));
    const response = await fetch(`${API_URL}userAnswer/${exerciseListId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response);
    if (!response.ok) {
      const result = await response.json();
      console.log(result);
      throw new Error(result.message);
    }

    const result = await response.json();

    return result;
  } catch (err) {
    throw err;
  }
};

export const validatePassword = function (password, confirmation) {
  try {
    if (password.length < 8) {
      throw new Error('8 characters minimum per paswword');
    }

    if (password !== confirmation) {
      throw new Error('Please confirm your password');
    }
  } catch (err) {
    throw err;
  }
};

export const validateUsername = function (username) {
  try {
    if (username.length <= 5) {
      throw new Error('Username must have more than 8 characters');
    }
  } catch (err) {
    throw err;
  }
};

export const validateCountry = function (country) {
  try {
    if (country === '0') {
      throw new Error('Please select a country');
    }
  } catch (err) {
    throw err;
  }
};

export const registerUser = async function (data) {
  try {
    const response = await fetch(`${API_URL_AUTH}register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    console.log(response);

    if (!response.ok) {
      const result = await response.json();
      console.log(result);
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
