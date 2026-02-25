import React, { useState, useEffect } from 'react';
import SideBar from './sidebar';
import Navigation from './navigation';

const MainLayout = ({ children }) => {
    const [isSidebarMini, setIsSidebarMini] = useState(false);
    const [isSidebarShow, setIsSidebarShow] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 1024) {
                document.body.classList.add('sidebar-gone');
                document.body.classList.remove('sidebar-mini', 'sidebar-show');
                setIsSidebarMini(false);
                setIsSidebarShow(false);
            } else {
                document.body.classList.remove('sidebar-gone', 'sidebar-show');
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (isSidebarMini) {
            document.body.classList.add('sidebar-mini');
        } else {
            document.body.classList.remove('sidebar-mini');
        }

        if (isSidebarShow) {
            document.body.classList.add('sidebar-show');
            document.body.classList.remove('sidebar-gone');
        } else if (window.innerWidth <= 1024) {
            document.body.classList.add('sidebar-gone');
            document.body.classList.remove('sidebar-show');
        }
    }, [isSidebarMini, isSidebarShow]);

    const toggleSidebar = () => {
        if (window.innerWidth <= 1024) {
            setIsSidebarShow(!isSidebarShow);
        } else {
            setIsSidebarMini(!isSidebarMini);
        }
    };

    return (
        <div id="app">
            <div className="main-wrapper">
                <SideBar isSidebarMini={isSidebarMini} />
                <Navigation toggleSidebar={toggleSidebar} />
                <div>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default MainLayout;
