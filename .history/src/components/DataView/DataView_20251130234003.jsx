import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUsers } from "..";
import DataTable from "./DataTable";
import DataCard from "./DataCard";

export default function DataView() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.users.loading);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    dispatch(loadUsers({ page: 1, limit: 10 }));
  }, [dispatch]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="data-view-container">
      {loading && <p>Loading...</p>}
      {!loading && (isMobile ? <DataCard /> : <DataTable />)}
    </div>
  );
}
