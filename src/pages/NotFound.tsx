import { useNavigate } from "react-router-dom";

function NotFoundPage() {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <div className="min-h-screen">
      <h1 className="text-4xl font-bold text-center mt-20 text-red-500">
        <span className="font-bold text-red-700">404</span> - Page Not Found
      </h1>
      <p className="text-4xl font-bold text-center mt-20 text-red-500">
        Sorry, the page you are looking for does not exist.
      </p>

      <div className="flex items-center justify-center">
        <p
          onClick={handleGoBack}
          className="text-center my-4 hover:underline"
        >
          <button className="mt-6 inline-block px-6 py-2 bg-red-600 hover:bg-red-700 rounded-md transition-colors cursor-pointer">
            Explore Music
          </button>
        </p>
      </div>
    </div>
  );
}

export default NotFoundPage;
