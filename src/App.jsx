/**
 * Main application component.
 * Manages the state for the profile page, including active tabs and user/org data.
 */
import { useState } from 'react';
import '../profile.css';
import Sidebar from '../frontend/src/app/components/Sidebar';
import Header from '../frontend/src/app/components/Header';
import PersonalProfile from '../frontend/src/app/components/PersonalProfile';
import OrganizationProfile from '../frontend/src/app/components/OrganizationProfile';
import AIIntegrations from '../frontend/src/app/components/AIIntegrations';
import SecurityAccess from '../frontend/src/app/components/SecurityAccess';
import BillingPlan from '../frontend/src/app/components/BillingPlan';
import DangerZone from '../frontend/src/app/components/DangerZone';


function App() {
  const [activeTab, setActiveTab] = useState('personal');
  const [user, setUser] = useState({
    fullName: "Josie Smith",
    email: "josie.smith@example.com",
    jobTitle: "Content Strategist",
    department: "Marketing",
    workflowRole: "Reviewer",
    timeZone: "(GMT+5:30) Sri Lanka",
    language: "English",
    avatar: "/default-avatar.png"
  });

  const [org, setOrg] = useState({
    name: "Orean Inc.",
    industry: "SaaS",
    website: "orean.io",
    country: "Sri Lanka",
    plan: "Pro Scale",
    avatar: "/vite.svg"
  });

  const handleUserUpdate = (field, value) => {
    setUser(prev => ({ ...prev, [field]: value }));
  };

  const handleOrgUpdate = (field, value) => {
    setOrg(prev => ({ ...prev, [field]: value }));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'personal': return <PersonalProfile user={user} onUpdate={handleUserUpdate} />;
      case 'organization': return <OrganizationProfile org={org} onUpdate={handleOrgUpdate} />;
      case 'ai': return <AIIntegrations />;
      case 'security': return <SecurityAccess />;
      case 'billing': return <BillingPlan />;
      case 'danger': return <DangerZone />;
      default: return <PersonalProfile user={user} onUpdate={handleUserUpdate} />;
    }
  };
  const breadcrumbsText = activeTab === 'personal' ? 'Profile & Settings / Personal Profile' :
    activeTab === 'organization' ? 'Profile & Settings / Organization' :
      activeTab === 'ai' ? 'Profile & Settings / AI & Integrations' :
        activeTab === 'security' ? 'Profile & Settings / Security' :
          activeTab === 'billing' ? 'Profile & Settings / Billing' :
            'Profile & Settings / Danger Zone';

  return (
    <div className="app-container">
      <Header
        userAvatar={user.avatar}
        breadcrumbs={breadcrumbsText}
      />
      <div className="app-body">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="main-content">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;
