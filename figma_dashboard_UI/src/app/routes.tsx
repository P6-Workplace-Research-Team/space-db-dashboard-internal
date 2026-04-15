import { createBrowserRouter } from "react-router";
import DashboardLayout from "./components/DashboardLayout";
import Overview from "./components/Overview";
import OfficeGuide from "./components/OfficeGuide";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: DashboardLayout,
    children: [
      { index: true, Component: Overview },
      { path: "office-guide", Component: OfficeGuide },
    ],
  },
]);
