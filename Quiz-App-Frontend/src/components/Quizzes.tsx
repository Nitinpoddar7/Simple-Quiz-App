import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const fetchAvailableQuizzes = async() => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/quizzes`)
    const data = await response.json()
    const quizzes = data.quizzes
    return quizzes;
}

function AvailableQuizzes() {
  const [quizzes, setQuizzes] = useState<string[]>([]);
  const navigate = useNavigate()

  useEffect(() => {
    (async() => {
        const data = await fetchAvailableQuizzes()
        setQuizzes(data)
    })();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 text-white px-4 py-10">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-10">
          Available Quizzes
        </h1>

        {quizzes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {quizzes.map((quiz, index) => (
              <div onClick={() => navigate(`/quiz/${(quiz as any).title}`)}
                key={index}
                className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg hover:bg-white/20 transition duration-200"
              >
                <h2 className="text-xl font-semibold">{(quiz as any).title}</h2>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-lg text-gray-100 mt-6">No quizzes available.</p>
        )}

        <button onClick={() => navigate('/quiz/new')} className="mt-12 px-6 py-3 bg-white text-indigo-600 font-semibold rounded-xl shadow-lg hover:bg-indigo-100 transition duration-200">
          Add Your Own Quiz
        </button>
      </div>
    </div>
  );
}

export default AvailableQuizzes;