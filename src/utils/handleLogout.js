import Cookies from "js-cookie";

const handleLogout = (Auth) => {
    Auth.setAuth(false);
    Auth.setToken('');
    Auth.setScope(undefined);
    Cookies.remove("token");
};

export default handleLogout;