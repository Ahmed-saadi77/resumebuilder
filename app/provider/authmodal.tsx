"use client";

import { useModal } from "@/hooks/use-auth-modal";
import LoginForm from "../components/loginform";
import SignUpForm from "../components/signupform";

const AuthModal = () => {
  const { isOpen, type, close, open } = useModal();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 bg-opacity-20 flex justify-center items-center z-50">
      {/* Modal Content */}
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full relative z-60">
        <button
          onClick={close}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-2xl"
        >
          &times;
        </button>

        <h2 className="text-xl font-semibold mb-4 text-center">
          {type === "login" ? "Login" : "Sign Up"}
        </h2>

        {type === "login" ? (
          <LoginForm onSuccess={close} />
        ) : (
          <SignUpForm onSuccess={close} />
        )}

        <div className="text-center mt-4 text-sm">
          {type === "login" ? (
            <>
              Don&apos;t have an account?{" "}
              <button
                onClick={() => open("signup")}
                className="text-blue-600 underline"
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={() => open("login")}
                className="text-blue-600 underline"
              >
                Log In
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
