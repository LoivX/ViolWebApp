import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <main
      style={{
        padding: "24px",
      }}
    >
      <Outlet />
    </main>
  );
}