"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Shield,
  Bell,
  Lock,
  Upload,
  Save,
  Eye,
  EyeOff,
  CheckCircle,
} from "lucide-react";
import { getUserData } from "@/lib/auth";
import api from "@/utils/api";
import { toast } from "@/hooks/use-toast";

export function AdminUserProfile() {
  const [activeTab, setActiveTab] = useState("profile");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@blueroot.org",
    phone: "(555) 123-4567",
    title: "Campaign Manager",
    department: "Operations",
    bio: "Experienced campaign manager with 8+ years in Democratic politics and grassroots organizing.",
    address: "123 Democracy Ave",
    city: "Washington",
    state: "DC",
    zipCode: "20001",
    timezone: "America/New_York",
  });
  const [user, setUser] = useState(null);
  const picture = user?.picture || "/placeholder.svg?height=80&width=80";
  const email = user?.email;

  const [loading, setLoading] = useState(true);

  const [notificationSettings, setNotificationSettings] = useState({
    email_notification: true,
    campaign_update: true,
    donation_alert: true,
    push_notification: true, // Add this for push notifications
    push_campaign_update: true, // Add this for push campaign updates
    push_donation_alert: true, // Add this for push donation alerts
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = getUserData();
        setUser(userData);

        if (userData?.email) {
          const response = await api.get(`/api/v1/settings/${userData.email}`);
          
          setNotificationSettings({
            email_notification: response.email_notification,
            campaign_update: response.campaign_update,
            donation_alert: response.donation_alert,
          });
        }
      } catch (error) {
        console.error("Failed to fetch settings:", error);
        toast({
          title: "Error",
          description: "Failed to load notification settings",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleNotificationToggle = async (field: string, value: boolean) => {
    try {
      if (!user?.email) return;

      // Optimistic UI update
      setNotificationSettings((prev) => ({ ...prev, [field]: value }));

      // API call to update settings - we'll send only the changed field
      await api.patch(`/api/v1/settings/${user.email}`, {
        [field]: value,
      });

      toast({
        title: "Success",
        description: "Notification settings updated",
      });
    } catch (error) {
      // Revert on error
      setNotificationSettings((prev) => ({ ...prev, [field]: !value }));
      toast({
        title: "Error",
        description: "Failed to update settings",
        variant: "destructive",
      });
    }
  };
  
  useEffect(() => {
    setUser(getUserData());
  }, []);

  console.log("User data:", user);

  const [notifications, setNotifications] = useState({
    emailCampaigns: true,
    emailDonations: true,
    emailReports: false,
    pushCampaigns: true,
    pushDonations: false,
    pushReports: true,
  });

  const [security, setSecurity] = useState({
    twoFactorEnabled: true,
    sessionTimeout: "4",
    loginAlerts: true,
  });

  const handleProfileUpdate = (field: string, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNotificationUpdate = (field: string, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [field]: value }));
  };

  const handleSecurityUpdate = (field: string, value: string | boolean) => {
    setSecurity((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Profile Info</TabsTrigger>
          <TabsTrigger value="account">Account Settings</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          {/* <TabsTrigger value="security">Security</TabsTrigger> */}
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <div className="grid gap-6">
            {/* Profile Picture Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profile Picture
                </CardTitle>
                <CardDescription>
                  Upload a professional photo for your admin profile
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={picture} alt="Profile Picture" />
                    <AvatarFallback className="text-lg">SJ</AvatarFallback>
                  </Avatar>
                  {/* <div className="space-y-2">
                    <Button variant="outline" size="sm">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload New Photo
                    </Button>
                    <p className="text-sm text-muted-foreground">JPG, PNG or GIF. Max size 2MB.</p>
                  </div> */}
                </div>
              </CardContent>
            </Card>

            {/* Personal Information */}
            {/* <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details and contact information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={profileData.firstName}
                      onChange={(e) => handleProfileUpdate("firstName", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={profileData.lastName}
                      onChange={(e) => handleProfileUpdate("lastName", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => handleProfileUpdate("email", e.target.value)}
                    />
                    <Badge variant="secondary" className="text-green-600">
                      <CheckCircle className="mr-1 h-3 w-3" />
                      Verified
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => handleProfileUpdate("phone", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Job Title</Label>
                    <Input
                      id="title"
                      value={profileData.title}
                      onChange={(e) => handleProfileUpdate("title", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Select
                      value={profileData.department}
                      onValueChange={(value) => handleProfileUpdate("department", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Operations">Operations</SelectItem>
                        <SelectItem value="Finance">Finance</SelectItem>
                        <SelectItem value="Communications">Communications</SelectItem>
                        <SelectItem value="Technology">Technology</SelectItem>
                        <SelectItem value="Legal">Legal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell us about yourself..."
                    value={profileData.bio}
                    onChange={(e) => handleProfileUpdate("bio", e.target.value)}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card> */}

            {/* Address Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Address Information
                </CardTitle>
                <CardDescription>
                  Your work address and location details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Street Address</Label>
                  <Input
                    id="address"
                    value={profileData.address}
                    onChange={(e) =>
                      handleProfileUpdate("address", e.target.value)
                    }
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={profileData.city}
                      onChange={(e) =>
                        handleProfileUpdate("city", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      value={profileData.state}
                      onChange={(e) =>
                        handleProfileUpdate("state", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">ZIP Code</Label>
                    <Input
                      id="zipCode"
                      value={profileData.zipCode}
                      onChange={(e) =>
                        handleProfileUpdate("zipCode", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select
                    value={profileData.timezone}
                    onValueChange={(value) =>
                      handleProfileUpdate("timezone", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/New_York">
                        Eastern Time
                      </SelectItem>
                      <SelectItem value="America/Chicago">
                        Central Time
                      </SelectItem>
                      <SelectItem value="America/Denver">
                        Mountain Time
                      </SelectItem>
                      <SelectItem value="America/Los_Angeles">
                        Pacific Time
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* <div className="flex justify-end">
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Save Profile Changes
              </Button>
            </div> */}
          </div>
        </TabsContent>

        <TabsContent value="account" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>
                Manage your account preferences and settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="text-sm font-medium">Account Status</h4>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Account Type</p>
                    <p className="text-sm text-muted-foreground">
                      Administrator
                    </p>
                  </div>
                  <Badge variant="default">Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Member Since</p>
                    <p className="text-sm text-muted-foreground">
                      January 15, 2023
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-medium">Preferences</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Email Digest</p>
                      <p className="text-sm text-muted-foreground">
                        Receive daily summary emails
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Auto-save Drafts</p>
                      <p className="text-sm text-muted-foreground">
                        Automatically save campaign drafts
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
              <CardDescription>
                Choose how you want to be notified about important updates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5, 6].map((item) => (
                    <div
                      key={item}
                      className="flex items-center justify-between"
                    >
                      <div className="space-y-2">
                        <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-3 w-48 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                      <div className="h-6 w-11 bg-gray-200 rounded-full animate-pulse"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium">Email Notifications</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="text-sm font-medium">
                            Email Notifications
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Enable all email notifications
                          </p>
                        </div>
                        <Switch
                          checked={notificationSettings.email_notification}
                          onCheckedChange={(checked) =>
                            handleNotificationToggle(
                              "email_notification",
                              checked
                            )
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="text-sm font-medium">
                            Campaign Updates
                          </p>
                          <p className="text-sm text-muted-foreground">
                            New campaigns and status changes
                          </p>
                        </div>
                        <Switch
                          checked={notificationSettings.campaign_update}
                          onCheckedChange={(checked) =>
                            handleNotificationToggle("campaign_update", checked)
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Donation Alerts</p>
                          <p className="text-sm text-muted-foreground">
                            New donations and milestones
                          </p>
                        </div>
                        <Switch
                          checked={notificationSettings.donation_alert}
                          onCheckedChange={(checked) =>
                            handleNotificationToggle("donation_alert", checked)
                          }
                        />
                      </div>
                    </div>
                  </div>

                  {/* <div className="space-y-4">
                    <h4 className="text-sm font-medium">Push Notifications</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="text-sm font-medium">
                            Push Notifications
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Enable all push notifications
                          </p>
                        </div>
                        <Switch
                          checked={notificationSettings.push_notification}
                          onCheckedChange={(checked) =>
                            handleNotificationToggle(
                              "push_notification",
                              checked
                            )
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="text-sm font-medium">
                            Campaign Updates
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Urgent campaign notifications
                          </p>
                        </div>
                        <Switch
                          checked={notificationSettings.push_campaign_update}
                          onCheckedChange={(checked) =>
                            handleNotificationToggle(
                              "push_campaign_update",
                              checked
                            )
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Donation Alerts</p>
                          <p className="text-sm text-muted-foreground">
                            Large donation notifications
                          </p>
                        </div>
                        <Switch
                          checked={notificationSettings.push_donation_alert}
                          onCheckedChange={(checked) =>
                            handleNotificationToggle(
                              "push_donation_alert",
                              checked
                            )
                          }
                        />
                      </div>
                    </div>
                  </div> */}
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* <TabsContent value="security" className="space-y-4">
          <div className="grid gap-6">
            Password Change
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Change Password
                </CardTitle>
                <CardDescription>
                  Update your password to keep your account secure
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <div className="relative">
                    <Input
                      id="currentPassword"
                      type={showCurrentPassword ? "text" : "password"}
                      placeholder="Enter current password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() =>
                        setShowCurrentPassword(!showCurrentPassword)
                      }
                    >
                      {showCurrentPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <div className="relative">
                    <Input
                      id="newPassword"
                      type={showNewPassword ? "text" : "password"}
                      placeholder="Enter new password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm new password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <Button>Update Password</Button>
              </CardContent>
            </Card>

            Security Settings
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security Settings
                </CardTitle>
                <CardDescription>
                  Configure additional security measures for your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">
                      Two-Factor Authentication
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={security.twoFactorEnabled}
                      onCheckedChange={(checked) =>
                        handleSecurityUpdate("twoFactorEnabled", checked)
                      }
                    />
                    {security.twoFactorEnabled && (
                      <Badge variant="secondary" className="text-green-600">
                        <CheckCircle className="mr-1 h-3 w-3" />
                        Enabled
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Session Timeout</Label>
                  <Select
                    value={security.sessionTimeout}
                    onValueChange={(value) =>
                      handleSecurityUpdate("sessionTimeout", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 hour</SelectItem>
                      <SelectItem value="2">2 hours</SelectItem>
                      <SelectItem value="4">4 hours</SelectItem>
                      <SelectItem value="8">8 hours</SelectItem>
                      <SelectItem value="24">24 hours</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">
                    Automatically log out after this period of inactivity
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Login Alerts</p>
                    <p className="text-sm text-muted-foreground">
                      Get notified of new login attempts
                    </p>
                  </div>
                  <Switch
                    checked={security.loginAlerts}
                    onCheckedChange={(checked) =>
                      handleSecurityUpdate("loginAlerts", checked)
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent> */}
      </Tabs>
    </div>
  );
}
