import React, { useState } from 'react';
import { 
  Bell, 
  Briefcase, 
  Building2, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Trash2,
  Check,
  X,
  Filter,
  Search
} from 'lucide-react';
import '../styles/CandidateNoti.css';

const Notifications = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'application',
      title: 'Application Viewed',
      message: 'Your application for Senior UI/UX Designer at Google Inc has been viewed by the employer.',
      company: 'Google Inc',
      time: '2 hours ago',
      isRead: false,
      icon: 'briefcase'
    },
    {
      id: 2,
      type: 'shortlist',
      title: 'You are Shortlisted',
      message: 'Congratulations! You have been shortlisted for Product Designer position at Microsoft.',
      company: 'Microsoft',
      time: '5 hours ago',
      isRead: false,
      icon: 'check'
    },
    {
      id: 3,
      type: 'interview',
      title: 'Interview Scheduled',
      message: 'Your interview for Frontend Developer at Amazon has been scheduled for tomorrow at 10:00 AM.',
      company: 'Amazon',
      time: '1 day ago',
      isRead: true,
      icon: 'clock'
    },
    {
      id: 4,
      type: 'rejected',
      title: 'Application Rejected',
      message: 'Unfortunately, your application for Backend Developer at Apple Inc was not successful.',
      company: 'Apple Inc',
      time: '2 days ago',
      isRead: true,
      icon: 'x'
    },
    {
      id: 5,
      type: 'saved',
      title: 'Profile Saved',
      message: 'TechCorp has saved your profile for future opportunities.',
      company: 'TechCorp',
      time: '3 days ago',
      isRead: true,
      icon: 'building'
    },
    {
      id: 6,
      type: 'application',
      title: 'Application Submitted',
      message: 'Your application for Full Stack Developer at Facebook has been successfully submitted.',
      company: 'Facebook',
      time: '4 days ago',
      isRead: true,
      icon: 'briefcase'
    },
    {
      id: 7,
      type: 'alert',
      title: 'New Job Alert',
      message: '5 new jobs matching your preferences have been posted.',
      company: 'System',
      time: '5 days ago',
      isRead: true,
      icon: 'bell'
    },
    {
      id: 8,
      type: 'shortlist',
      title: 'You are Shortlisted',
      message: 'Great news! You have been shortlisted for Senior Developer at Netflix.',
      company: 'Netflix',
      time: '1 week ago',
      isRead: true,
      icon: 'check'
    }
  ]);

  const handleMarkAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, isRead: true } : notif
    ));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, isRead: true })));
  };

  const handleDelete = (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const handleDeleteAll = () => {
    if (window.confirm('Are you sure you want to delete all notifications?')) {
      setNotifications([]);
    }
  };

  const getFilteredNotifications = () => {
    let filtered = notifications;

    // Filter by type
    if (activeFilter !== 'all') {
      filtered = filtered.filter(notif => notif.type === activeFilter);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(notif => 
        notif.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        notif.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
        notif.company.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  };

  const getNotificationIcon = (iconType) => {
    const iconMap = {
      briefcase: <Briefcase size={20} />,
      check: <CheckCircle size={20} />,
      clock: <Clock size={20} />,
      x: <XCircle size={20} />,
      building: <Building2 size={20} />,
      bell: <Bell size={20} />
    };
    return iconMap[iconType] || <Bell size={20} />;
  };

  const getNotificationTypeClass = (type) => {
    const typeMap = {
      application: 'notification-type-application',
      shortlist: 'notification-type-shortlist',
      interview: 'notification-type-interview',
      rejected: 'notification-type-rejected',
      saved: 'notification-type-saved',
      alert: 'notification-type-alert'
    };
    return typeMap[type] || '';
  };

  const filteredNotifications = getFilteredNotifications();
  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="jobpilot-notifications-page">
      <div className="jobpilot-notifications-container">
        {/* Header */}
        <div className="notifications-header">
          <div className="notifications-header-left">
            <h1 className="notifications-title">
              <Bell size={28} />
              Notifications
              {unreadCount > 0 && (
                <span className="notifications-badge">{unreadCount}</span>
              )}
            </h1>
            <p className="notifications-subtitle">
              Stay updated with your job applications and opportunities
            </p>
          </div>
          <div className="notifications-header-actions">
            <button 
              className="notifications-action-btn"
              onClick={handleMarkAllAsRead}
              disabled={unreadCount === 0}
            >
              <Check size={18} />
              Mark all as read
            </button>
            <button 
              className="notifications-action-btn notifications-delete-all-btn"
              onClick={handleDeleteAll}
              disabled={notifications.length === 0}
            >
              <Trash2 size={18} />
              Delete all
            </button>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="notifications-filters">
          <div className="notifications-filter-tabs">
            <button
              className={`filter-tab ${activeFilter === 'all' ? 'filter-tab-active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              All ({notifications.length})
            </button>
            <button
              className={`filter-tab ${activeFilter === 'application' ? 'filter-tab-active' : ''}`}
              onClick={() => setActiveFilter('application')}
            >
              <Briefcase size={16} />
              Applications
            </button>
            <button
              className={`filter-tab ${activeFilter === 'shortlist' ? 'filter-tab-active' : ''}`}
              onClick={() => setActiveFilter('shortlist')}
            >
              <CheckCircle size={16} />
              Shortlisted
            </button>
            <button
              className={`filter-tab ${activeFilter === 'interview' ? 'filter-tab-active' : ''}`}
              onClick={() => setActiveFilter('interview')}
            >
              <Clock size={16} />
              Interviews
            </button>
            <button
              className={`filter-tab ${activeFilter === 'alert' ? 'filter-tab-active' : ''}`}
              onClick={() => setActiveFilter('alert')}
            >
              <Bell size={16} />
              Alerts
            </button>
          </div>

          <div className="notifications-search">
            <Search size={20} className="search-icon" />
            <input
              type="text"
              className="notifications-search-input"
              placeholder="Search notifications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Notifications List */}
        <div className="notifications-list">
          {filteredNotifications.length === 0 ? (
            <div className="notifications-empty">
              <Bell size={64} />
              <h3>No notifications found</h3>
              <p>You're all caught up! Check back later for updates.</p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`notification-item ${!notification.isRead ? 'notification-unread' : ''}`}
              >
                <div className={`notification-icon ${getNotificationTypeClass(notification.type)}`}>
                  {getNotificationIcon(notification.icon)}
                </div>

                <div className="notification-content">
                  <div className="notification-header-row">
                    <h3 className="notification-title-text">{notification.title}</h3>
                    <span className="notification-time">{notification.time}</span>
                  </div>
                  <p className="notification-message">{notification.message}</p>
                  <div className="notification-meta">
                    <span className="notification-company">
                      <Building2 size={14} />
                      {notification.company}
                    </span>
                  </div>
                </div>

                <div className="notification-actions">
                  {!notification.isRead && (
                    <button
                      className="notification-action-btn"
                      onClick={() => handleMarkAsRead(notification.id)}
                      title="Mark as read"
                    >
                      <Check size={18} />
                    </button>
                  )}
                  <button
                    className="notification-action-btn notification-delete-btn"
                    onClick={() => handleDelete(notification.id)}
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {filteredNotifications.length > 0 && (
          <div className="notifications-pagination">
            <span className="pagination-info">
              Showing {filteredNotifications.length} of {notifications.length} notifications
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;