import { CityFetch, Helper, WeatherService } from "@/lib";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { NotFoundCity, WeatherStatus, WeatherStatusSkelaton } from "..";

type CityModal = {
  city: string;
};

const CityModal = ({ city }: CityModal) => {
  const [cityData, setCityData] = useState<CityFetch | null>(null); // Başlangıçta null
  const [loading, setLoading] = useState(true); // Yükleme durumu kontrolü
  const helper = new Helper();
  const router = useRouter();

  const onClose = () => {
    router.push("");
  };

  const fetchCityData = async () => {
    const weatherService = new WeatherService();
    const cityWeather = await weatherService.fetch.cityOpenWeather(city);
    setCityData(cityWeather as CityFetch);
    setLoading(false); // İstek tamamlandığında loading durumunu false yap
  };

  useEffect(() => {
    if (city && !cityData) {
      fetchCityData();
    }
  }, [city]);

  const modalHeaderRender = () => {
    return `${helper.capitalizeFirstLetter(city)} Hava Durumu`;
  };

  const modalBodyRender = () => {
    if (loading) {
      return <WeatherStatusSkelaton />; // Yüklenirken iskelet göster
    }

    if (cityData?.cod?.toString() === "404") {
      return <NotFoundCity city={city} />; // Hatalı şehir
    }

    return cityData ? <WeatherStatus city={cityData} /> : null;
  };

  return (
      <Modal
          placement={"center"}
          backdrop={"blur"}
          isOpen={true}
          onClose={onClose}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            {modalHeaderRender()}
          </ModalHeader>
          <ModalBody>{modalBodyRender()}</ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Kapat
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
  );
};

export default CityModal;
