import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser =
        localStorage.getItem(
          "sugarMuseUser"
        );

      return savedUser
        ? JSON.parse(savedUser)
        : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(
        "sugarMuseUser",
        JSON.stringify(user)
      );
    } else {
      localStorage.removeItem(
        "sugarMuseUser"
      );
    }
  }, [user]);

  const login = ({
    email,
    password,
  }) => {
    if (!email || !password) {
      return {
        success: false,
        message:
          "Please enter your email and password.",
      };
    }

    try {
      const savedAccount =
        localStorage.getItem(
          "sugarMuseAccount"
        );

      if (!savedAccount) {
        return {
          success: false,
          message:
            "No account found. Please create an account first.",
        };
      }

      const account =
        JSON.parse(savedAccount);

      const emailMatches =
        account.email
          .trim()
          .toLowerCase() ===
        email
          .trim()
          .toLowerCase();

      const passwordMatches =
        account.password ===
        password;

      if (
        !emailMatches ||
        !passwordMatches
      ) {
        return {
          success: false,
          message:
            "Incorrect email or password.",
        };
      }

      const loggedInUser = {
        fullName:
          account.fullName,
        email:
          account.email,
        phone:
          account.phone || "",
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
          "Unable to sign in. Please try again.",
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

  const logout = () => {
    setUser(null);

    localStorage.removeItem(
      "sugarMuseUser"
    );
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