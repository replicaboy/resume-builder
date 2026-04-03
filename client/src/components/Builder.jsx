import { useState, useRef, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';

const Builder = () => {
  // Default Data
  const defaultData = {
    fullName: 'Hariom Thakur',
    title: 'Full Stack MERN Developer',
    email: 'hariom@example.com',
    phone: '+91 9876543210',
    github: 'github.com/replicaboy',
    linkedin: 'linkedin.com/in/hariom',
    summary: 'Detail-oriented Full Stack Developer specializing in the MERN stack. Proven ability to build real-time, scalable web applications. Passionate about writing clean code and solving complex technical challenges.',
    skills: 'React.js, Node.js, Express.js, MongoDB, Socket.io, Tailwind CSS, Vite, Git/GitHub',
    projects: 'CHODU CID CHAT | MERN, Socket.io, Tailwind\n• Architected a real-time messaging platform with instant reliable message delivery.\n• Implemented secure user authentication and optimized database queries.\n• Designed a highly responsive UI ensuring a seamless cross-device experience.',
    experience: 'Freelance Web Developer | 2023 - Present\n• Developed scalable web solutions for clients using modern JavaScript frameworks.\n• Optimized application performance, reducing load times by 30%.\n• Collaborated with designers to translate UI/UX wireframes into functional code.',
    education: 'Bachelor of Technology in Computer Science\nXYZ University | 2020 - 2024\nGrade: 8.5 CGPA',
    certifications: 'AWS Certified Cloud Practitioner\nMeta Front-End Developer Professional Certificate',
    languages: 'English (Fluent), Hindi (Native)',
    declaration: 'I hereby declare that the information furnished above is true, complete, and correct to the best of my knowledge and belief.',
    place: 'New Delhi, India',
    date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
  };

  // State with LocalStorage for Auto-Save
  const [resumeData, setResumeData] = useState(() => {
    const savedData = localStorage.getItem('myInstantResume');
    return savedData ? JSON.parse(savedData) : defaultData;
  });

  // Auto-Save Effect
  useEffect(() => {
    localStorage.setItem('myInstantResume', JSON.stringify(resumeData));
  }, [resumeData]);

  const handleChange = (e) => {
    setResumeData({ ...resumeData, [e.target.name]: e.target.value });
  };

  const resumeRef = useRef(null);
  const handlePrint = useReactToPrint({
    contentRef: resumeRef,
    documentTitle: `${resumeData.fullName.split(' ').join('_')}_Resume`,
    pageStyle: `
      @page { size: A4; margin: 0; }
      @media print { body { -webkit-print-color-adjust: exact; } }
    `
  });

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8 font-sans text-slate-800 flex flex-col lg:flex-row gap-6 print:p-0 print:bg-white print:block">
      
      {/* LEFT: COMPACT EDITOR */}
      <div className="w-full lg:w-[45%] h-fit max-h-[90vh] flex flex-col bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden print:hidden">
        
        {/* Editor Header */}
        <div className="bg-slate-800 px-6 py-4 flex justify-between items-center text-white">
          <h2 className="text-xl font-bold tracking-wide">Professional Editor</h2>
          <button 
            onClick={handlePrint}
            className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-md font-semibold text-sm transition-all shadow-md flex items-center gap-2"
          >
            Export PDF
          </button>
        </div>

        {/* Editor Form */}
        <div className="p-6 overflow-y-auto custom-scrollbar space-y-6">
          
          <div className="space-y-4">
            <h3 className="font-bold text-slate-400 uppercase text-xs tracking-widest border-b pb-1">Basic Details</h3>
            <div className="grid grid-cols-2 gap-3">
              {['fullName', 'title', 'email', 'phone', 'github', 'linkedin'].map(field => (
                <div key={field}>
                  <label className="text-xs font-semibold text-slate-500 mb-1 block uppercase">{field}</label>
                  <input type="text" name={field} value={resumeData[field]} onChange={handleChange} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded focus:ring-2 focus:ring-blue-500 outline-none text-sm font-medium text-slate-700"/>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-slate-400 uppercase text-xs tracking-widest border-b pb-1">Professional Content</h3>
            
            {['summary', 'projects', 'experience', 'education', 'certifications'].map(field => (
              <div key={field}>
                <label className="text-xs font-semibold text-slate-500 mb-1 block uppercase">{field}</label>
                <textarea name={field} value={resumeData[field]} onChange={handleChange} rows={field === 'summary' || field === 'education' ? 3 : 4} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded focus:ring-2 focus:ring-blue-500 outline-none text-sm font-medium text-slate-700"></textarea>
              </div>
            ))}

            {/* YEH NAYA SKILLS WALA BLOCK HAI */}
            <div>
              <label className="text-xs font-semibold text-slate-500 mb-1 block uppercase">Technical Skills (Comma Separated)</label>
              <input type="text" name="skills" value={resumeData.skills} onChange={handleChange} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded focus:ring-2 focus:ring-blue-500 outline-none text-sm font-medium text-slate-700"/>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-500 mb-1 block uppercase">Languages</label>
              <input type="text" name="languages" value={resumeData.languages} onChange={handleChange} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded focus:ring-2 focus:ring-blue-500 outline-none text-sm font-medium text-slate-700"/>
            </div>
          </div>

          <div className="space-y-4 bg-blue-50/50 p-4 rounded-lg border border-blue-100">
            <h3 className="font-bold text-blue-600 uppercase text-xs tracking-widest border-b border-blue-200 pb-1">Signature & Declaration</h3>
            
            <div>
              <label className="text-xs font-semibold text-slate-500 mb-1 block">Declaration Text</label>
              <textarea name="declaration" value={resumeData.declaration} onChange={handleChange} rows="2" className="w-full px-3 py-2 bg-white border border-slate-200 rounded focus:ring-2 focus:ring-blue-500 outline-none text-sm font-medium text-slate-700"></textarea>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-500 mb-1 block">Place</label>
                <input type="text" name="place" value={resumeData.place} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-slate-200 rounded focus:ring-2 focus:ring-blue-500 outline-none text-sm font-medium text-slate-700"/>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 mb-1 block">Date</label>
                <input type="text" name="date" value={resumeData.date} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-slate-200 rounded focus:ring-2 focus:ring-blue-500 outline-none text-sm font-medium text-slate-700"/>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* RIGHT: EXACT A4 RESUME PREVIEW */}
      <div className="w-full lg:w-[55%] flex justify-center overflow-x-auto pb-10 print:w-full print:p-0 print:m-0 print:overflow-visible">
        <div 
          ref={resumeRef}
          className="bg-white w-[210mm] h-[297mm] overflow-hidden shadow-2xl flex flex-col print:shadow-none print-exact-colors relative"
          style={{ transform: 'scale(0.95)', transformOrigin: 'top center' }}
        >
          {/* Header Block */}
          <div className="bg-[#0f172a] text-white p-8 flex flex-col items-center text-center border-b-[6px] border-blue-600 print:bg-[#0f172a]">
            <h1 className="text-[2.5rem] font-bold tracking-wider uppercase mb-1">{resumeData.fullName}</h1>
            <p className="text-lg text-blue-400 font-medium tracking-[0.15em] uppercase mb-4">{resumeData.title}</p>
            
            <div className="flex flex-wrap justify-center gap-x-5 gap-y-1 text-xs font-medium text-slate-300">
              {resumeData.email && <span>{resumeData.email}</span>}
              {resumeData.phone && <span>• {resumeData.phone}</span>}
              {resumeData.github && <span>• {resumeData.github}</span>}
              {resumeData.linkedin && <span>• {resumeData.linkedin}</span>}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex flex-1 p-8 gap-8 bg-white text-slate-800">
            
            {/* Left Column (60% width) */}
            <div className="w-[60%] flex flex-col gap-6">
              {resumeData.summary && (
                <section>
                  <h3 className="text-sm font-bold text-[#0f172a] uppercase tracking-widest border-b-2 border-slate-200 pb-1 mb-2">Professional Summary</h3>
                  <p className="text-[13px] leading-relaxed text-justify text-slate-600 font-medium">{resumeData.summary}</p>
                </section>
              )}

              {resumeData.projects && (
                <section>
                  <h3 className="text-sm font-bold text-[#0f172a] uppercase tracking-widest border-b-2 border-slate-200 pb-1 mb-2">Key Projects</h3>
                  <p className="text-[13px] leading-relaxed whitespace-pre-wrap text-slate-600 font-medium">{resumeData.projects}</p>
                </section>
              )}

              {resumeData.experience && (
                <section>
                  <h3 className="text-sm font-bold text-[#0f172a] uppercase tracking-widest border-b-2 border-slate-200 pb-1 mb-2">Work Experience</h3>
                  <p className="text-[13px] leading-relaxed whitespace-pre-wrap text-slate-600 font-medium">{resumeData.experience}</p>
                </section>
              )}
            </div>

            {/* Right Column (40% width) */}
            <div className="w-[40%] flex flex-col gap-6 relative">
              {resumeData.skills && (
                <section>
                  <h3 className="text-sm font-bold text-[#0f172a] uppercase tracking-widest border-b-2 border-slate-200 pb-1 mb-2">Technical Skills</h3>
                  <div className="flex flex-col gap-1">
                    {resumeData.skills.split(',').map((skill, index) => (
                      <span key={index} className="text-[13px] font-semibold text-slate-600 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span> {skill.trim()}
                      </span>
                    ))}
                  </div>
                </section>
              )}

              {resumeData.education && (
                <section>
                  <h3 className="text-sm font-bold text-[#0f172a] uppercase tracking-widest border-b-2 border-slate-200 pb-1 mb-2">Education</h3>
                  <p className="text-[13px] leading-relaxed whitespace-pre-wrap text-slate-600 font-medium">{resumeData.education}</p>
                </section>
              )}

              {resumeData.certifications && (
                <section>
                  <h3 className="text-sm font-bold text-[#0f172a] uppercase tracking-widest border-b-2 border-slate-200 pb-1 mb-2">Certifications</h3>
                  <p className="text-[13px] leading-relaxed whitespace-pre-wrap text-slate-600 font-medium">{resumeData.certifications}</p>
                </section>
              )}

              {resumeData.languages && (
                <section>
                  <h3 className="text-sm font-bold text-[#0f172a] uppercase tracking-widest border-b-2 border-slate-200 pb-1 mb-2">Languages</h3>
                  <p className="text-[13px] font-medium text-slate-600">{resumeData.languages}</p>
                </section>
              )}

              {/* Declaration Block */}
              <section className="mt-auto pt-6 border-t border-slate-100">
                <h3 className="text-xs font-bold text-[#0f172a] uppercase tracking-widest mb-2">Declaration</h3>
                <p className="text-[11px] leading-relaxed text-slate-500 text-justify mb-4 italic">
                  "{resumeData.declaration}"
                </p>
                <div className="flex justify-between items-end text-[11px] font-semibold text-slate-600">
                  <div className="space-y-1">
                    <p>Date: <span className="font-normal">{resumeData.date}</span></p>
                    <p>Place: <span className="font-normal">{resumeData.place}</span></p>
                  </div>
                  <div className="text-center">
                    <div className="w-24 h-8 border-b border-slate-400 mb-1"></div>
                    <p className="text-[10px] uppercase tracking-widest">{resumeData.fullName}</p>
                  </div>
                </div>
              </section>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Builder;