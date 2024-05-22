export const state = {
  user: {},
};

export const validateLogin = async function (data) {
  try {
    const response = await fetch(
      'https://smarterbackenddeploy.onrender.com/user/login',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      const result = await response.json();
      throw new Error(result.message);
    }

    const result = await response.json();

    state.user = {
      id: result.id,
      username: result.username,
      userPassword: result.userPassword,
    };
  } catch (err) {
    throw err;
  }
};
