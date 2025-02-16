import React from "react";

const DoctorsCard = () => {
  const doctors = [
    {
      id: 1,
      firstName: "Kathleen",
      lastName: "Miller",
      specialty: "Certified Registered Nurse Anesthetist (CRNA)",
      facility: "KBS Anesthesia, Inc.",
      location: "Monaca, PA 15061-2337",
      contact: "+1 724-624-9901",
    },
    {
      id: 2,
      firstName: "John",
      lastName: "Doe",
      specialty: "Physician",
      facility: "Good Health Medical Center",
      location: "Pittsburgh, PA 15213",
      contact: "+1 412-555-0199",
    },
    {
      id: 3,
      firstName: "Sarah",
      lastName: "Connor",
      specialty: "Registered Nurse (RN)",
      facility: "HealthFirst Hospital",
      location: "Harrisburg, PA 17101",
      contact: "+1 717-555-0247",
    },
    {
      id: 4,
      firstName: "Emily",
      lastName: "White",
      specialty: "Pediatrician",
      facility: "Little Stars Pediatric Clinic",
      location: "Allentown, PA 18101",
      contact: "+1 610-555-0890",
    },
    {
      id: 5,
      firstName: "Michael",
      lastName: "Smith",
      specialty: "General Surgeon",
      facility: "Surgical Care Center",
      location: "Scranton, PA 18503",
      contact: "+1 570-555-0162",
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {doctors.map((doctor) => (
          <div
            key={doctor.id}
            className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out p-6 flex flex-col justify-between"
          >
            <div className="text-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">
                {doctor.firstName} {doctor.lastName}
              </h2>
              <p className="text-lg text-gray-500">{doctor.specialty}</p>
            </div>
            <div className="space-y-2">
              <p className="text-gray-700">
                <strong>Facility:</strong> {doctor.facility}
              </p>
              <p className="text-gray-700">
                <strong>Location:</strong> {doctor.location}
              </p>
              <p className="text-gray-700">
                <strong>Contact:</strong> {doctor.contact}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsCard;
