import React from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { 
  Home, 
  Users, 
  Calendar, 
  BarChart3, 
  Settings, 
  Search,
  FileText,
  MessageSquare,
  Bell,
  LogOut,
  User,
  ChevronUp,
  Edit3
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { logout } from '../../store/userSlice';
import toast from 'react-hot-toast';

const Sidebar = () => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Candidates', href: '/candidates', icon: Users },
    { name: 'Pipeline', href: '/pipeline', icon: FileText },
    { name: 'Interviews', href: '/interviews', icon: Calendar },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
    { name: 'Messages', href: '/messages', icon: MessageSquare },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  const handleLogout = () => {
    setShowProfileMenu(false);
    dispatch(logout());
    toast.success('Logged out successfully');
  };

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
    // In a real app, this would mark notifications as read
    toast.success('Notifications feature - would show recent notifications');
  };

  const handleProfileClick = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  const handleEditProfile = () => {
    setShowProfileMenu(false);
    // Navigate to profile settings
    window.location.href = '/settings';
    toast.success('Redirecting to profile settings...');
  };
  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
      {/* Logo and Company */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Search className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">TalentTrack</h1>
            <p className="text-sm text-gray-500">HR Dashboard</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                  isActive
                    ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-200 relative">
        <button 
          onClick={handleProfileClick}
          className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <img
            src={user?.avatar || 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=1'}
            alt={user?.name}
            className="w-10 h-10 rounded-full"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
            <p className="text-xs text-gray-500 truncate">{user?.department}</p>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                handleNotificationClick();
              }}
              className="relative p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Bell className="w-4 h-4 text-gray-400" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-bold">3</span>
              </div>
            </button>
            <ChevronUp className={`w-4 h-4 text-gray-400 transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} />
          </div>
        </button>
        
        {/* Profile Menu */}
        {showProfileMenu && (
          <div className="absolute bottom-full left-4 right-4 mb-2 bg-white border border-gray-200 rounded-lg shadow-xl py-2 z-50">
            <div className="px-4 py-2 border-b border-gray-100">
              <p className="text-sm font-medium text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
            <button
              onClick={handleEditProfile}
              className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors"
            >
              <Edit3 className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-700">Edit Profile</span>
            </button>
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-4 h-4 text-red-500" />
              <span className="text-sm text-red-600">Sign Out</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;