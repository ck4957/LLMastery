import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { Provider } from "@supabase/supabase-js";

interface SocialLoginProps {
  setAuthError?: (error: string | null) => void;
}

const SocialLogin = ({ setAuthError }: SocialLoginProps) => {
  const { signInWithSocial } = useAuth();
  const [isLoading, setIsLoading] = useState<Record<Provider, boolean>>({
    google: false,
    github: false,
    twitter: false,
    azure: false,
    bitbucket: false,
    discord: false,
    facebook: false,
    figma: false,
    gitlab: false,
    keycloak: false,
    linkedin: false,
    notion: false,
    slack: false,
    spotify: false,
    twitch: false,
    workos: false,
    apple: false,
    kakao: false,
    linkedin_oidc: false,
    slack_oidc: false,
    zoom: false,
    fly: false,
  });

  const handleSocialLogin = async (provider: Provider) => {
    try {
      setIsLoading((prev) => ({ ...prev, [provider]: true }));
      if (setAuthError) setAuthError(null);
      await signInWithSocial(provider);
    } catch (error) {
      if (setAuthError) {
        setAuthError(
          `Failed to authenticate with ${provider}. Please try again.`
        );
      }
      console.error(`Error signing in with ${provider}:`, error);
    } finally {
      setIsLoading((prev) => ({ ...prev, [provider]: false }));
    }
  };

  return (
    <div className="space-y-4 w-full">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
            Or continue with
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => handleSocialLogin("google")}
          disabled={isLoading.google}
          className="flex justify-center items-center w-full py-2.5 px-4 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
        >
          {isLoading.google ? (
            <div className="h-5 w-5 border-t-2 border-b-2 border-gray-600 dark:border-gray-300 rounded-full animate-spin"></div>
          ) : (
            <svg
              width="20"
              height="20"
              fill="currentColor"
              className="text-[#4285F4]"
            >
              <path
                d="M19.99 10.187c0-.82-.069-1.417-.216-2.037H10.2v3.698h5.62c-.113.92-.725 2.303-2.084 3.233l-.02.124 3.028 2.292.21.02c1.926-1.738 3.037-4.296 3.037-7.33z"
                fill="currentColor"
              />
              <path
                d="M10.2 19.931c2.753 0 5.064-.886 6.753-2.414l-3.218-2.436c-.862.587-2.017.997-3.536.997a6.126 6.126 0 0 1-5.801-4.141l-.12.01-3.148 2.38-.041.112c1.677 3.256 5.122 5.492 9.11 5.492z"
                fill="#34A853"
              />
              <path
                d="M4.398 11.937a6.008 6.008 0 0 1-.34-1.971c0-.687.125-1.351.329-1.971l-.006-.132-3.188-2.42-.104.05A9.79 9.79 0 0 0 .001 9.965a9.79 9.79 0 0 0 1.088 4.473l3.309-2.502z"
                fill="#FBBC05"
              />
              <path
                d="M10.2 3.853c1.914 0 3.206.809 3.943 1.484l2.878-2.746C15.253.985 12.953 0 10.199 0 6.211 0 2.766 2.237 1.09 5.492l3.297 2.503A6.152 6.152 0 0 1 10.2 3.853z"
                fill="#EA4335"
              />
            </svg>
          )}
        </button>

        <button
          type="button"
          onClick={() => handleSocialLogin("facebook")}
          disabled={isLoading.facebook}
          className="flex justify-center items-center w-full py-2.5 px-4 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
        >
          {isLoading.facebook ? (
            <div className="h-5 w-5 border-t-2 border-b-2 border-gray-600 dark:border-gray-300 rounded-full animate-spin"></div>
          ) : (
            <svg
              width="20"
              height="20"
              fill="currentColor"
              className="text-[#1877F2]"
              viewBox="0 0 24 24"
            >
              <path
                d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                fill="currentColor"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
