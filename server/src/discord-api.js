require("dotenv").config();
const axios = require("axios");

const fetchGuildRole = async (
  accessToken,
  userGuilds,
  user_id,
  targetGuildId,
  refreshToken
) => {
  // Find the target guild in userGuilds array
  const targetGuild = userGuilds.find((guild) => guild.id === targetGuildId);
  console.log("Access Token:", accessToken);

  try {
    const rolesResponse = await axios.get(
      `https://discord.com/api/users/@me/guilds/${targetGuild.id}/member`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        timeout: 5000,
      }
    );

    const roles = rolesResponse.data.roles;
    console.log("Roles Response:", roles);
    return roles;
  } catch (error) {
    if (error.response && error.response.status === 401 && refreshToken) {
      // If the error is due to an expired access token and a refresh token is available, refresh the access token
      try {
        // Attempt to refresh the access token
        const refreshResponse = await axios.post(
          "http://localhost:3001/api/refresh-token", // Endpoint to refresh the access token
          {
            refresh_token: refreshToken,
          }
        );

        // Update the access token with the new one
        accessToken = refreshResponse.data.access_token;

        // Retry the original request with the new access token
        const rolesResponse = await axios.get(
          `https://discord.com/api/guilds/${targetGuild.id}/members`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            timeout: 5000,
          }
        );

        const roles = rolesResponse.data.roles;
        console.log("Refreshed Access Token Roles Response:", roles);

        return roles;
      } catch (refreshError) {
        console.error("Error refreshing access token:", refreshError.message);
        throw refreshError;
      }
    } else {
      // Handle other errors if needed
      console.error("Error fetching roles:", error.message);
      throw error;
    }
  }
};

const hasRole = (guilds, guildId, roleId) => {
  if (Array.isArray(guilds)) {
    const guild = guilds.find((guild) => guild.id === guildId);
    if (guild) {
      // Guild with matching ID found, now check if it has the specific role (roleId)
      console.log("User is in a matching Guild.");
      return true;
    }
  }
  // No guild with the specified ID found
  return false;
};

module.exports = {
  fetchGuildRole,
  hasRole,
};
