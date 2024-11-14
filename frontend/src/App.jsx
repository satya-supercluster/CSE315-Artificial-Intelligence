import React, { useState } from "react";
import {
  Brain,
  Github,
  Upload,
  Check,
  AlertCircle,
  Info,
  Sun,
  Moon,
} from "lucide-react";

const App = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(true);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setPrediction(null);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please select an image file.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${import.meta.env.VITE_SITE}/predict`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to get prediction");
      }

      const data = await response.json();
      setPrediction(data.predicted_digit);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={`min-h-screen flex flex-col ${
        darkMode ? "bg-gray-900" : "bg-gradient-to-b from-blue-50 to-white"
      }`}
    >
      <header
        className={`${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg py-6`}
      >
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Brain
              className={`w-8 h-8 ${
                darkMode ? "text-blue-400" : "text-blue-600"
              }`}
            />
            <h1
              className={`text-2xl font-bold ${
                darkMode ? "text-white" : "text-gray-800"
              } max-[450px]:text-[0.9rem]`}
            >
              CSE315_AI_Project
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg ${
                darkMode
                  ? "bg-gray-700 text-yellow-300"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {darkMode ? (
                <Sun className="w-6 h-6" />
              ) : (
                <Moon className="w-6 h-6" />
              )}
            </button>
            <a
              href="https://github.com/satya-supercluster/CSE315-Artificial-Intelligence"
              className={`flex items-center space-x-2 ${
                darkMode
                  ? "text-gray-300 hover:text-white"
                  : "text-gray-600 hover:text-gray-900"
              } transition-colors duration-200`}
            >
              <Github className="w-6 h-6" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </header>
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="max-w-6xl w-full mx-auto flex flex-col-reverse justify-center items-center lg:flex-row gap-8">
          <div
            className={`lg:w-1/3 ${
              darkMode ? "bg-gray-800" : "bg-white"
            } rounded-2xl shadow-xl p-8`}
          >
            <div className="flex items-center space-x-2 mb-6">
              <Info
                className={`w-6 h-6 ${
                  darkMode ? "text-blue-400" : "text-blue-600"
                }`}
              />
              <h3
                className={`text-2xl font-bold ${
                  darkMode ? "text-white" : "text-gray-800"
                }`}
              >
                How to Use
              </h3>
            </div>
            <div className="space-y-6">
              <div className="border-l-4 border-blue-600 pl-4">
                <h4
                  className={`font-semibold ${
                    darkMode ? "text-gray-200" : "text-gray-800"
                  } mb-2`}
                >
                  Step 1: Prepare Image
                </h4>
                <p
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Ensure your image contains a single handwritten digit on a
                  clear background. For best results, use black ink on white
                  paper.
                </p>
              </div>
              <div className="border-l-4 border-blue-600 pl-4">
                <h4
                  className={`font-semibold ${
                    darkMode ? "text-gray-200" : "text-gray-800"
                  } mb-2`}
                >
                  Step 2: Upload
                </h4>
                <p
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Click the upload area or drag and drop your image file.
                  Supported formats: PNG, JPEG, JPG.
                </p>
              </div>
              <div className="border-l-4 border-blue-600 pl-4">
                <h4
                  className={`font-semibold ${
                    darkMode ? "text-gray-200" : "text-gray-800"
                  } mb-2`}
                >
                  Step 3: Process
                </h4>
                <p
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Click the "Recognize Digit" button and wait for the AI to
                  process your image.
                </p>
              </div>
              <div
                className={`mt-8 ${
                  darkMode ? "bg-gray-700" : "bg-blue-50"
                } p-4 rounded-lg`}
              >
                <h4
                  className={`font-semibold ${
                    darkMode ? "text-gray-200" : "text-gray-800"
                  } mb-2`}
                >
                  Tips
                </h4>
                <ul
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  } list-disc list-inside space-y-2`}
                >
                  <li>Write digits clearly and centered</li>
                  <li>Avoid touching edges of the paper</li>
                  <li>Ensure good lighting when taking photo</li>
                  <li>Crop image to focus on the digit</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Main Recognition Panel */}
          <div className="lg:w-2/3 grid grid-cols-1 gap-10">
            <div
              className={`${
                darkMode ? "bg-gray-800" : "bg-white"
              } rounded-2xl shadow-xl p-8 transform transition-all duration-300 hover:scale-105`}
            >
              <h2
                className={`text-3xl font-bold text-center ${
                  darkMode ? "text-white" : "text-gray-800"
                } mb-8`}
              >
                Recognize Handwritten Digits
              </h2>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="relative">
                  <div
                    className={`border-2 border-dashed ${
                      darkMode
                        ? "border-gray-600 hover:border-blue-400"
                        : "border-gray-300 hover:border-blue-500"
                    } rounded-lg p-6 transition-colors duration-200`}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="flex flex-col items-center text-gray-600">
                      <Upload
                        className={`w-12 h-12 mb-2 ${
                          darkMode ? "text-gray-500" : "text-gray-400"
                        }`}
                      />
                      <p
                        className={`text-sm font-medium ${
                          darkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        {file
                          ? file.name
                          : "Drop your image here or click to browse"}
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className={`w-full ${
                    darkMode
                      ? "bg-blue-500 hover:bg-blue-600"
                      : "bg-blue-600 hover:bg-blue-700"
                  } text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:-translate-y-1 hover:shadow-lg disabled:opacity-50`}
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Recognize Digit"}
                </button>
              </form>

              {/* Results/Feedback Section */}
              <div className="mt-8">
                {loading && (
                  <div className="flex items-center justify-center space-x-2">
                    <div
                      className={`w-4 h-4 ${
                        darkMode ? "bg-blue-400" : "bg-blue-600"
                      } rounded-full animate-bounce`}
                    />
                    <div
                      className={`w-4 h-4 ${
                        darkMode ? "bg-blue-400" : "bg-blue-600"
                      } rounded-full animate-bounce delay-100`}
                    />
                    <div
                      className={`w-4 h-4 ${
                        darkMode ? "bg-blue-400" : "bg-blue-600"
                      } rounded-full animate-bounce delay-200`}
                    />
                  </div>
                )}

                {prediction !== null && !loading && (
                  <div className="flex items-center justify-center space-x-2 text-green-500 animate-fade-in">
                    <Check className="w-6 h-6" />
                    <span className="text-2xl font-bold">
                      Predicted Digit: {prediction}
                    </span>
                  </div>
                )}

                {error && (
                  <div className="flex items-center justify-center space-x-2 text-red-500 animate-fade-in">
                    <AlertCircle className="w-6 h-6" />
                    <span className="text-sm font-medium">{error}</span>
                  </div>
                )}
              </div>
            </div>
            <a
              href="http://neuralnetworksanddeeplearning.com/index.html"
              className={`${
                darkMode
                  ? "bg-gray-700 text-blue-400"
                  : "bg-slate-300 text-blue-500"
              } font-bold py-5 px-10 rounded-xl text-center flex justify-center items-center`}
            >
              {"References: neuralnetworksanddeeplearning.com"}
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer
        className={`${
          darkMode ? "bg-gray-800" : "bg-gray-800"
        } text-white py-8`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About</h3>
              <p className="text-gray-400">
                This digit recognizer uses machine learning to identify
                handwritten digits from images.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a
                    href="http://neuralnetworksanddeeplearning.com/index.html"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-200"
                  >
                    API Reference
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Examples
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-200"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Twitter
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-200"
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
            <p>© 2024 Satyam Gupta. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
