import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-8">
      
      {/* Hero Section */}
      <div className="space-y-4 max-w-2xl animate-in slide-in-from-bottom-5 fade-in duration-700">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900">
          Organize your life <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            in seconds.
          </span>
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          MiniTasks combines simple lists with powerful AI to help you estimate deadlines, 
          prioritize work, and get things done.
        </p>
      </div>

      {/* CTA Buttons */}
      <div className="flex items-center gap-4 animate-in slide-in-from-bottom-5 fade-in duration-1000 delay-150">
        <Link 
          href="/signup" 
          className="px-8 py-4 bg-slate-900 text-white text-lg font-bold rounded-2xl shadow-xl shadow-slate-300 hover:bg-slate-800 hover:scale-105 active:scale-95 transition-all"
        >
          Get Started for Free
        </Link>
        <Link 
          href="/login" 
          className="px-8 py-4 bg-white text-slate-700 text-lg font-bold rounded-2xl border border-slate-200 hover:bg-slate-50 hover:text-indigo-600 transition-all"
        >
          Log In
        </Link>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 text-left w-full max-w-5xl">
        {[
          { icon: "🚀", title: "Instant Setup", desc: "No complex configuration. Just sign up and start adding tasks." },
          { icon: "✨", title: "AI Powered", desc: "Let Gemini AI analyze your tasks and suggest realistic due dates." },
          { icon: "🔒", title: "Secure", desc: "Your data is encrypted and safe. Focused privacy by design." }
        ].map((f, i) => (
          <div key={i} className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-3xl mb-3">{f.icon}</div>
            <h3 className="font-bold text-slate-900">{f.title}</h3>
            <p className="text-slate-500 text-sm mt-1">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}