import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="pt-16 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                <span className="block">Ivana Rakitić</span>
                <span className="block">Football Camp for</span>
                <span className="block text-[#E41E12]">young talents</span>
                <span className="block">in Split!</span>
              </h1>
              <p className="mt-3 text-base text-gray-300 sm:text-lg md:mt-5 md:text-xl">
                Rocket Football Academy offers young talents a unique opportunity to improve their football skills under the guidance of professional coaches and with the support of our founder, Ivan Rakitić.
              </p>
              <div className="mt-5">
                <Button
                  onClick={() => navigate("/auth")}
                  className="w-full sm:w-auto flex items-center justify-center px-8 py-3 text-base font-medium rounded-md text-white bg-[#E41E12] hover:bg-[#ff2a1f] md:py-4 md:text-lg md:px-10"
                >
                  Apply Now
                </Button>
              </div>
            </div>
            <div className="relative">
              <img
                src="/lovable-uploads/9f84cb13-a489-4bba-bdac-7175b9da698a.png"
                alt="Ivan Rakitic"
                className="w-full h-auto"
              />
              <div className="absolute top-0 right-0">
                <span className="text-[#E41E12] text-2xl md:text-3xl font-bold italic">Ivan Rakitić</span>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Section */}
        <div className="py-12 bg-[#1a1d21]/90 backdrop-blur-lg rounded-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-base text-[#E41E12] font-semibold tracking-wide uppercase">Features</h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
                Everything you need to succeed
              </p>
            </div>

            <div className="mt-10">
              <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                {/* Feature 1 */}
                <div className="relative">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-[#E41E12] text-white">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="ml-16">
                    <h3 className="text-lg leading-6 font-medium text-white">Professional Training</h3>
                    <p className="mt-2 text-base text-gray-300">
                      Get access to professional training programs designed by top coaches.
                    </p>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="relative">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-[#E41E12] text-white">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <div className="ml-16">
                    <h3 className="text-lg leading-6 font-medium text-white">Community</h3>
                    <p className="mt-2 text-base text-gray-300">
                      Connect with other players, share experiences, and grow together.
                    </p>
                  </div>
                </div>

                {/* Feature 3 */}
                <div className="relative">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-[#E41E12] text-white">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <div className="ml-16">
                    <h3 className="text-lg leading-6 font-medium text-white">Resources</h3>
                    <p className="mt-2 text-base text-gray-300">
                      Access exclusive training materials, videos, and tutorials.
                    </p>
                  </div>
                </div>

                {/* Feature 4 */}
                <div className="relative">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-[#E41E12] text-white">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div className="ml-16">
                    <h3 className="text-lg leading-6 font-medium text-white">Personalized Progress</h3>
                    <p className="mt-2 text-base text-gray-300">
                      Track your development with personalized progress tracking.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-16">
          <div className="relative bg-[#1a1d21]/90 backdrop-blur-lg rounded-lg shadow-xl overflow-hidden">
            <div className="px-4 py-12 sm:px-6 lg:py-16 lg:px-8">
              <div className="relative lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
                <div className="relative">
                  <h3 className="text-2xl font-extrabold text-white tracking-tight sm:text-3xl">
                    Ready to join?
                  </h3>
                  <p className="mt-3 text-lg text-gray-300">
                    Start your journey with Rocket Football Academy today and take your first step towards becoming a professional player.
                  </p>
                </div>
                <div className="mt-10 relative lg:mt-0">
                  <div className="ml-0 lg:ml-10">
                    <Button
                      onClick={() => navigate("/auth")}
                      className="w-full flex items-center justify-center px-8 py-3 text-base font-medium rounded-md text-white bg-[#E41E12] hover:bg-[#ff2a1f] md:py-4 md:text-lg md:px-10"
                    >
                      Join Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;