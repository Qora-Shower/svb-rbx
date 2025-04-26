
import { useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "@/components/NavBar";
import { LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Login logic would go here in a real application
    console.log("Login attempt with:", { username, password });
  };

  return (
    <div className="min-h-screen bg-gray-50 font-ubuntu">
      <NavBar />
      <main className="pt-20 px-4 max-w-7xl mx-auto">
        <div className="max-w-md mx-auto bg-white rounded-xl p-8 mt-8 shadow-sm">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
              <LogIn className="h-7 w-7" />
              Login
            </h1>
            <p className="text-gray-600">Melde dich mit deinem SVB & MBU Roblox Account an</p>
          </div>
          
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
                <Link to="#" className="text-sm text-blue-600 hover:underline">
                  Passwort vergessen?
                </Link>
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
            
            <Button type="submit" className="w-full hover:bg-[#33C3F0]">
              Anmelden
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Noch kein Konto?{" "}
              <Link to="#" className="text-blue-600 hover:underline">
                Registrieren
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
