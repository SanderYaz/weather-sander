export default class Helper {
  public iconClasses =
      "text-4xl text-default-500 pointer-events-none flex-shrink-0";

  // İlk harfi büyük yapar
  capitalizeFirstLetter = (text: string): string => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };


  // Rüzgar hızını km/h'dan m/s'ye çevirir
  windSpeedToMs = (windSpeedKph: number): string => {
    return (windSpeedKph * 0.27778).toFixed(3);
  };

  // Unix zaman damgasını HH:mm formatına çevirir
  calculateHourAndMinute = (timestamp: number): string => {
    const date = new Date(timestamp * 1000);
    const options: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "shortGeneric",
    };
    const formattedTime = date.toLocaleString("tr-TR", options);
    return formattedTime;
  };
}
