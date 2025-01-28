import { useEffect } from "react";
import { analytics } from "../firebase";
import { logEvent } from "firebase/analytics";

export default function DashboardView() {

    useEffect(() => {
        logEvent(analytics, "dashboard_view", {
          page_title: "Dashboard",
          timestamp: new Date().toISOString(),
        });
    }, []);
    
    return (
        <>
            <h1 className="text-center text-5xl mt-80">Dashboard View</h1>
        </>
    )
}