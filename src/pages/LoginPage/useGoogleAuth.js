import { useEffect, useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useGoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import authService from "../../services/authService";
import { checkAuth } from "../../app/slices/authSlice";

const BASE_URL = window.location.origin;

export const useGoogleAuth = (redirectPath = "/login") => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const [isProcessing, setIsProcessing] = useState(false);
  const hasProcessedCode = useRef(false);
  
  const REDIRECT_URI = `${BASE_URL}${redirectPath}`;

  // Handle Google OAuth callback
  useEffect(() => {
    const handleGoogleCallback = async () => {
      const code = searchParams.get("code");

      // If we have a code and haven't processed it yet
      if (code && !hasProcessedCode.current) {
        hasProcessedCode.current = true;
        setIsProcessing(true);

        try {
          console.log("Processing Google OAuth callback...");

          // Call the backend with the code
          const response = await authService.loginWithGoogle(
            code,
            REDIRECT_URI
          );

          // Store the token
          if (response.token) {
            localStorage.setItem("token", response.token);
            localStorage.setItem("userToken", response.token);
            
            // Fetch user profile to update Redux state
            try {
              await dispatch(checkAuth()).unwrap();
              toast.success("Login successful!");
              navigate("/", { replace: true });
            } catch (err) {
              console.error("Failed to fetch profile:", err);
              toast.success("Login successful!");
              navigate("/", { replace: true });
            }
          } else {
            throw new Error("No token received");
          }
        } catch (error) {
          console.error("Google login failed:", error);
          toast.error(error.response?.data?.message || "Google login failed");
          hasProcessedCode.current = false;
          setIsProcessing(false);
          // Clear the URL params to allow retry
          navigate("/login", { replace: true });
        }
        return;
      }

      // Check if user is already logged in (only if no code present)
      if (!code) {
        const token = localStorage.getItem("token");
        if (token) {
          try {
            const decoded = jwtDecode(token);

            if (decoded.exp * 1000 > Date.now()) {
              navigate("/");
            } else {
              localStorage.removeItem("token");
              localStorage.removeItem("userToken");
            }
          } catch (err) {
            console.error("Invalid token:", err);
            localStorage.removeItem("token");
            localStorage.removeItem("userToken");
          }
        }
      }
    };

    handleGoogleCallback();
  }, [navigate, dispatch, searchParams, REDIRECT_URI]);

  // Initialize Google login
  const login = useGoogleLogin({
    flow: "auth-code",
    ux_mode: "redirect",
    redirect_uri: REDIRECT_URI,
    onSuccess: (tokenResponse) => {
      console.log("Google login initiated:", tokenResponse);
    },
    onError: () => {
      console.error("Google login failed");
      toast.error("Failed to initiate Google login");
    },
  });

  const initiateGoogleLogin = () => {
    login();
  };

  return {
    isProcessing,
    initiateGoogleLogin,
  };
};
