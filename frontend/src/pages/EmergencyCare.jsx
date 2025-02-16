import { useEffect, useState } from "react";

const EmergencyCare = () => {
  const [hospitals, setHospitals] = useState([]);
  useEffect(() => {
    fetch(
      "https://data.boston.gov/api/3/action/datastore_search?resource_id=6222085d-ee88-45c6-ae40-0c7464620d64"
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setHospitals(data.result.records);
      });
  }, []);

  return (
    <div>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {hospitals.map((hospital) => (
            <div
              key={hospital.id}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out p-6 flex flex-col justify-between"
            >
              <div className="text-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {hospital.NAME}
                </h2>
                <p className="text-lg text-gray-500">Hospital</p>
              </div>
              <div className="space-y-2">
                <p className="text-gray-700">
                  <strong>Address:</strong> {hospital.AD}
                </p>
                <p className="text-gray-700">
                  <strong>Neighborhood:</strong> {hospital.NEIGH}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default EmergencyCare;
