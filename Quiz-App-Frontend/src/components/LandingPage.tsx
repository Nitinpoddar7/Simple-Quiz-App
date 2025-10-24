import { useNavigate } from "react-router";

function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 text-white px-4">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6">
          Welcome to Quizzy
        </h1>
        <p className="text-base sm:text-lg md:text-xl mb-8 text-gray-100">
          Test your knowledge with fun and challenging quizzes anytime, anywhere.
        </p>
        <button onClick={() => navigate('/quizzes')} className="px-6 sm:px-8 py-3 bg-white text-indigo-600 font-semibold rounded-xl shadow-lg hover:bg-indigo-100 transition duration-200 text-sm sm:text-base">
          See Available Quizzes
        </button>
      </div>
    </div>
  );
}

export default LandingPage;