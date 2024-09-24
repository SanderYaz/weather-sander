import { CityFetch, FetchError, WeatherServiceFetch } from "..";

export default class WeatherService {
  private BASE_URL: string = "https://api.openweathermap.org/data/2.5/weather"; // OpenWeatherMap API URL
  private API_KEY = sessionStorage.getItem('apiKey'); // API key sessionStorage'dan alınıyor


  /* `genericCityFetch` metodu API'den şehir bazlı hava durumu verilerini çeker. Eğer bir hata oluşursa,
   bir hata mesajı döner. */
  private genericCityFetch = async (
      endpoint: string
  ): Promise<CityFetch | FetchError> => {
    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error("Veriler alınamadı");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return { cod: "404", message: "Hava durumu verileri alınamadı" };
    }
  };

  fetch: WeatherServiceFetch = {
    /* `cityOpenWeather`: Şehir ismine göre OpenWeatherMap API'den hava durumu verisi çeker. */
    cityOpenWeather: async (city: string): Promise<CityFetch | FetchError> => {
      const endpoint = `${this.BASE_URL}?q=${city}&lang=tr&units=metric&appid=${this.API_KEY}`;
      const fetchRequest = await this.genericCityFetch(endpoint);
      return fetchRequest;
    },
  };
}
