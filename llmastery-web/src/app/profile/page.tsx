"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { getUserProfile, updateUserProfile } from "@/lib/api-client";
import { UserProfile, UserSubscription } from "@/types/supabase";
import NavBar from "@/components/layout/NavBar";

const ProfilePage = () => {
  const router = useRouter();
  const { user, signOut, loading: authLoading } = useAuth();

  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [subscription, setSubscription] = useState<UserSubscription | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    bio: "",
    email: "",
  });
  const [message, setMessage] = useState({ type: "", text: "" });

  // Check if user is logged in, redirect to login if not
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  // Fetch user data when authenticated
  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      try {
        setLoading(true);

        // Get user profile data
        const profileData = await getUserProfile();
        setUserProfile(profileData);

        // Initialize form data
        if (profileData) {
          setFormData({
            username: profileData.username || "",
            fullName: profileData.full_name || "",
            bio: profileData.bio || "",
            email: user.email || "",
          });
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      setSaving(true);
      await updateUserProfile({
        username: formData.username,
        full_name: formData.fullName,
        bio: formData.bio,
      });

      setMessage({ type: "success", text: "Profile updated successfully!" });
      setIsEditing(false);

      // Refresh profile data
      const updatedProfile = await getUserProfile();
      setUserProfile(updatedProfile);
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage({
        type: "error",
        text: "Failed to update profile. Please try again.",
      });
    } finally {
      setSaving(false);

      // Clear message after 3 seconds
      setTimeout(() => {
        setMessage({ type: "", text: "" });
      }, 3000);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  const getPlanDetails = () => {
    if (!subscription)
      return {
        name: "Free Plan",
        description: "Basic access to lessons",
        color: "gray",
      };

    switch (subscription.plan_id) {
      case "basic":
        return {
          name: "Basic Plan",
          description:
            "Access to fundamental lessons and basic community features",
          color: "blue",
        };
      case "pro":
        return {
          name: "Pro Plan",
          description:
            "Full access to all lessons and priority community support",
          color: "indigo",
        };
      case "premium":
        return {
          name: "Premium Plan",
          description: "Everything in Pro plus 1-on-1 mentoring sessions",
          color: "purple",
        };
      default:
        return {
          name: subscription.plan_id || "Unknown Plan",
          description: "Subscription active",
          color: "gray",
        };
    }
  };

  const planDetails = getPlanDetails();

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Replace the custom header with the shared NavBar component */}
      <NavBar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              User Profile
            </h1>

            {/* Success or Error Message */}
            {message.text && (
              <div
                className={`mb-6 p-4 rounded-md ${
                  message.type === "success"
                    ? "bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200"
                    : "bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200"
                }`}
              >
                {message.text}
              </div>
            )}

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Left Column - User Profile Form */}
              <div className="md:col-span-2">
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
                  {isEditing ? (
                    <form onSubmit={handleSubmit}>
                      <div className="space-y-6">
                        <div>
                          <label
                            htmlFor="username"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                          >
                            Username
                          </label>
                          <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-white text-sm"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="fullName"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                          >
                            Full Name
                          </label>
                          <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-white text-sm"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="bio"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                          >
                            Bio
                          </label>
                          <textarea
                            id="bio"
                            name="bio"
                            rows={4}
                            value={formData.bio}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-white text-sm"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                          >
                            Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            readOnly
                            disabled
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-sm"
                          />
                          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                            Email cannot be changed
                          </p>
                        </div>

                        <div className="flex space-x-4">
                          <button
                            type="submit"
                            disabled={saving}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg px-4 py-2 transition-colors disabled:opacity-50"
                          >
                            {saving ? "Saving..." : "Save Changes"}
                          </button>
                          <button
                            type="button"
                            onClick={() => setIsEditing(false)}
                            className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-200 font-medium rounded-lg px-4 py-2 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                          Profile Information
                        </h3>
                        <div className="mt-4 space-y-4">
                          <div>
                            <span className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                              Username
                            </span>
                            <span className="block mt-1 text-gray-900 dark:text-white">
                              {userProfile?.username || "Not set"}
                            </span>
                          </div>
                          <div>
                            <span className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                              Full Name
                            </span>
                            <span className="block mt-1 text-gray-900 dark:text-white">
                              {userProfile?.full_name || "Not set"}
                            </span>
                          </div>
                          <div>
                            <span className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                              Bio
                            </span>
                            <span className="block mt-1 text-gray-900 dark:text-white">
                              {userProfile?.bio || "No bio provided"}
                            </span>
                          </div>
                          <div>
                            <span className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                              Email
                            </span>
                            <span className="block mt-1 text-gray-900 dark:text-white">
                              {user?.email}
                            </span>
                          </div>
                          <div>
                            <span className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                              Member Since
                            </span>
                            <span className="block mt-1 text-gray-900 dark:text-white">
                              {userProfile?.created_at
                                ? formatDate(userProfile.created_at)
                                : "Unknown"}
                            </span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => setIsEditing(true)}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg px-4 py-2 transition-colors"
                      >
                        Edit Profile
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column - Subscription Info */}
              <div>
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    Subscription
                  </h3>

                  <div
                    className={`p-4 rounded-lg border ${
                      planDetails.color === "blue"
                        ? "border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20"
                        : planDetails.color === "indigo"
                        ? "border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-900/20"
                        : planDetails.color === "purple"
                        ? "border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-900/20"
                        : "border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800/50"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4
                          className={`font-medium ${
                            planDetails.color === "blue"
                              ? "text-blue-800 dark:text-blue-300"
                              : planDetails.color === "indigo"
                              ? "text-indigo-800 dark:text-indigo-300"
                              : planDetails.color === "purple"
                              ? "text-purple-800 dark:text-purple-300"
                              : "text-gray-800 dark:text-gray-300"
                          }`}
                        >
                          {planDetails.name}
                        </h4>
                        <p
                          className={`text-sm mt-1 ${
                            planDetails.color === "blue"
                              ? "text-blue-600 dark:text-blue-400"
                              : planDetails.color === "indigo"
                              ? "text-indigo-600 dark:text-indigo-400"
                              : planDetails.color === "purple"
                              ? "text-purple-600 dark:text-purple-400"
                              : "text-gray-600 dark:text-gray-400"
                          }`}
                        >
                          {planDetails.description}
                        </p>
                      </div>
                      {planDetails.color !== "gray" && (
                        <div
                          className={`h-8 w-8 rounded-full flex items-center justify-center ${
                            planDetails.color === "blue"
                              ? "bg-blue-100 dark:bg-blue-800"
                              : planDetails.color === "indigo"
                              ? "bg-indigo-100 dark:bg-indigo-800"
                              : "bg-purple-100 dark:bg-purple-800"
                          }`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-5 w-5 ${
                              planDetails.color === "blue"
                                ? "text-blue-600 dark:text-blue-300"
                                : planDetails.color === "indigo"
                                ? "text-indigo-600 dark:text-indigo-300"
                                : "text-purple-600 dark:text-purple-300"
                            }`}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}
                    </div>

                    {subscription && (
                      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          <div className="flex justify-between mb-2">
                            <span>Status</span>
                            <span className="font-medium text-gray-800 dark:text-gray-200 capitalize">
                              {subscription.status}
                            </span>
                          </div>
                          <div className="flex justify-between mb-2">
                            <span>Current Period</span>
                            <span className="font-medium text-gray-800 dark:text-gray-200">
                              {formatDate(subscription.current_period_start)} to{" "}
                              {formatDate(subscription.current_period_end)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Auto Renewal</span>
                            <span className="font-medium text-gray-800 dark:text-gray-200">
                              {subscription.cancel_at_period_end ? "Off" : "On"}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-6">
                    <Link
                      href="/pricing"
                      className="block w-full bg-indigo-600 hover:bg-indigo-700 text-white text-center font-medium rounded-lg px-4 py-2 transition-colors"
                    >
                      {subscription ? "Manage Subscription" : "Upgrade Plan"}
                    </Link>
                  </div>
                </div>

                <div className="mt-6 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    Account Settings
                  </h3>

                  <div className="space-y-4">
                    <Link
                      href="#change-password"
                      className="block text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                    >
                      Change Password
                    </Link>
                    <Link
                      href="#notification-settings"
                      className="block text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                    >
                      Notification Settings
                    </Link>
                    <button
                      onClick={signOut}
                      className="block w-full text-left text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
