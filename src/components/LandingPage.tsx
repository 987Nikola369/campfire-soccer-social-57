import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import AuthForm from "@/components/AuthForm";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <div className="px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="pt-16 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-3xl tracking-tight font-extrabold text-white sm:text-4xl md:text-5xl">
                <span className="block">Ivana Rakitić</span>
                <span className="block">Football Camp for</span>
                <span className="block">young talents in</span>
                <span className="block text-[#E41E12]">Split!</span>
              </h1>
              <p className="mt-3 text-base text-gray-300 sm:text-lg md:mt-5 md:text-xl">
                Rocket Football Academy offers young talents a unique opportunity to improve their football skills under the guidance of professional coaches and with the support of our founder, Ivan Rakitić.
              </p>
              <div className="mt-5">
                <Button
                  onClick={() => navigate("/auth")}
                  className="w-full sm:w-auto flex items-center justify-center px-8 py-3 text-base font-medium rounded-md text-white bg-[#E41E12] hover:bg-[#ff2a1f] md:py-4 md:text-lg md:px-10 transition-colors ease-in-out"
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

        {/* Section 2: Official Academy Kit */}
        <div className="py-12 bg-[#1a1d21]/90 backdrop-blur-lg rounded-lg">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-base text-[#E41E12] font-semibold tracking-wide uppercase">Official Academy Kit</h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
                Every participant receives our official academy kit, designed for performance and comfort. The kit represents our values and unites our community under one identity.
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
                    <h3 className="text-lg leading-6 font-medium text-white">Premium Quality</h3>
                    <p className="mt-2 text-base text-gray-300">
                      Professional grade materials for maximum comfort
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
                    <h3 className="text-lg leading-6 font-medium text-white">Complete Set</h3>
                    <p className="mt-2 text-base text-gray-300">
                      All necessary tools included
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Professional Training, Team Building, Personal Growth */}
        <div className="py-12 bg-[#1a1d21]/90 backdrop-blur-lg rounded-lg">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-base text-[#E41E12] font-semibold tracking-wide uppercase">Training</h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
                Develop your skills
              </p>
            </div>

            <div className="mt-10">
              <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
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
                      Learn from experienced coaches and develop your skills in a professional environment
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
                    <h3 className="text-lg leading-6 font-medium text-white">Team Building</h3>
                    <p className="mt-2 text-base text-gray-300">
                      Build lasting friendships and develop essential teamwork skills with fellow players
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
                    <h3 className="text-lg leading-6 font-medium text-white">Personal Growth</h3>
                    <p className="mt-2 text-base text-gray-300">
                      Focus on individual development and achieve your personal football goals
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: About Us */}
        <div className="py-12 bg-[#1a1d21]/90 backdrop-blur-lg rounded-lg">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-base text-[#E41E12] font-semibold tracking-wide uppercase">About Us</h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
                Under the expert eye of Ivan Rakitić, this camp offers the opportunity to train in a professional environment.
              </p>
              <p className="mt-3 text-base text-gray-300 sm:text-lg md:mt-5 md:text-xl">
                Through technical, tactical and physical training, participants develop key football skills, but also qualities such as teamwork and discipline.
              </p>
            </div>
          </div>
        </div>

        {/* Section 5: Our Football Community */}
        <div className="py-12 bg-[#1a1d21]/90 backdrop-blur-lg rounded-lg">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-base text-[#E41E12] font-semibold tracking-wide uppercase">Our Football Community</h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
                Rocket Football Academy is not just a camp, but a community of passionate young football players, coaches and parents.
              </p>
              <p className="mt-3 text-base text-gray-300 sm:text-lg md:mt-5 md:text-xl">
                Through this camp, we nurture friendships and support that lasts long after the training sessions end. Our participants become part of a network of young athletes and mentors who motivate and support them on their way.
              </p>
            </div>
          </div>
        </div>

        {/* Section 6: Where Passion Meets Football Excellence */}
        <div className="py-12 bg-[#1a1d21]/90 backdrop-blur-lg rounded-lg">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-base text-[#E41E12] font-semibold tracking-wide uppercase">Our Vision</h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
                Where Passion Meets Football Excellence
              </p>
            </div>
          </div>
        </div>

        {/* Login Form Section */}
        <div className="py-16">
          <div className="relative bg-[#1a1d21]/90 backdrop-blur-lg rounded-lg shadow-xl overflow-hidden">
            <div className="px-4 py-12 sm:px-6 lg:py-16 lg:px-8">
              <div className="relative">
                <h3 className="text-2xl font-extrabold text-white tracking-tight sm:text-3xl text-center mb-8">
                  Login or Register
                </h3>
                <AuthForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
