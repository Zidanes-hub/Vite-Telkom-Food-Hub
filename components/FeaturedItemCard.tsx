// components/FeaturedItemCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';

// Definisikan tipe datanya
interface FeaturedItemProps {
  item: {
    name: string;
    price: string;
    image: string;
    outletName: string;
    outletSlug: string;
  };
}

const FeaturedItemCard: React.FC<FeaturedItemProps> = ({ item }) => {
  return (
    <Link 
      to={`/outlet/${item.outletSlug}`} 
      // HAPUS w-72, TAMBAH h-full
      className="block h-full rounded-2xl overflow-hidden shadow-lg bg-white transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
    >
      <div className="relative">
        <img src={item.image} alt={item.name} className="w-full h-60 object-cover" />
        
        <div className="absolute top-3 right-3 bg-yellow-400 text-gray-800 text-xs font-bold px-3 py-1 rounded-full shadow-md">
          ⭐ Best Seller
        </div>
      </div>
      <div className="p-4">
        <h4 className="font-bold text-lg text-gray-800 truncate">{item.name}</h4>
        <p className="text-sm text-gray-500 capitalize">{item.outletName}</p>
        <p className="text-lg font-bold text-red-600 mt-2">{item.price}</p>
      </div>
    </Link>
  );
};

export default FeaturedItemCard;