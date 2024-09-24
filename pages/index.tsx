import { CityModal, Map, SettingsModal } from "@/components";
import { Poppins } from "next/font/google";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { cities } from "@/pages/api/cities";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function Home() {
  const router = useRouter();
  const city = router.query.city as string;
  const settings = router.query.settings as string;

  const [isModalOpen, setIsModalOpen] = useState(false); // API Key modal durumu
  const [activeTab, setActiveTab] = useState("map"); // Hangi tabın aktif olduğunu tutar
  const [selectedCity, setSelectedCity] = useState<string | null>(null); // Seçilen şehir

  useEffect(() => {
    const apiKey = sessionStorage.getItem("apiKey");
    if (!apiKey) {
      setIsModalOpen(true); // API Key yoksa modal aç
    }
  }, []);

  const handleCitySelect = (city: string) => {
    setSelectedCity(city); // Seçilen şehri günceller
    router.push(`?city=${city}`); // URL'yi günceller
  };

  return (
      <main
          className={`flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500 ${poppins.className}`}
      >
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="w-screen mt-16">
          {/* Aktif tab içerik */}
          {activeTab === "map" && <Map onClick={handleCitySelect} />}

          {activeTab === "list" && (
              <div className="flex flex-col items-center">
                <h2 className="text-2xl mb-4">Şehir Seçin</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 p-4">
                  {cities.map((cityName) => (
                      <button
                          key={cityName}
                          className="bg-white p-4 rounded-lg shadow-lg text-center hover:bg-gray-200 transition-colors"
                          onClick={() => handleCitySelect(cityName)} // Seçilen şehri günceller ve URL'ye ekler
                      >
                        {cityName}
                      </button>
                  ))}
                </div>
              </div>
          )}

          {/* Seçilen şehir modalı */}
          {selectedCity && city ? <CityModal city={city} /> : null}

          {/* API Key modalı */}
          {isModalOpen || settings === "open" ? (
              <SettingsModal setIsOpen={setIsModalOpen} />
          ) : null}
        </div>
      </main>
  );
}
