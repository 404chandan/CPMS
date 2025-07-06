import React from 'react';

const coordinators = Array.from({ length: 16 }).map((_, idx) => ({
  id: idx + 1,
  name: `Coordinator ${idx + 1}`,
  email: `coordinator${idx + 1}@college.edu`,
  phone: `+91-98765432${String(idx).padStart(2, '0')}`,
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8AJM9wkP__z2M-hovSAWcTb_9XJ6smy3NKw&s',
}));

const PlacementCoordinators = () => {
  return (
    <section id="placement-coordinators" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-10">Placement Coordinators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {coordinators.map(({ id, name, email, phone, image }) => (
            <div key={id} className="bg-white rounded-xl shadow hover:shadow-lg transition duration-300 p-4 text-center">
              <img
                src={image}
                alt={name}
                className="w-24 h-24 mx-auto rounded-full object-cover border-2 border-purple-500"
              />
              <h3 className="text-lg font-semibold mt-4 text-gray-800">{name}</h3>
              <p className="text-sm text-gray-600">{email}</p>
              <p className="text-sm text-gray-600">{phone}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlacementCoordinators;
