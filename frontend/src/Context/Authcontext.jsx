import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import axiosInstance from "../utils/axiosInstance";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser =
        localStorage.getItem("sugarMuseUser") ||
        localStorage.getItem("user") ||
        localStorage.getItem("adminInfo");

      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("sugarMuseUser", JSON.stringify(user));
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("isAuthenticated", "true");
      if (user.role === "admin") {
        localStorage.setItem("adminInfo", JSON.stringify(user));
      }
    } else {
      localStorage.removeItem("sugarMuseUser");
      localStorage.removeItem("user");
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("adminInfo");
    }
  }, [user]);

  const login = async ({ email, password }) => {
    if (!email || !password) {
      return {
        success: false,
        message: "Please enter your email and password.",
      };
    }

    // 1. Try real backend API first
    try {
      const { data } = await axiosInstance.post("/api/v1/login", {
        email: email.trim(),
        password,
      });

      if (data && (data.success || data.user)) {
        const u = data.user || {};
        const loggedInUser = {
          _id: u._id,
          fullName: u.name || u.fullName || "User",
          name: u.name || u.fullName || "User",
          email: u.email,
          role: u.role || "user",
          avatar: u.avatar?.url || "/images/sugar-muse-favicon.svg",
          phone: u.phone || "",
        };

        setUser(loggedInUser);
        localStorage.setItem("user", JSON.stringify(loggedInUser));
        localStorage.setItem("sugarMuseUser", JSON.stringify(loggedInUser));
        localStorage.setItem("isAuthenticated", "true");
        if (loggedInUser.role === "admin") {
          localStorage.setItem("adminInfo", JSON.stringify(loggedInUser));
        }

        return {
          success: true,
          user: loggedInUser,
        };
      }
    } catch (apiError) {
      const apiMsg = apiError.response?.data?.message;

      // 2. Fallback to localStorage account (for offline / dev mock)
      try {
        const savedAccount = localStorage.getItem("sugarMuseAccount");
        if (savedAccount) {
          const account = JSON.parse(savedAccount);
          const emailMatches =
            account.email?.trim().toLowerCase() === email.trim().toLowerCase();
          const passwordMatches = account.password === password;

          if (emailMatches && passwordMatches) {
            const localUser = {
              fullName: account.fullName,
              name: account.fullName,
              email: account.email,
              role: account.role || "user",
              phone: account.phone || "",
              avatar: "/images/sugar-muse-favicon.svg",
            };
            setUser(localUser);
            return {
              success: true,
              user: localUser,
            };
          }
        }
      } catch {
        // ignore local parse error
      }

      return {
        success: false,
        message: apiMsg || "Incorrect email or password.",
      };
    }
  };

  const register = ({
    fullName,
    email,
    phone,
    password,
    confirmPassword,
  }) => {
    if (
      !fullName ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      return {
        success: false,
        message:
          "Please complete all required fields.",
      };
    }

    if (
      password !==
      confirmPassword
    ) {
      return {
        success: false,
        message:
          "Passwords do not match.",
      };
    }

    if (
      password.length < 6
    ) {
      return {
        success: false,
        message:
          "Password must contain at least 6 characters.",
      };
    }

    try {
      const account = {
        fullName:
          fullName.trim(),
        email:
          email.trim(),
        phone:
          phone.trim(),
        password,
      };

      localStorage.setItem(
        "sugarMuseAccount",
        JSON.stringify(account)
      );

      const loggedInUser = {
        fullName:
          account.fullName,
        email:
          account.email,
        phone:
          account.phone,
      };

      setUser(loggedInUser);

      return {
        success: true,
        user: loggedInUser,
      };
    } catch {
      return {
        success: false,
        message:
          "Unable to create your account.",
      };
    }
  };

  const logout = async () => {
    try {
      await axiosInstance.post("/api/v1/logout");
    } catch {
      // ignore
    }
    setUser(null);
    localStorage.removeItem("sugarMuseUser");
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("adminInfo");
  };

  const updateUser = (
    updatedData
  ) => {
    const updatedUser = {
      ...user,
      ...updatedData,
    };

    setUser(updatedUser);

    try {
      const savedAccount =
        localStorage.getItem(
          "sugarMuseAccount"
        );

      if (!savedAccount) {
        return;
      }

      const account =
        JSON.parse(savedAccount);

      localStorage.setItem(
        "sugarMuseAccount",
        JSON.stringify({
          ...account,
          ...updatedData,
        })
      );
    } catch {
      return;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated:
          Boolean(user),
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
};

export default AuthContext;