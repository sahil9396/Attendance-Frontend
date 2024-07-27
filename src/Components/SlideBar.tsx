import '../App.css'; // Import your CSS file if needed for custom styles
// import React from 'react';
// import './Sidebar.css'; // Custom CSS file for any specific styles

function Sidebar({ isOpen, toggleSidebar }:any) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 bg-gradient-to-br from-tomato to-wheat shadow-lg z-50`}
    >
      <div className="flex justify-end p-4">
        <button onClick={() => toggleSidebar(false)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6 text-gray-800" viewBox="0 0 24 24">
            <path d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
      <ul className="menu mt-10">
        <li className="menu__item"><a className="menu__link" href="#Dashboard">Dashboard</a></li>
        <li className="menu__item"><a className="menu__link" href="#Profile">Profile</a></li>
        <li className="menu__item"><a className="menu__link" href="#Settings">Settings</a></li>
        <li className="menu__item"><a className="menu__link" href="#Messages">Messages</a></li>
        <li className="menu__item"><a className="menu__link" href="#Logout">Logout</a></li>
      </ul>
    </aside>
  );
}

export default Sidebar;
