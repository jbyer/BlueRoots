import Cookies from "js-cookie";

export const getAuthToken = () => {
  return Cookies.get("token");
};

export const getUserData = () => {
  const user = Cookies.get("user");
  return user ? JSON.parse(user) : null;
};

export const isAuthenticated = () => {
  return !!getAuthToken();
};

export const logout = async () => {
  try {
    // Clear cookies
    Cookies.remove("token", { path: "/" });
    Cookies.remove("user", { path: "/" });

    // Redirect to login page
    window.location.href = "/login";
  } catch (error) {
    console.error("Logout failed:", error);
    // Fallback redirect if something goes wrong
    window.location.href = "/login";
  }
};
