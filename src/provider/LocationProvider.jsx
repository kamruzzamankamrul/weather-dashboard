import { useEffect, useState } from "react";
import { LocationContext } from "../context";

const LocationProvider = ({ children }) => {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [error, setError] = useState("");
  const [city, setCity] = useState({
    latitude: null,
    longitude: null,
    location: "",
  });

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${selectedLocation}&units=metric&appid=${
            import.meta.env.VITE_WEATHER_API_KEY
          }`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        setCity((prev) => ({
          ...prev,
          latitude: data?.coord?.lat,
          longitude: data?.coord?.lon,
          location: data?.name,
        }));
      } catch (error) {
        setError(error.message);
      }
    };
    if (selectedLocation) {
      fetchWeatherData();
    }
  }, [selectedLocation]);

  return (
    <LocationContext.Provider
      value={{
        selectedLocation,
        setSelectedLocation,
        error,
        setError,
        city,
        setCity,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export default LocationProvider;
