import { Dashboard } from "../views/dashboard/dashboard";
import { Ingresos } from "../views/ingresos/ingresos";

export const CommonRoutes = [
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/ingresos",
    element: <Ingresos />,
  },
];
