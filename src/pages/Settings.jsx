import { useState } from 'react';
import { useAuth } from '../components/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { 
  Settings as SettingsIcon, LogOut, User, ArrowLeft, 
  Bell, Shield, Palette, Sun, Moon, Download, Trash2, ChevronDown
} from 'lucide-react';

const Settings = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    weekly: true
  });
  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    showSkills: true,
    showPreferences: false
  });
  
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const handleLogout = () => {
    const confirmed = window.confirm('Are you sure you want to logout?');
    if (!confirmed) return;
    logout();
    navigate('/login');
  };

  const handleNotificationChange = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handlePrivacyChange = (key) => {
    setPrivacy(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="modern-dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <div className="logo">
            <span className="logo-text">Jobsease</span>
          </div>
        </div>
        
        <div className="header-right" style={{ position: 'relative' }}>
          <div className="theme-toggle-switch" onClick={toggleTheme}>
            <div className={`toggle-track-theme ${theme === 'dark' ? 'active' : ''}`}>
              <div className="toggle-thumb-theme">
                {theme === 'light' ? <Sun size={28} /> : <Moon size={28} />}
              </div>
            </div>
          </div>
          <div className="user-profile" onClick={() => setShowUserMenu(v => !v)} style={{ cursor: 'pointer' }}>
            <span className="welcome-text">{user?.fullName?.split(' ')[0] || 'User'}</span>
            <div className="user-avatar">
              {user?.profilePhoto ? (
                <img src={user.profilePhoto} alt="Profile" className="avatar-img" />
              ) : (
                <div className="avatar-img">
                  <User size={20} />
                </div>
              )}
              <ChevronDown size={16} />
            </div>
          </div>
          {showUserMenu && (
            <div className="user-menu">
              <button className="action-btn secondary" style={{ width: '100%' }} onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </header>

      <div className="dashboard-layout">
        {/* Sidebar */}
        <aside className="dashboard-sidebar">
          <nav className="sidebar-nav">
            <div className="nav-item" onClick={handleBackToDashboard}>
              <ArrowLeft size={20} />
              <span>Back to Dashboard</span>
            </div>
            <div className="nav-item active">
              <SettingsIcon size={20} />
              <span>Settings</span>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="dashboard-main">
          <div className="onboarding-section">
            <div className="section-header">
              <h1 className="section-title">Settings</h1>
              <p className="section-subtitle">Manage your account preferences</p>
            </div>

            {/* Settings Sections */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '24px' }}>
              {/* Theme Settings */}
              <div className="settings-card" style={{
                borderRadius: '16px',
                padding: '24px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '20px'
                }}>
                  <div className="settings-section-header-icon" style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Palette size={20} />
                  </div>
                  <div>
                    <h3 className="settings-section-title" style={{
                      fontSize: '18px',
                      fontWeight: '600',
                      marginBottom: '2px'
                    }}>Appearance</h3>
                    <p className="settings-section-subtitle" style={{
                      fontSize: '13px'
                    }}>Customize the look and feel</p>
                  </div>
                </div>
                
                <div style={{
                  paddingLeft: '52px'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingBottom: '16px'
                  }}>
                    <div>
                      <h4 className="settings-item-title" style={{
                        fontSize: '14px',
                        fontWeight: '500',
                        marginBottom: '4px'
                      }}>Theme</h4>
                      <p className="settings-item-description" style={{
                        fontSize: '13px'
                      }}>Choose between light and dark themes</p>
                    </div>
                    <div style={{
                      display: 'flex',
                      gap: '8px'
                    }}>
                      <button 
                        onClick={() => handleThemeChange('light')}
                        className={`settings-theme-button ${theme === 'light' ? 'active' : ''}`}
                        style={{
                          padding: '8px 16px',
                          borderRadius: '8px',
                          fontSize: '13px',
                          fontWeight: '500',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <Sun size={16} />
                        Light
                      </button>
                      <button 
                        onClick={() => handleThemeChange('dark')}
                        className={`settings-theme-button ${theme === 'dark' ? 'active' : ''}`}
                        style={{
                          padding: '8px 16px',
                          borderRadius: '8px',
                          fontSize: '13px',
                          fontWeight: '500',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <Moon size={16} />
                        Dark
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notification Settings */}
              <div className="settings-card" style={{
                borderRadius: '16px',
                padding: '24px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '20px'
                }}>
                  <div className="settings-section-header-icon" style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Bell size={20} />
                  </div>
                  <div>
                    <h3 className="settings-section-title" style={{
                      fontSize: '18px',
                      fontWeight: '600',
                      marginBottom: '2px'
                    }}>Notifications</h3>
                    <p className="settings-section-subtitle" style={{
                      fontSize: '13px'
                    }}>Control how you receive notifications</p>
                  </div>
                </div>
                
                <div style={{
                  paddingLeft: '52px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px'
                }}>
                  {/* Email Notifications */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <h4 className="settings-item-title" style={{
                        fontSize: '14px',
                        fontWeight: '500',
                        marginBottom: '4px'
                      }}>Email Notifications</h4>
                      <p className="settings-item-description" style={{
                        fontSize: '13px'
                      }}>Receive job matches and updates via email</p>
                    </div>
                    <label style={{
                      position: 'relative',
                      display: 'inline-block',
                      width: '44px',
                      height: '24px',
                      cursor: 'pointer'
                    }}>
                      <input 
                        type="checkbox" 
                        checked={notifications.email}
                        onChange={() => handleNotificationChange('email')}
                        style={{ opacity: 0, width: 0, height: 0 }}
                      />
                      <span className={`settings-toggle-bg ${notifications.email ? 'active' : ''}`} style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        borderRadius: '24px',
                        transition: '0.3s',
                        cursor: 'pointer'
                      }}>
                        <span style={{
                          position: 'absolute',
                          content: '',
                          height: '18px',
                          width: '18px',
                          left: notifications.email ? '23px' : '3px',
                          bottom: '3px',
                          background: 'white',
                          borderRadius: '50%',
                          transition: '0.3s'
                        }} />
                      </span>
                    </label>
                  </div>

                  {/* Push Notifications */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <h4 className="settings-item-title" style={{
                        fontSize: '14px',
                        fontWeight: '500',
                        marginBottom: '4px'
                      }}>Push Notifications</h4>
                      <p className="settings-item-description" style={{
                        fontSize: '13px'
                      }}>Get instant notifications in your browser</p>
                    </div>
                    <label style={{
                      position: 'relative',
                      display: 'inline-block',
                      width: '44px',
                      height: '24px',
                      cursor: 'pointer'
                    }}>
                      <input 
                        type="checkbox" 
                        checked={notifications.push}
                        onChange={() => handleNotificationChange('push')}
                        style={{ opacity: 0, width: 0, height: 0 }}
                      />
                      <span className={`settings-toggle-bg ${notifications.push ? 'active' : ''}`} style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        borderRadius: '24px',
                        transition: '0.3s',
                        cursor: 'pointer'
                      }}>
                        <span style={{
                          position: 'absolute',
                          content: '',
                          height: '18px',
                          width: '18px',
                          left: notifications.push ? '23px' : '3px',
                          bottom: '3px',
                          background: 'white',
                          borderRadius: '50%',
                          transition: '0.3s'
                        }} />
                      </span>
                    </label>
                  </div>

                  {/* SMS Notifications */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <h4 className="settings-item-title" style={{
                        fontSize: '14px',
                        fontWeight: '500',
                        marginBottom: '4px'
                      }}>SMS Notifications</h4>
                      <p className="settings-item-description" style={{
                        fontSize: '13px'
                      }}>Receive important updates via text message</p>
                    </div>
                    <label style={{
                      position: 'relative',
                      display: 'inline-block',
                      width: '44px',
                      height: '24px',
                      cursor: 'pointer'
                    }}>
                      <input 
                        type="checkbox" 
                        checked={notifications.sms}
                        onChange={() => handleNotificationChange('sms')}
                        style={{ opacity: 0, width: 0, height: 0 }}
                      />
                      <span className={`settings-toggle-bg ${notifications.sms ? 'active' : ''}`} style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        borderRadius: '24px',
                        transition: '0.3s',
                        cursor: 'pointer'
                      }}>
                        <span style={{
                          position: 'absolute',
                          content: '',
                          height: '18px',
                          width: '18px',
                          left: notifications.sms ? '23px' : '3px',
                          bottom: '3px',
                          background: 'white',
                          borderRadius: '50%',
                          transition: '0.3s'
                        }} />
                      </span>
                    </label>
                  </div>

                  {/* Weekly Digest */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <h4 className="settings-item-title" style={{
                        fontSize: '14px',
                        fontWeight: '500',
                        marginBottom: '4px'
                      }}>Weekly Digest</h4>
                      <p className="settings-item-description" style={{
                        fontSize: '13px'
                      }}>Get a summary of your weekly job matches</p>
                    </div>
                    <label style={{
                      position: 'relative',
                      display: 'inline-block',
                      width: '44px',
                      height: '24px',
                      cursor: 'pointer'
                    }}>
                      <input 
                        type="checkbox" 
                        checked={notifications.weekly}
                        onChange={() => handleNotificationChange('weekly')}
                        style={{ opacity: 0, width: 0, height: 0 }}
                      />
                      <span className={`settings-toggle-bg ${notifications.weekly ? 'active' : ''}`} style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        borderRadius: '24px',
                        transition: '0.3s',
                        cursor: 'pointer'
                      }}>
                        <span style={{
                          position: 'absolute',
                          content: '',
                          height: '18px',
                          width: '18px',
                          left: notifications.weekly ? '23px' : '3px',
                          bottom: '3px',
                          background: 'white',
                          borderRadius: '50%',
                          transition: '0.3s'
                        }} />
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Privacy Settings */}
              <div className="settings-card" style={{
                borderRadius: '16px',
                padding: '24px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '20px'
                }}>
                  <div className="settings-section-header-icon" style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Shield size={20} />
                  </div>
                  <div>
                    <h3 className="settings-section-title" style={{
                      fontSize: '18px',
                      fontWeight: '600',
                      marginBottom: '2px'
                    }}>Privacy</h3>
                    <p className="settings-section-subtitle" style={{
                      fontSize: '13px'
                    }}>Control your profile visibility</p>
                  </div>
                </div>
                
                <div style={{
                  paddingLeft: '52px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px'
                }}>
                  {/* Profile Visibility */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <h4 className="settings-item-title" style={{
                        fontSize: '14px',
                        fontWeight: '500',
                        marginBottom: '4px'
                      }}>Profile Visibility</h4>
                      <p className="settings-item-description" style={{
                        fontSize: '13px'
                      }}>Make your profile visible to employers</p>
                    </div>
                    <label style={{
                      position: 'relative',
                      display: 'inline-block',
                      width: '44px',
                      height: '24px',
                      cursor: 'pointer'
                    }}>
                      <input 
                        type="checkbox" 
                        checked={privacy.profileVisible}
                        onChange={() => handlePrivacyChange('profileVisible')}
                        style={{ opacity: 0, width: 0, height: 0 }}
                      />
                      <span className={`settings-toggle-bg ${privacy.profileVisible ? 'active' : ''}`} style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        borderRadius: '24px',
                        transition: '0.3s',
                        cursor: 'pointer'
                      }}>
                        <span style={{
                          position: 'absolute',
                          content: '',
                          height: '18px',
                          width: '18px',
                          left: privacy.profileVisible ? '23px' : '3px',
                          bottom: '3px',
                          background: 'white',
                          borderRadius: '50%',
                          transition: '0.3s'
                        }} />
                      </span>
                    </label>
                  </div>

                  {/* Show Skills */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <h4 className="settings-item-title" style={{
                        fontSize: '14px',
                        fontWeight: '500',
                        marginBottom: '4px'
                      }}>Show Skills</h4>
                      <p className="settings-item-description" style={{
                        fontSize: '13px'
                      }}>Display your skills on your public profile</p>
                    </div>
                    <label style={{
                      position: 'relative',
                      display: 'inline-block',
                      width: '44px',
                      height: '24px',
                      cursor: 'pointer'
                    }}>
                      <input 
                        type="checkbox" 
                        checked={privacy.showSkills}
                        onChange={() => handlePrivacyChange('showSkills')}
                        style={{ opacity: 0, width: 0, height: 0 }}
                      />
                      <span className={`settings-toggle-bg ${privacy.showSkills ? 'active' : ''}`} style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        borderRadius: '24px',
                        transition: '0.3s',
                        cursor: 'pointer'
                      }}>
                        <span style={{
                          position: 'absolute',
                          content: '',
                          height: '18px',
                          width: '18px',
                          left: privacy.showSkills ? '23px' : '3px',
                          bottom: '3px',
                          background: 'white',
                          borderRadius: '50%',
                          transition: '0.3s'
                        }} />
                      </span>
                    </label>
                  </div>

                  {/* Show Job Preferences */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <h4 className="settings-item-title" style={{
                        fontSize: '14px',
                        fontWeight: '500',
                        marginBottom: '4px'
                      }}>Show Job Preferences</h4>
                      <p className="settings-item-description" style={{
                        fontSize: '13px'
                      }}>Display your job preferences to employers</p>
                    </div>
                    <label style={{
                      position: 'relative',
                      display: 'inline-block',
                      width: '44px',
                      height: '24px',
                      cursor: 'pointer'
                    }}>
                      <input 
                        type="checkbox" 
                        checked={privacy.showPreferences}
                        onChange={() => handlePrivacyChange('showPreferences')}
                        style={{ opacity: 0, width: 0, height: 0 }}
                      />
                      <span className={`settings-toggle-bg ${privacy.showPreferences ? 'active' : ''}`} style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        borderRadius: '24px',
                        transition: '0.3s',
                        cursor: 'pointer'
                      }}>
                        <span style={{
                          position: 'absolute',
                          content: '',
                          height: '18px',
                          width: '18px',
                          left: privacy.showPreferences ? '23px' : '3px',
                          bottom: '3px',
                          background: 'white',
                          borderRadius: '50%',
                          transition: '0.3s'
                        }} />
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Account Settings */}
              <div className="settings-card" style={{
                borderRadius: '16px',
                padding: '24px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '20px'
                }}>
                  <div className="settings-section-header-icon" style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <User size={20} />
                  </div>
                  <div>
                    <h3 className="settings-section-title" style={{
                      fontSize: '18px',
                      fontWeight: '600',
                      marginBottom: '2px'
                    }}>Account</h3>
                    <p className="settings-section-subtitle" style={{
                      fontSize: '13px'
                    }}>Manage your account data</p>
                  </div>
                </div>
                
                <div style={{
                  paddingLeft: '52px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px'
                }}>
                  {/* Export Data */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <h4 className="settings-item-title" style={{
                        fontSize: '14px',
                        fontWeight: '500',
                        marginBottom: '4px'
                      }}>Export Data</h4>
                      <p className="settings-item-description" style={{
                        fontSize: '13px'
                      }}>Download a copy of your profile and job data</p>
                    </div>
                    <button className="settings-button-secondary" style={{
                      padding: '8px 16px',
                      borderRadius: '8px',
                      fontSize: '13px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      transition: 'all 0.2s ease'
                    }}>
                      <Download size={16} />
                      Export
                    </button>
                  </div>

                  {/* Delete Account */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <h4 className="settings-item-title" style={{
                        fontSize: '14px',
                        fontWeight: '500',
                        marginBottom: '4px'
                      }}>Delete Account</h4>
                      <p className="settings-item-description" style={{
                        fontSize: '13px'
                      }}>Permanently delete your account and all data</p>
                    </div>
                    <button className="settings-button-danger" style={{
                      padding: '8px 16px',
                      borderRadius: '8px',
                      fontSize: '13px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      transition: 'all 0.2s ease'
                    }}>
                      <Trash2 size={16} />
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;

