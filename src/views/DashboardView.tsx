import { useEffect, useState } from "react";
import { analytics } from "../firebase";
import { logEvent } from "firebase/analytics";

export default function DashboardView() {
    const [isClicked, setIsClicked] = useState(false);

    useEffect(() => {
        logEvent(analytics, "dashboard_view", {
          page_title: "Dashboard",
          timestamp: new Date().toISOString(),
        });
    }, []);

    const handleDashboardAction= async () => {
        logEvent(analytics, "button_click", {
            button_name: "Dashboard action",
            timestamp: new Date().toISOString(),
        });
        setIsClicked(prevIsCliked => !prevIsCliked)
    };
    
    return (
        <>
            <h1 className="text-center text-5xl mt-80">Dashboard View</h1>
            {isClicked&&<h4 className="text-center text-5xl mt-10">button clicked</h4>}
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded-2xl hover:bg-blue-600 mt-10 mx-auto block"
                onClick={handleDashboardAction}
            >
               Some Action
            </button>
        </>
    )
}