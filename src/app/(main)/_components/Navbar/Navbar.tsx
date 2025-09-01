import React from "react";
import Logo from "../Logo/Logo";
import NavbarItem from "./_components/NavbarItem";
import VibeCoinDisplay from "./_components/VibeCoinDisplay";
import ProfileDropdown from "./_components/ProfileDropdown";
import MobileMenu from "./_components/MobileMenu";

const Navbar = () => {
  const userCoins = 1247;
  const userName = "John Doe";
  const userEmail = "john.doe@soulara.com";
  const userAvatar = "";
  const notificationCount = 3;
  const chatCount = 5;

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Mobile Layout */}
          <div className="md:hidden flex items-center justify-between w-full">
            {/* Mobile Hamburger Menu */}
            <MobileMenu 
              userCoins={userCoins}
              notificationCount={notificationCount}
              chatCount={chatCount}
            />
            
            {/* Mobile Logo - Centered */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <Logo />
            </div>
            
            {/* Mobile Profile - Right */}
            <ProfileDropdown 
              name={userName} 
              email={userEmail}
              src={userAvatar} 
              isOnline={true} 
            />
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:flex items-center justify-between w-full">
            {/* Desktop Logo - Left */}
            <div className="flex items-center">
              <Logo />
            </div>

            {/* Desktop Right side items */}
            <div className="flex items-center space-x-4">
              <VibeCoinDisplay coins={userCoins} />

              <NavbarItem
                icon={
                  <svg
                    className="w-5 h-5 text-foreground"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                }
                label="Profile"
              />

              <NavbarItem
                icon={
                  <svg
                    className="w-5 h-5 text-foreground"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 17h5l-5 5-5-5h5z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 17V3a2 2 0 00-2-2H7a2 2 0 00-2 2v14l5-5 5 5z"
                    />
                  </svg>
                }
                label="Notifications"
                badge={notificationCount > 0 ? notificationCount : undefined}
              />

              <NavbarItem
                icon={
                  <svg
                    className="w-5 h-5 text-foreground"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                }
                label="Chats"
                badge={chatCount > 0 ? chatCount : undefined}
              />

              <ProfileDropdown 
                name={userName} 
                email={userEmail}
                src={userAvatar} 
                isOnline={true} 
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
