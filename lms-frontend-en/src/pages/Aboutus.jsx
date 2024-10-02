import HomeLayouts from "../layouts/HomeLayouts";
import aboutMainPage from "../Assets/Images/aboutMainImage.png"
import stavejobs from "../Assets/Images/QuotesPersonalityImage/steveJobs.png"
import apj from "../Assets/Images/QuotesPersonalityImage/apj.png"
import nelsonMandela from "../Assets/Images/QuotesPersonalityImage/nelsonMandela.png"
// import einstein from "../Assets/Images/QuotesPersonalityImage/einstein.png"
import billGates from "../Assets/Images/QuotesPersonalityImage/billGates.png"



function Aboutus() {
    return (
        <HomeLayouts>
            <div className="flex flex-col text-white pl-20 pt-20">
                <div className="flex items-center gap-5 mx-10">
                    <section className="w-1/2 space-y-10">
                        <h1 className="text-5xl text-yellow-500 font-semibold">
                            Affordable and Quality Education
                        </h1>
                        <p className="text-xl text-gray-200">
                            Our goal is to provide the affordable and quality education to the
                            world. We are providing the platform for the aspiring teachers and
                            students to share their creativity, skills and knowledge to each
                            other to empower and contribute in the growth and wellness of the
                            mankind.
                        </p>
                    </section>

                    <div className="w-1/2">
                        <img
                            src={aboutMainPage}
                            className="drop-shadow-2xl"
                            alt="about main page"
                            id="test1"
                            style={{

                            }}
                        />
                    </div>
                </div>
                <div className="carousel m-auto w-1/2 my-16">
                    <div id="slide1" className="carousel-item relative w-full">
                        <div className="flex flex-col items-center justify-center gap-4 px-[15%]">

                            <img
                                src={apj}
                                className="w-40 rounded-full bottom-2 bg-gray-400"
                            />
                            <h1 className="text-2xl font-semibold">Apj Abdul Kalam</h1>
                            <p className="text-2xl text-gray-200">
                                "Learning gives creativity, creativity leads to thinking,
                                thinking provides knowledge, knowledge makes you great."
                            </p>
                            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                                <a href="#slide4" className="btn btn-circle">❮</a>
                                <a href="#slide2" className="btn btn-circle">❯</a>
                            </div>
                        </div>
                    </div>
                    <div id="slide2" className="carousel-item relative w-full">
                        <div className="flex flex-col items-center justify-center gap-4 px-[15%]">

                            <img
                                src={stavejobs}
                                className="w-40 rounded-full bottom-2 bg-gray-400"
                                alt="Steve Jobs"
                                />
                                <h3 className="text-2xl font-semibold">Steve Jobs</h3>
                                {/* for writting the quotes */}
                                <p className="text-xl text-gray-200">
                                  "Innovation distinguishes between a leader and a follower."
                                </p>
                                {/* for personality name */}
                            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                                <a href="#slide1" className="btn btn-circle">❮</a>
                                <a href="#slide3" className="btn btn-circle">❯</a>
                            </div>
                        </div>
                    </div>
                    <div id="slide3" className="carousel-item relative w-full">
                        <div className="flex flex-col items-center justify-center gap-4 px-[15%]">

                            <img
                                src={billGates}
                                className="w-40 rounded-full bottom-2 bg-gray-400"
                                alt="Bill Gates"
                              />
                              <h3 className="text-2xl font-semibold">Bill Gates</h3>
                              {/* for writting the quotes */}
                              <p className="text-xl text-gray-200">
                                "Technology is just a tool. In terms of getting the kids working
                                together and motivating them, the teacher is the most
                                important."
                              </p>
                              {/* for personality name */}
                            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                                <a href="#slide2" className="btn btn-circle">❮</a>
                                <a href="#slide4" className="btn btn-circle">❯</a>
                            </div>
                        </div>
                    </div>
                    <div id="slide4" className="carousel-item relative w-full">
                        <div className="flex flex-col items-center justify-center gap-4 px-[15%]">

                            <img
                                src={nelsonMandela}
                                className="w-40 rounded-full bottom-2 bg-gray-400"
                                alt="Nelson Mandela"
                                />
                                <h3 className="text-2xl font-semibold">Nelson Mandela</h3>
                                {/* for writting the quotes */}
                                <p className="text-xl text-gray-200">
                                  "Education is the most powerful tool you can use to change the
                                  world."
                                </p>
                                {/* for personality name */}
                            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                                <a href="#slide4" className="btn btn-circle">❮</a>
                                <a href="#slide1" className="btn btn-circle">❯</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </HomeLayouts>
    )
}

export default Aboutus;