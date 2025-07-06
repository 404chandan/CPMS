import React from 'react';

function LandingPlacementStats() {
  const stats = {
    overall: '82%',
    averagePackage: '₹8.2 LPA',
    medianPackage: '₹7.5 LPA',
    highestPackage: '₹44 LPA',
    branchWise: [
      { branch: 'CSE', placement: '95%' },
      { branch: 'ECE', placement: '89%' },
      { branch: 'ME', placement: '76%' },
      { branch: 'EE', placement: '72%' },
      { branch: 'CE', placement: '65%' },
    ],
  };

  return (
    <section className="bg-gray-100 py-16 px-4" id="placement-stats">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-purple-700">Placement Statistics</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-white mb-10">
          <div className="bg-green-500 rounded-xl py-6 px-4 shadow-lg">
            <h3 className="text-lg font-semibold mb-2">Overall Placement</h3>
            <p className="text-3xl font-bold">{stats.overall}</p>
          </div>
          <div className="bg-blue-500 rounded-xl py-6 px-4 shadow-lg">
            <h3 className="text-lg font-semibold mb-2">Average Package</h3>
            <p className="text-3xl font-bold">{stats.averagePackage}</p>
          </div>
          <div className="bg-yellow-500 rounded-xl py-6 px-4 shadow-lg">
            <h3 className="text-lg font-semibold mb-2">Median Package</h3>
            <p className="text-3xl font-bold">{stats.medianPackage}</p>
          </div>
          <div className="bg-red-500 rounded-xl py-6 px-4 shadow-lg">
            <h3 className="text-lg font-semibold mb-2">Highest Package</h3>
            <p className="text-3xl font-bold">{stats.highestPackage}</p>
          </div>
        </div>

        <div className="mt-10">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">Branch-wise Placement</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {stats.branchWise.map((branchStat, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-300 rounded-lg shadow-md py-4"
              >
                <h4 className="text-lg font-medium text-purple-600">{branchStat.branch}</h4>
                <p className="text-xl font-bold text-gray-700">{branchStat.placement}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default LandingPlacementStats;
