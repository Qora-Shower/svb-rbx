
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Settings as SettingsIcon, User, Shield, Bell, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const Settings = () => {
  const { user } = useAuth();
  const [displayName, setDisplayName] = useState(user?.username || "");
  const [email, setEmail] = useState("user@example.com");
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    shiftReminders: true,
    newsUpdates: false,
  });
  const { toast } = useToast();
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  const handleSaveProfile = () => {
    toast({
      title: "Profil aktualisiert",
      description: "Deine Profileinstellungen wurden erfolgreich gespeichert.",
    });
  };
  
  const handleSaveNotifications = () => {
    toast({
      title: "Benachrichtigungen aktualisiert",
      description: "Deine Benachrichtigungseinstellungen wurden erfolgreich gespeichert.",
    });
  };
  
  const handleSaveSecurity = () => {
    toast({
      title: "Sicherheitseinstellungen aktualisiert",
      description: "Deine Sicherheitseinstellungen wurden erfolgreich gespeichert.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 font-ubuntu flex flex-col">
      <NavBar />
      <main className="pt-20 px-4 max-w-7xl mx-auto flex-grow">
        <div className="bg-white rounded-xl p-6 mt-8 shadow-sm mb-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2 text-gray-900 flex items-center gap-2">
              <SettingsIcon className="h-8 w-8" />
              Einstellungen
            </h1>
            <p className="text-gray-600">
              Verwalte deine Kontoeinstellungen und Präferenzen.
            </p>
          </div>
          
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>Profil</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                <span>Benachrichtigungen</span>
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span>Sicherheit</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profilinformationen</CardTitle>
                  <CardDescription>
                    Aktualisiere deine persönlichen Informationen und Profileinstellungen.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Benutzername</Label>
                    <Input
                      id="username"
                      value={user.username}
                      disabled
                      className="bg-gray-100"
                    />
                    <p className="text-xs text-gray-500">Der Benutzername kann nicht geändert werden.</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="displayName">Anzeigename</Label>
                    <Input
                      id="displayName"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">E-Mail Adresse</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSaveProfile} className="flex items-center gap-2">
                    <Save className="h-4 w-4" />
                    <span>Änderungen speichern</span>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Benachrichtigungseinstellungen</CardTitle>
                  <CardDescription>
                    Lege fest, welche Benachrichtigungen du erhalten möchtest.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">E-Mail Benachrichtigungen</p>
                      <p className="text-sm text-gray-500">Erhalte wichtige Informationen per E-Mail.</p>
                    </div>
                    <Switch
                      checked={notifications.emailNotifications}
                      onCheckedChange={(checked) => setNotifications({...notifications, emailNotifications: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Schicht-Erinnerungen</p>
                      <p className="text-sm text-gray-500">Erhalte Erinnerungen vor deinen Schichten.</p>
                    </div>
                    <Switch
                      checked={notifications.shiftReminders}
                      onCheckedChange={(checked) => setNotifications({...notifications, shiftReminders: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">News & Updates</p>
                      <p className="text-sm text-gray-500">Erhalte Informationen über Neuigkeiten und Updates.</p>
                    </div>
                    <Switch
                      checked={notifications.newsUpdates}
                      onCheckedChange={(checked) => setNotifications({...notifications, newsUpdates: checked})}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSaveNotifications} className="flex items-center gap-2">
                    <Save className="h-4 w-4" />
                    <span>Änderungen speichern</span>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Sicherheitseinstellungen</CardTitle>
                  <CardDescription>
                    Verwalte dein Passwort und die Sicherheitseinstellungen deines Kontos.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Aktuelles Passwort</Label>
                    <Input
                      id="currentPassword"
                      type="password"
                      placeholder="••••••••"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">Neues Passwort</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      placeholder="••••••••"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Passwort bestätigen</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSaveSecurity} className="flex items-center gap-2">
                    <Save className="h-4 w-4" />
                    <span>Passwort ändern</span>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Settings;
