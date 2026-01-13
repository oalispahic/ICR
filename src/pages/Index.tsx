import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SmartHomeIcons from "@/components/SmartHomeIcons";
import LoginForm from "@/components/LoginForm";
import SocialLoginButtons from "@/components/SocialLoginButtons";
import { toast } from "sonner";

const Index = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (email: string, password: string) => {
    // For now, just show a toast and navigate - real auth would need Lovable Cloud
    toast.success(isSignUp ? "Account created successfully!" : "Signed in successfully!", {
      description: `Welcome, ${email}`,
    });
    navigate("/home");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-background">
      <div className="w-full max-w-sm">
        <SmartHomeIcons />

        <h1 
          className="text-2xl font-bold text-center text-foreground mb-8 animate-fade-in"
          style={{ animationDelay: "0.2s" }}
        >
          {isSignUp ? "Create your account" : "Sign in your account"}
        </h1>

        <LoginForm onSubmit={handleSubmit} />

        <div className="mt-8">
          <SocialLoginButtons />
        </div>

        <p 
          className="text-center mt-8 text-muted-foreground text-sm animate-fade-in"
          style={{ animationDelay: "0.6s" }}
        >
          {isSignUp ? "Already have an account? " : "Don't have an account? "}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="link-accent font-semibold"
          >
            {isSignUp ? "SIGN IN" : "SIGN UP"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Index;
