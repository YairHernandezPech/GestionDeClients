import { useState } from "react";


const AppUsers = () => {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const openSidebar = () => {
        setSidebarOpen(true);
    }

    const closeSidebar = () => {
        setSidebarOpen(false);
    }
    return (
        <div className="container">
            <h1>Welcome Superadmin</h1>
        </div>
    )
}

export default AppUsers;