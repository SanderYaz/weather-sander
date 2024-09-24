import { CityFetch, Helper } from "@/lib";
import React from "react";
import { GiThermometerHot } from "react-icons/gi";
import { FaWind, FaMoon } from "react-icons/fa";
import { BsFillSunriseFill } from "react-icons/bs";

const WeatherStatus = ({ city }: { city: CityFetch }) => {
  const helper = new Helper();
  const weatherDescription = city.weather && city.weather[0] ? helper.capitalizeFirstLetter(city.weather[0].description) : "Bilgi yok";

  return (
      <div className="p-6">
        {/* Şehir ve Genel Hava Durumu */}
        <div className="text-center mb-6">
          <h2 className="text-4xl font-bold">{city.name}</h2>
          <p className="text-2xl text-gray-500">{weatherDescription}</p>
        </div>

        {/* Anlık Sıcaklık */}
        <div className="flex flex-col items-center mb-6">
          <GiThermometerHot className="text-7xl text-blue-500 mb-2" />
          <p className="text-xl font-semibold">Anlık Sıcaklık</p>
          <p className="text-3xl font-bold">{city.main?.temp}°C</p>
        </div>

        {/* Hissedilen Sıcaklık ve Rüzgar Hızı (Yan Yana) */}
        <div className="grid grid-cols-2 gap-4 text-center mb-6">
          <div className="flex flex-col items-center">
            <GiThermometerHot className="text-6xl text-blue-500 mb-2" />
            <p className="text-xl font-semibold">Hissedilen Sıcaklık</p>
            <p className="text-2xl font-bold">{city.main?.feels_like}°C</p>
          </div>
          <div className="flex flex-col items-center">
            <FaWind className="text-6xl text-blue-500 mb-2" />
            <p className="text-xl font-semibold">Rüzgar Hızı</p>
            <p className="text-2xl font-bold">{helper.windSpeedToMs(city.wind?.speed)} m/s</p>
          </div>
        </div>

        {/* Güneşin Doğuşu ve Batışı (Yan Yana) */}
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="flex flex-col items-center">
            <BsFillSunriseFill className="text-6xl text-blue-500 mb-2" />
            <p className="text-xl font-semibold">Güneşin Doğuşu</p>
            <p className="text-2xl font-bold">{helper.calculateHourAndMinute(city.sys?.sunrise)}</p>
          </div>
          <div className="flex flex-col items-center">
            <FaMoon className="text-6xl text-blue-500 mb-2" />
            <p className="text-xl font-semibold">Güneşin Batışı</p>
            <p className="text-2xl font-bold">{helper.calculateHourAndMinute(city.sys?.sunset)}</p>
          </div>
        </div>
      </div>
  );
};

export default WeatherStatus;
