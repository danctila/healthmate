import React from "react";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white text-gray-900 px-6 py-12">
      <section className="text-center py-20">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
          About Us
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8">
          We are a passionate team driven to provide the best healthcare
          solutions through innovative technology. Meet our leadership team
          below!
        </p>

        <div className="flex justify-center items-center space-x-12 mb-16">
          <div className="text-center">
            <img
              src="https://avatars.githubusercontent.com/u/60069162?v=4"
              alt="Co-founder"
              className="rounded-full h-32 w-32 mx-auto mb-4 shadow-lg"
            />
            <h3 className="text-2xl font-semibold text-gray-800">
              Co - Founder
            </h3>
            <p className="text-gray-500 text-lg">Problem Solver | Innovator</p>
          </div>

          <div className="text-center">
            <img
              src="https://media.licdn.com/dms/image/v2/D4E03AQH_gwLn8SxJkw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1707520023055?e=1745452800&v=beta&t=OusH2bHdAGawTJP9nZzgsJpQBTp9qws2sICkkX5jEx0"
              alt="CEO"
              className="rounded-full h-32 w-32 mx-auto mb-4 shadow-lg"
            />
            <h3 className="text-2xl font-semibold text-gray-800">
              Co - Founder
            </h3>
            <p className="text-gray-500 text-lg">Problem Solver | Innovator</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
