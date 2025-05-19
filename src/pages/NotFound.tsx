import { useNavigate } from "react-router-dom";

function NotFoundPage() {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <div>
      <h1 className="text-4xl font-bold text-center mt-20 text-red-500">
        <span className="font-bold text-red-700">404</span> - Page Not Found
      </h1>
      <p className="text-4xl font-bold text-center mt-20 text-red-500">
        Sorry, the page you are looking for does not exist.
      </p>

      <div className="flex items-center justify-center">
        <p
          onClick={handleGoBack}
          className="text-center my-4 cursor-pointer text-blue-500 hover:underline"
        >
          Go back
        </p>
      </div>
    </div>
  );
}

export default NotFoundPage;