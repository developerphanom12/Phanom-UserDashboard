import React from "react";

const  HowItWorks=() =>{
  const steps = [
    {
      title: "Sign Up & Create Your Gig",
      description:
        "Join Top 1% Talent Pool, set up your profile, and create a Gig showcasing your skills and services.",
      image:
        "https://images.pexels.com/photos/3184451/pexels-photo-3184451.jpeg",
    },
    {
      title: "Receive Orders",
      description:
        "Get notified instantly when customers place an order and use our platform to discuss project details with them.",
      image:
        "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg",
    },
    {
      title: "Deliver Quality Work",
      description:
        "Complete the order on time with high-quality results to satisfy your clients.",
      image:
        "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg",
    },
    {
      title: "Get Paid Securely",
      description:
        "Get paid on time, every time. Secure and reliable payment system for your services.",
      image:
        "https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg",
    },
  ];

  return (
    <div className="py-12 px-4 md:px-8 lg:px-16">
      <h2 className="sm:text-[48px] text-[25px] font-bold text-[#6C5FD4] mb-4">
        How it works
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
        <div className="lg:col-span-8 h-[260px] relative rounded-2xl overflow-hidden shadow-lg">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${steps[0].image})`,
            }}
          ></div>
          <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-4">
            <h3 className="text-lg md:text-xl font-bold text-white mb-2">
              {steps[0].title}
            </h3>
            <p className="text-sm text-gray-200">{steps[0].description}</p>
          </div>
        </div>

        <div className="lg:col-span-4 h-[260px] relative rounded-2xl overflow-hidden shadow-lg">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${steps[1].image})`,
            }}
          ></div>
          <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-4">
            <h3 className="text-lg md:text-xl font-bold text-white mb-2">
              {steps[1].title}
            </h3>
            <p className="text-sm text-gray-200">{steps[1].description}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 h-[260px] relative rounded-2xl overflow-hidden shadow-lg">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${steps[2].image})`,
            }}
          ></div>
          <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-4">
            <h3 className="text-lg md:text-xl font-bold text-white mb-2">
              {steps[2].title}
            </h3>
            <p className="text-sm text-gray-200">{steps[2].description}</p>
          </div>
        </div>

        <div className="lg:col-span-8 h-[260px] relative rounded-2xl overflow-hidden shadow-lg">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${steps[3].image})`,
            }}
          ></div>
          <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-4">
            <h3 className="text-lg md:text-xl font-bold text-white mb-2">
              {steps[3].title}
            </h3>
            <p className="text-sm text-gray-200">{steps[3].description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;
