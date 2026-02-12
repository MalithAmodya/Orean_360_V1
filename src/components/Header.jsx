/**
 * Header Component
 * Displays breadcrumb navigation and user actions (notifications, profile).
 */
import { Mail, Bell } from "lucide-react";

export default function Header({ userAvatar, breadcrumbs }) {
    return (
        <header className="top-header">
            <div className="breadcrumbs">
                {breadcrumbs}
            </div>
            <div className="header-actions">
                <button className="icon-btn">
                    <Mail size={20} />
                    <span className="notification-dot"></span>
                </button>
                <button className="icon-btn">
                    <Bell size={20} />
                </button>
                <img src={userAvatar || "/avatar-placeholder.png"} alt="User" className="user-avatar-sm" />
            </div>
        </header>
    );
}
