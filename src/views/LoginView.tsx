import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import { useNavigate } from "react-router-dom";
import { analytics } from "../firebase";
import { logEvent } from "firebase/analytics";

export default function LoginView() {
    const navigate = useNavigate();

    const signInWithGoogle = async () => {
        try {
          const result = await signInWithPopup(auth, provider);
          const user = result.user;
          console.log("User Info:", user);
          return user;
        } catch (error) {
          console.error("Google Sign-In Error:", error);
          throw error;
        }
    };
    const handleGoogleSignIn = async () => {
        logEvent(analytics, "button_click", {
            button_name: "Login with google",
            timestamp: new Date().toISOString(),
          });
        try {
            await signInWithGoogle();
            navigate("/dashboard");
        } catch (error) {
          console.error("Failed to sign in with Google:", error);
        }
    };
    
    return (
        <>
            <h1 className="text-center text-5xl mt-80">Login page</h1>
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded-2xl hover:bg-blue-600 mt-10 mx-auto block"
                onClick={handleGoogleSignIn}
            >
                Sign in with Google
            </button>
        </>   
    )
}