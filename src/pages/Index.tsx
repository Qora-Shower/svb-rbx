
import NavBar from "@/components/NavBar";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1EAEDB] to-[#33C3F0] font-ubuntu">
      <NavBar />
      <main className="pt-20 px-4 max-w-7xl mx-auto">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 mt-8 text-white">
          <h1 className="text-4xl font-bold mb-4">Willkommen bei SVB Bus Shift</h1>
          <p className="text-xl">Wähle eine Option aus dem Menü, um zu beginnen!</p>
        </div>
      </main>
    </div>
  );
};

export default Index;
