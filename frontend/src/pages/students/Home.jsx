import React from 'react';
import { Link } from 'react-router-dom';
import NoticeBox from '../../components/NoticeBox';
import NotificationBox from '../../components/Students/NotificationBox';

function Home() {
  // Set the page title
  document.title = 'TPMS | Student Dashboard';

  const userId = localStorage.getItem('userId'); // Or from context/auth if available

  return (
    <>
      <div className="mb-4">
        {/* Complete Profile Link */}
        <Link
          to={`/student/dashboard/complete-profile/${userId}`}
          className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition no-underline"
        >
          Complete Your Profile
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-2 max-sm:grid-cols-1">
        <NotificationBox />
        <NoticeBox />
      </div>
    </>
  );
}

export default Home;
