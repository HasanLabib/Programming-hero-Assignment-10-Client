// import React, { use, useState } from "react";
// import { NavLink, Outlet } from "react-router";
// import { AuthContext } from "../../Provider/AuthContext";
// import {
//   FaHome,
//   FaPlus,
//   FaStar,
//   FaHeart,
//   FaUsers,
//   FaList,
//   FaBars,
//   FaTimes,
// } from "react-icons/fa";

// const DashboardLayout = () => {
//   const { user } = use(AuthContext);
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const isAdmin = user?.email === "admin@test.com";

//   return (
//     <div className="min-h-screen bg-gray-50 flex">
//       <aside
//         className={`
//           fixed inset-y-0 left-0 z-40 w-64 bg-white border-r
//           transform transition-transform duration-300
//           ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
//           lg:translate-x-0 lg:static
//         `}
//       >
//         <div className="lg:hidden flex justify-end p-4">
//           <button onClick={() => setSidebarOpen(false)}>
//             <FaTimes className="text-xl" />
//           </button>
//         </div>

//         <nav className="p-4 space-y-2">
//           <NavItem to="/dashboard" icon={<FaHome />} label="Dashboard Home" />
//           <NavItem
//             to="/dashboard/add-review"
//             icon={<FaPlus />}
//             label="Add Review"
//           />
//           <NavItem
//             to="/dashboard/my-reviews"
//             icon={<FaStar />}
//             label="My Reviews"
//           />
//           <NavItem
//             to="/dashboard/my-favorites"
//             icon={<FaHeart />}
//             label="My Favorites"
//           />

//           {isAdmin && (
//             <>
//               <div className="border-t my-3 pt-2">
//                 <p className="px-4 text-xs font-semibold text-gray-500 uppercase">
//                   Admin
//                 </p>
//               </div>
//               <NavItem
//                 to="/dashboard/all-reviews"
//                 icon={<FaList />}
//                 label="All Reviews"
//               />
//               <NavItem
//                 to="/dashboard/all-users"
//                 icon={<FaUsers />}
//                 label="All Users"
//               />
//             </>
//           )}
//         </nav>
//       </aside>

//       {sidebarOpen && (
//         <div
//           className="fixed inset-0 bg-opacity-40 z-30 lg:hidden"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}
//       <div className="flex-1 flex flex-col">
//         <header className="lg:hidden bg-white border-b p-4 flex items-center gap-4">
//           <button onClick={() => setSidebarOpen(true)}>
//             <FaBars className="text-xl" />
//           </button>
//           <h1 className="font-semibold text-lg">Dashboard</h1>
//         </header>

//         <main className="p-4 sm:p-6 lg:p-8 flex-1">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// };

// const NavItem = ({ to, icon, label }) => (
//   <NavLink
//     to={to}
//     end
//     className={({ isActive }) =>
//       `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
//       ${
//         isActive ? "bg-amber-500 text-white" : "text-gray-700 hover:bg-gray-100"
//       }`
//     }
//   >
//     <span className="text-lg">{icon}</span>
//     <span className="font-medium">{label}</span>
//   </NavLink>
// );

// export default DashboardLayout;

import React, { use, useState } from "react";
import { NavLink, Outlet } from "react-router";
import { AuthContext } from "../../Provider/AuthContext";
import {
  FaHome,
  FaPlus,
  FaStar,
  FaHeart,
  FaUsers,
  FaList,
  FaBars,
  FaTimes,
  FaEnvelope,
} from "react-icons/fa";

const DashboardLayout = () => {
  const { user } = use(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isAdmin = user?.email === "admin@test.com";

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-white border-r
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static
        `}
      >
        <div className="lg:hidden flex justify-end p-4">
          <button onClick={() => setSidebarOpen(false)}>
            <FaTimes className="text-xl" />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          <NavItem to="/dashboard" icon={<FaHome />} label="Dashboard Home" />
          <NavItem to="/dashboard/add-review" icon={<FaPlus />} label="Add Review" />
          <NavItem to="/dashboard/my-reviews" icon={<FaStar />} label="My Reviews" />
          <NavItem to="/dashboard/my-favorites" icon={<FaHeart />} label="My Favorites" />

          {isAdmin && (
            <>
              <div className="border-t my-3 pt-3">
                <p className="px-4 text-xs font-semibold text-gray-500 uppercase">
                  Admin
                </p>
              </div>

              <NavItem to="/dashboard/all-reviews" icon={<FaList />} label="All Reviews" />
              <NavItem to="/dashboard/all-users" icon={<FaUsers />} label="All Users" />
              <NavItem
                to="/dashboard/contact-messages"
                icon={<FaEnvelope />}
                label="Contact Messages"
              />
            </>
          )}
        </nav>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Content */}
      <div className="flex-1 flex flex-col">
        <header className="lg:hidden bg-white border-b p-4 flex items-center gap-4">
          <button onClick={() => setSidebarOpen(true)}>
            <FaBars className="text-xl" />
          </button>
          <h1 className="font-semibold text-lg">Dashboard</h1>
        </header>

        <main className="p-4 sm:p-6 lg:p-8 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

const NavItem = ({ to, icon, label }) => (
  <NavLink
    to={to}
    end
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
      ${
        isActive
          ? "bg-amber-500 text-white"
          : "text-gray-700 hover:bg-gray-100"
      }`
    }
  >
    <span className="text-lg">{icon}</span>
    <span className="font-medium">{label}</span>
  </NavLink>
);

export default DashboardLayout;

