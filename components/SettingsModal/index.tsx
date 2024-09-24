import { useState } from 'react';
import { useRouter } from "next/router";

export default function SettingsModal({ setIsOpen }: { setIsOpen: (value: boolean) => void }) {
  const [apiKey, setApiKey] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Hata mesajı durumu
  const router = useRouter();

  // API Key doğrulama işlemi
  const validateApiKey = async () => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Istanbul&appid=${apiKey}`);
      if (!response.ok) {
        throw new Error("Geçersiz API Key veya bağlantı sorunu.");
      }
      return true; // API Key geçerli
    } catch (error) {
      return false; // API Key geçersiz
    }
  };

  const handleSave = async () => {
    if (apiKey) {
      const isValid = await validateApiKey(); // API Key doğrulaması
      if (isValid) {
        sessionStorage.setItem('apiKey', apiKey);
        setIsOpen(false);
        router.push("");
      } else {
        setErrorMessage("Geçersiz API Key. Lütfen doğru bir API Key girin.");
      }
    }
  };

  return (
      <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">API Key Girişi</h2>
          <p className="text-gray-600 mb-4">
            Hava durumu bilgilerini almak için API Key'inizi girin.
            API Key'i <a href="https://home.openweathermap.org/api_keys" target="_blank" className="text-blue-500 underline">buradan</a> alabilirsiniz.
          </p>
          <input
              type="text"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="API Key girin"
              className="border p-2 w-full mb-4 rounded-lg"
          />
          {errorMessage && (
              <p className="text-red-500 mb-4">{errorMessage}</p> // Hata mesajı gösteriliyor
          )}
          <button
              onClick={handleSave}
              className="bg-blue-500 text-white p-2 rounded-lg w-full"
          >
            Kaydet
          </button>
        </div>
      </div>
  );
}
