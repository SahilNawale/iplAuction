
import Dashboard from "views/Dashboard.jsx";
import allTeams from "views/allTeams.jsx";
import Sponsors from "views/Sponsors.js";
import Info from "views/Info.js";
import Search from "views/Search";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/table",
    name: "All Teams",
    icon: "nc-icon nc-notes",
    component: allTeams,
    layout: "/admin",
  },
  {
    path: "/sponsors",
    name: "Sponsors",
    icon: "nc-icon nc-bank",
    component: Sponsors,
    layout: "/admin",
  },
  {
    path: "/info",
    name: "Info",
    icon: "nc-icon nc-bell-55",
    component: Info,
    layout: "/admin",
  },
  {
    path: "/search",
    name: "Search",
    icon: "nc-icon nc-zoom-split",
    component: Search,
    layout: "/admin",
  },
];

export default dashboardRoutes;
