import { useRef, useState, useEffect } from "react";
import ProfileCard from "./components/ProfileCard/ProfileCard";
import ShinyText from "./components/ShinyText/ShinyText";
import BlurText from "./components/BlurText/BlurText";
import Lanyard from "./components/Lanyard/Lanyard";
import { listTools, listProyek } from "./data";
import ChromaGrid from "./components/ChromaGrid/ChromaGrid";
import ProjectModal from "./components/ProjectModal/ProjectModal";
import Aurora from "./components/Aurora/Aurora";
import AOS from 'aos';
import ChatRoom from "./components/ChatRoom";
import 'aos/dist/aos.css';

AOS.init();

function App() {
  const aboutRef = useRef(null);
  const [, setIsVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  useEffect(() => {
    const isReload =
      performance.getEntriesByType("navigation")[0]?.type === "reload";

    if (isReload) {
      const baseUrl = window.location.origin + "/";
      window.location.replace(baseUrl);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
        <Aurora
          colorStops={["#577870", "#1F97A6", "#127B99"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-hidden">

        {/* HERO SECTION RESPONSIVE */}
        <div className="hero flex flex-col md:grid md:grid-cols-2 items-center pt-6 sm:pt-10 gap-8">
          <div className="animate__animated animate__fadeInUp animate__delay-3s w-full">
            <div className="flex items-center gap-3 mb-6 bg-zinc-800/80 w-fit p-3.5 sm:p-4 rounded-2xl border border-zinc-700/50">
              <img src="/assets/faris1.png" className="w-8 sm:w-10 rounded-md" alt="Avatar" />
              <q className="text-xs sm:text-sm">Avoid or just undertake it</q>
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-bold mb-6">
              <ShinyText text="Hi I'm Muhammad Khairul Anam" disabled={false} speed={3} className='custom-class' />
            </h1>
            
            <BlurText
              text="Mahasiswa D4 Manajemen Informatika yang berdedikasi membangun aplikasi web yang estetik, fungsional, dan ramah pengguna. Berpengalaman dalam pengembangan Front-end dan dukungan teknis IT."
              delay={150}
              animateBy="words"
              direction="top"
              className="mb-6 text-sm sm:text-base text-gray-300 leading-relaxed"
            />
            
            {/* Tombol Stack di HP (flex-col), Berdampingan di PC (sm:flex-row) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full">
              <a 
                href="/assets/CV.pdf" 
                download="CV.pdf" 
                className="font-semibold bg-[#1a1a1a] p-3.5 sm:p-4 px-6 rounded-full border border-gray-700 hover:bg-[#222] transition-colors text-center shadow-lg"
              >
                <ShinyText text="Download CV" disabled={false} speed={3} className="custom-class" />
              </a>

              <a 
                href="#project" 
                className="font-semibold bg-[#1a1a1a] p-3.5 sm:p-4 px-6 rounded-full border border-gray-700 hover:bg-[#222] transition-colors text-center shadow-lg"
              >
                <ShinyText text="Explore My Projects" disabled={false} speed={3} className="custom-class" />
              </a>
            </div>
          </div>

          {/* ProfileCard Center Penuh di HP */}
          <div className="flex justify-center md:justify-end w-full animate__animated animate__fadeInUp animate__delay-4s mt-4 md:mt-0">
            <ProfileCard
              name="M. Khairul Anam"
              title="Web Developer"
              handle="M. Khairul Anam"
              status="Online"
              contactText="Contact Me"
              avatarUrl="/assets/faris.png"
              showUserInfo={true}
              enableTilt={true}
              enableMobileTilt={false}
              onContactClick={() => console.log('Contact clicked')}
            />
          </div>
        </div>

        {/* TENTANG ME & LANYARD */}
        <div className="mt-16 sm:mt-24 mx-auto w-full max-w-[1600px] rounded-3xl border-[3px] sm:border-[5px] border-violet-500/40 shadow-[0_0_30px_rgba(168,85,247,0.3)] bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#1a1a1a] p-4 sm:p-8" id="about" ref={aboutRef}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 sm:gap-10 pt-0" data-aos="fade-up" data-aos-duration="1000" data-aos-once="true">
            
            {/* Kolom Kiri Teks */}
            <div className="basis-full md:basis-7/12 w-full pr-0 md:pr-8 border-b md:border-b-0 md:border-r border-violet-500/30 pb-8 md:pb-0">
              <div className="flex-1 text-left">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-5">
                  About Me
                </h2>

                <BlurText
                  text="Mahasiswa Aktif Program Sarjana Terapan (D4) Manajemen Informatika yang memiliki kemampuan di bidang Web Development. Memiliki pengalaman dan kemampuan di bidang Web Developer , Designer UI/UX ,IT Support ,dan pengembangan Front-end . Pribadi yang komunikatif bertanggungjawab ,memiliki manajemen waktu yang baik serta mampu bekerja sama dalam tim maupun mandiri."
                  delay={150}
                  animateBy="words"
                  direction="top"
                  className="text-sm sm:text-base md:text-lg leading-relaxed mb-8 text-gray-300"
                />

                <div className="flex flex-col sm:flex-row items-center sm:justify-between text-center sm:text-left gap-y-6 sm:gap-y-0 mb-6 w-full">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-1">
                      11<span className="text-violet-500">+</span>
                    </h1>
                    <p className="text-xs sm:text-sm opacity-70">Project Finished</p>
                  </div>
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-1">
                      5<span className="text-violet-500">+</span>
                    </h1>
                    <p className="text-xs sm:text-sm opacity-70">Certificate</p>
                  </div>
                  <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="600" data-aos-once="true">
                    <h1 className="text-3xl md:text-4xl font-bold mb-1">
                      3.88<span className="text-violet-500 text-xl sm:text-2xl">/4.00</span>
                    </h1>
                    <p className="text-xs sm:text-sm opacity-70">IPK / IPS</p>
                  </div>
                </div>

                <ShinyText
                  text="Working with heart, creating with mind."
                  disabled={false}
                  speed={3}
                  className="text-xs sm:text-sm md:text-base text-violet-400 font-medium block text-center sm:text-left"
                />
              </div>
            </div>

            {/* Kolom Kanan Lanyard */}
            <div className="basis-full md:basis-5/12 w-full h-[400px] sm:h-[500px] flex flex-col justify-center items-center relative overflow-hidden rounded-2xl bg-zinc-950/40 border border-zinc-800/60 p-2">
              <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10 bg-zinc-900/80 px-3 py-1 rounded-full border border-zinc-700/50 text-[11px] text-zinc-400 pointer-events-none flex items-center gap-1.5 backdrop-blur-sm">
                <span>👇</span> Usap untuk memutar lanyard
              </div>
              <Lanyard position={[0, 0, 14]} gravity={[0, -40, 0]} fov={22} />
            </div>

          </div>
        </div>

        {/* TOOLS & TECHNOLOGIES */}
        <div className="tools mt-20 sm:mt-32">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3" data-aos="fade-up" data-aos-duration="1000" data-aos-once="true">
            Tools & Technologies
          </h1>
          {/* Perbaikan w-2/5 menjadi w-full sm:w-2/5 agar di HP tidak terlalu sempit */}
          <p className="w-full sm:w-2/5 text-sm sm:text-base opacity-60 leading-relaxed" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300" data-aos-once="true">
            My Professional Skills & Software
          </p>
          
          <div className="tools-box mt-8 sm:mt-14 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
            {listTools.map((tool) => (
              <div
                key={tool.id} 
                data-aos="fade-up" 
                data-aos-duration="1000" 
                data-aos-delay={tool.dad} 
                data-aos-once="true"
                className="flex items-center gap-4 p-4 border border-zinc-800 rounded-xl bg-zinc-900/60 backdrop-blur-md hover:bg-zinc-800/80 transition-all duration-300 group shadow-lg"
              >
                <img
                  src={tool.gambar}
                  alt={tool.nama}
                  className="w-14 h-14 object-contain bg-zinc-800/80 p-2 rounded-lg group-hover:bg-zinc-900 transition-all duration-300"
                />
                <div className="flex flex-col overflow-hidden">
                  <div className="truncate">
                    <ShinyText
                      text={tool.nama}
                      disabled={false}
                      speed={3}
                      className="text-base font-semibold block"
                    />
                  </div>
                  <p className="text-xs text-zinc-400 truncate mt-0.5">{tool.ket}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PROYEK */}
        <div className="proyek mt-20 sm:mt-32 pt-10" id="project" data-aos="fade-up" data-aos-duration="1000" data-aos-once="true">
          <h1 className="text-center text-3xl sm:text-4xl font-bold mb-3">Project</h1>
          <p className="text-sm sm:text-base text-center opacity-60 max-w-2xl mx-auto px-2">
            Showcasing a selection of projects that reflect my skills, creativity, and passion for building meaningful digital experiences.
          </p>
          <div className="proyek-box mt-8 sm:mt-14">
            <div style={{ height: 'auto', position: 'relative' }} data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400" data-aos-once="true">
              <ChromaGrid
                items={listProyek}
                onItemClick={handleProjectClick}
                radius={500}
                damping={0.45}
                fadeOut={0.6}
                ease="power3.out"
              />
            </div>
          </div>
        </div>

        {/* KONTAK & CHAT */}
        <div className="kontak mt-20 sm:mt-32 sm:p-10 p-0 mb-20" id="contact">
          <h1
            className="text-3xl sm:text-4xl mb-3 font-bold text-center"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-once="true"
          >
            Contact & Chat
          </h1>
          <p
            className="text-sm sm:text-base text-center mb-8 sm:mb-10 opacity-60"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="300"
            data-aos-once="true"
          >
            Get in touch with me or chat in real-time
          </p>

          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Chat Room */}
            <div className="w-full lg:flex-1" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400" data-aos-once="true">
              <ChatRoom />
            </div>

            {/* Form Kontak */}
            <div className="w-full lg:flex-1">
              <form
                action="https://formsubmit.co/pasuruananam41@gmail.com"
                method="POST"
                className="bg-zinc-900/90 border border-zinc-800 p-6 sm:p-8 w-full rounded-2xl shadow-xl"
                autoComplete="off"
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-delay="500"
                data-aos-once="true"
              >
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold text-sm text-zinc-300">Full Name</label>
                    <input
                      type="text"
                      name="Name"
                      placeholder="Input Name..."
                      className="border border-zinc-700/80 bg-zinc-800/80 p-3 rounded-xl text-sm focus:outline-none focus:border-violet-500 transition-all"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold text-sm text-zinc-300">Email</label>
                    <input
                      type="email"
                      name="Email"
                      placeholder="Input Email..."
                      className="border border-zinc-700/80 bg-zinc-800/80 p-3 rounded-xl text-sm focus:outline-none focus:border-violet-500 transition-all"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="font-semibold text-sm text-zinc-300">Message</label>
                    <textarea
                      name="message"
                      id="message"
                      rows="5"
                      placeholder="Message..."
                      className="border border-zinc-700/80 bg-zinc-800/80 p-3 rounded-xl text-sm focus:outline-none focus:border-violet-500 transition-all"
                      required
                    ></textarea>
                  </div>
                  <div className="text-center mt-2">
                    <button
                      type="submit"
                      className="font-semibold bg-[#1a1a1a] p-3.5 px-6 rounded-full w-full cursor-pointer border border-gray-700 hover:bg-[#222] transition-colors shadow-lg active:scale-95"
                    >
                      <ShinyText text="Send Message" disabled={false} speed={3} className="custom-class" />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

      </main>

      <ProjectModal
        isOpen={!!selectedProject}
        onClose={handleCloseModal}
        project={selectedProject}
      />
    </>
  );
}

export default App;