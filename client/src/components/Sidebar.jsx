import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../context/authStore';
import { useUiStore } from '../context/uiStore';

const Sidebar = () => {
  const { user } = useAuthStore();
  const location = useLocation();
  const { isSidebarOpen, closeSidebar } = useUiStore();

  // Don't render the sidebar on auth pages (login/register) to avoid layout overlap
  const hideOnPaths = ['/login', '/register'];
  if (hideOnPaths.includes(location.pathname)) return null;

  // Define navigation items
  const navItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Posts', path: '/posts' },
    { name: 'Profile', path: '/profile' },
    ...(user && user.role === 'admin' ? [{ name: 'Users', path: '/users' }] : [])
  ];


  return (
    <>
      {/* Overlay for small screens */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden transition-opacity ${isSidebarOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={closeSidebar}
      />

      <aside className={`fixed z-40 top-0 left-0 h-full transform md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:w-64 w-64 bg-white dark:bg-gray-800 shadow-md transition-transform duration-200 ease-in-out flex flex-col`}
      >
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h1 className="text-xl font-bold text-center text-blue-600 dark:text-blue-400">
            MySideBar
          </h1>
          <button className="md:hidden text-gray-600 dark:text-gray-300" onClick={closeSidebar} aria-label="Close sidebar">✕</button>
        </div>

        <nav className="flex-1 mt-6 overflow-y-auto">
        <ul>
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center px-6 py-3 text-base font-medium transition duration-300 ${
                  location.pathname === item.path
                    ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
                onClick={closeSidebar}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
<Link to="/profile" className="w-8 h-8 rounded-xl overflow-hidden">
              {user.avatar ? (
                    <img
                        src={user.avatar}
                        alt="User Avatar"
                        className="w-full h-full object-cover"
                    />
                ) : (
                    // Optional: A fallback placeholder if user.avatar is missing
                    <div className="bg-gray-200 border-2 border-dashed border-gray-400 rounded-xl w-8 h-8 flex items-center justify-center dark:bg-gray-700">
                        {/* You can add initials or an icon here */}
                        <svg className="w-5 h-5 text-gray-500 dark:text-gray-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                    </div>
                )}
              </Link>          <div>
            <p className="font-medium text-gray-700 dark:text-gray-300">{user?.name}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">{user?.role}</p>
          </div>
        </div>
      </div>
      </aside>
    </>
  );
};

export default Sidebar;