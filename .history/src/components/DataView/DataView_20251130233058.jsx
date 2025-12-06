// src/components/DataView/DataView.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUsers } from "../../";
import DataTable from "./DataTable";
import DataCard from "./DataCard";
import LoaderSpinner from "../Loader/LoaderSpinner";

export default function DataView() {
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.users);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Lấy dữ liệu lần đầu
  useEffect(() => {
    dispatch(loadUsers({ page: 1, limit: 10 }));
  }, [dispatch]);

  // Lắng nghe resize để chuyển Table/Card
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (loading) return <LoaderSpinner />;

  return isMobile ? <DataCard /> : <DataTable />;
}
