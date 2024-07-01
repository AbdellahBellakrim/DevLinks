import axios from "axios";

const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
const connection = import.meta.env.VITE_AUTH0_CONNECTION;
// const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL;

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`https://${domain}/oauth/token`, {
      grant_type: "password",
      email: email,
      username: email,
      password: password,
      audience: `https://${domain}/api/v2/`,
      scope: "openid profile email",
      client_id: clientId,
      connection: connection,
    });

    const { access_token, id_token, expires_in } = response.data;

    return {
      success: true,
      accessToken: access_token,
      idToken: id_token,
      expiresIn: expires_in,
    };
  } catch (error) {
    console.error(error);
  }
};

export const signUp = async (email: string, password: string) => {
  try {
    await axios.post(`https://${domain}/dbconnections/signup`, {
      client_id: clientId,
      email: email,
      password: password,
      connection: connection,
    });
    return await login(email, password);
  } catch (error) {
    console.error(error);
  }
};
