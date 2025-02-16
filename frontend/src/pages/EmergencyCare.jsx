import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const EmergencyCare = () => {
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    fetch(
      "https://data.boston.gov/api/3/action/datastore_search?resource_id=6222085d-ee88-45c6-ae40-0c7464620d64"
    )
      .then((response) => response.json())
      .then((data) => {
        setHospitals(data.result.records);
      });
  }, []);

  // Helper function to extract lat/lon from the Location string
  const extractCoordinates = (location) => {
    const coordinates = location.match(/\((.*?)\)/);
    if (coordinates && coordinates[1]) {
      const [lat, lon] = coordinates[1]
        .split(",")
        .map((coord) => parseFloat(coord.trim()));
      return { lat, lon };
    }
    return { lat: 0, lon: 0 }; // Default fallback if parsing fails
  };

  return (
    <div>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {hospitals.map((hospital) => {
            const { Location, NAME, AD, NEIGH, id } = hospital;
            const { lat, lon } = extractCoordinates(Location); // Extract lat/lon

            return (
              <div
                key={id}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out p-6 flex flex-col justify-between"
              >
                <div className="text-center mb-4">
                  <h2 className="text-2xl font-semibold text-gray-800">
                    {NAME}
                  </h2>
                  <p className="text-lg text-gray-500">Hospital</p>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-700">
                    <strong>Address:</strong> {AD}
                  </p>
                  <p className="text-gray-700">
                    <strong>Neighborhood:</strong> {NEIGH}
                  </p>
                </div>

                {/* Google Maps Leaflet below each hospital */}
                <MapContainer
                  center={[lat, lon]}
                  zoom={16}
                  scrollWheelZoom={false}
                  style={{ height: "200px", width: "100%" }}
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker position={[lat, lon]}>
                    <Popup>{NAME}</Popup>
                  </Marker>
                </MapContainer>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EmergencyCare;
