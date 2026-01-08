import { Link } from "react-router-dom";
import { ROUTES } from "../router/routes";

export const HomePage = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Welcome to WinterShop ⛷️
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Your one-stop shop for all your winter sports needs. Explore our wide
          range of products and gear up for your next adventure!
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to={ROUTES.PRODUCTS}
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition-colors font-semibold"
          >
            Shop Now
          </Link>
          <Link
            to={ROUTES.ORDERS}
            className="inline-block bg-gray-200 text-gray-800 px-6 py-3 rounded-lg shadow hover:bg-gray-300 transition-colors font-semibold"
          >
            View Orders
          </Link>
        </div>
      </div>

      {/* Section features */}
      <div className="mt-16 grid md:grid-cols-3 gap-8">
        <div className="text-center">
          <div className="text-4xl mb-4">🎿</div>
          <h3 className="text-lg font-semibold mb-2">Ski selection</h3>
          <p className="text-gray-600">
            Find the perfect skis for your style and skill level.
          </p>
        </div>

        <div className="text-center">
          <div className="text-4xl mb-4">❄️</div>
          <h3 className="text-lg font-semibold mb-2">Winter Gear</h3>
          <p className="text-gray-600">
            Stay warm and stylish with our range of winter clothing and
            accessories.
          </p>
        </div>

        <div className="text-center">
          <div className="text-4xl mb-4">🏂</div>
          <h3 className="text-lg font-semibold mb-2">Snowboard</h3>
          <p className="text-gray-600">
            Explore our collection of snowboards for all skill levels.
          </p>
        </div>
      </div>
    </div>
  );
};
