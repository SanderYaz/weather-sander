import { useRouter } from "next/navigation";
import React from "react";
import TurkeyMap from "turkey-map-react";

const Map = ({ onClick }: { onClick: (cityName: string) => void }) => {
  const router = useRouter();

  const redirectCity = (name: string) => {
    router.push("?city=" + name);
  };

  return (
      <TurkeyMap
          showTooltip={true}
          onClick={({ name }) => {
            redirectCity(name);
            onClick(name);
          }}
          customStyle={{ idleColor: "#ffffff", hoverColor: "#5500ff" }}
      />
  );
};

export default Map;
