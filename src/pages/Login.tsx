import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [timeoutEnd, setTimeoutEnd] = useState<Date | null>(null);
  const { login, loginAttempts } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      if (timeoutEnd && new Date() >= timeoutEnd) {
        setTimeoutEnd(null);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timeoutEnd]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (timeoutEnd && new Date() < timeoutEnd) {
      return;
    }

    const result = login(username, password);
    
    if (result.success) {
      toast({
        title: "Erfolgreich eingeloggt",
        description: `Willkommen zurück, ${username}!`,
      });
      navigate("/");
    } else if (result.timeoutMinutes) {
      const endTime = new Date();
      endTime.setMinutes(endTime.getMinutes() + result.timeoutMinutes);
      setTimeoutEnd(endTime);
      
      toast({
        title: "Zu viele Versuche",
        description: `Bitte warten Sie ${result.timeoutMinutes} Minute${result.timeoutMinutes > 1 ? 'n' : ''}.`,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Login fehlgeschlagen",
        description: "Benutzername oder Passwort falsch",
        variant: "destructive",
      });
    }
  };

  const handleRedirect = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open("https://discord.com/channels/1358033580068044811/1358033584170205184", "_blank");
  };

  return (
    <div className="min-h-screen bg-gray-50 font-ubuntu flex flex-col">
      <NavBar />
      <main className="pt-20 px-4 max-w-7xl mx-auto flex-grow">
        <div className="max-w-md mx-auto bg-white rounded-xl p-8 mt-8 shadow-sm">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
              <LogIn className="h-7 w-7" />
              Login
            </h1>
            <p className="text-gray-600">Melde dich mit deinem SVB & MBU Roblox Admin Account an</p>
          </div>
          
          {loginAttempts >= 6 && (
            <Alert variant="destructive" className="mb-6 animate-fade-in">
              <AlertDescription className="flex flex-col gap-2">
                <span>Zu viele fehlgeschlagene Anmeldeversuche.</span>
                <Button 
                  variant="outline" 
                  className="w-full border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                  onClick={handleRedirect}
                >
                  Passwort zurücksetzen
                </Button>
              </AlertDescription>
            </Alert>
          )}

          {timeoutEnd && (
            <Alert variant="destructive" className="mb-6 animate-fade-in">
              <AlertDescription>
                Login gesperrt für {Math.ceil((timeoutEnd.getTime() - new Date().getTime()) / 1000)} Sekunden
              </AlertDescription>
            </Alert>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-medium">
                Benutzername
              </label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium">
                  Passwort
                </label>
                <a 
                  href="#" 
                  className="text-sm text-blue-600 hover:underline"
                  onClick={handleRedirect}
                >
                  Passwort vergessen?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full"
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full hover:bg-[#33C3F0]"
              disabled={!!(timeoutEnd && new Date() < timeoutEnd)}
            >
              Anmelden
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Noch kein Konto?{" "}
              <a 
                href="#" 
                className="text-blue-600 hover:underline"
                onClick={handleRedirect}
              >
                Registrieren
              </a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
