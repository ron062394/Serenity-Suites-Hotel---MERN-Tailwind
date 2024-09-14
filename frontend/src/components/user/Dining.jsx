import React from 'react';
import { MdRestaurant } from 'react-icons/md';
import { Link } from 'react-router-dom';

const Dining = () => {
  return (
    <section id="dining" className="py-12 sm:py-16 md:py-24 bg-emerald-800 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center">Culinary Delights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <img src="https://media.istockphoto.com/id/1446478827/photo/a-chef-is-cooking-in-his-restaurants-kitchen.jpg?s=612x612&w=0&k=20&c=jwKJmGErrLe2XsTWNYEEyiNicudYVA4j8jvnTiJdp58=" alt="Gourmet Dining" className="rounded-lg shadow-lg w-full h-auto" />
          <div className="flex flex-col items-center md:items-start">
            <MdRestaurant className="text-5xl sm:text-6xl mb-4 text-amber-400" />
            <p className="text-base sm:text-lg mb-6 text-justify">
              Embark on a gastronomic journey at Serenity Suites, where culinary excellence meets unparalleled luxury. Our Michelin-starred chefs craft exquisite dishes that tantalize the taste buds and ignite the senses. From farm-fresh local ingredients to exotic flavors from around the world, every meal is a masterpiece. Complement your dining experience with selections from our sommelier-curated wine list, featuring rare vintages and boutique labels. Whether you're savoring a romantic dinner for two or hosting a grand celebration, our diverse dining venues offer the perfect ambiance for every occasion.
            </p>
            <Link to="/dining" className="inline-block px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg font-semibold text-white bg-amber-600 rounded-md shadow-lg hover:bg-amber-700 transition-all duration-300 ease-in-out transform hover:scale-105">
              Reserve Your Table
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dining;