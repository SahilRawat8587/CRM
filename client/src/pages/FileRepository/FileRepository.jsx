import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import { columns } from "./components/columns";
import { DataTable } from "./components/DataTable";

async function getData() {
  return [
    { id: "001", name: "Automation", date: "2024-03-01", type: "PDF", size: "2MB" },
    { id: "002", name: "Administraction", date: "2024-03-02", type: "DOCX", size: "1.5MB" },
    { id: "003", name: "Admin", date: "2024-03-01", type: "PDF", size: "2MB" },
    { id: "004", name: "Administraction A", date: "2024-03-02", type: "DOCX", size: "1.5MB" },
    { id: "005", name: "AutomationNimi", date: "2024-03-01", type: "PDF", size: "2MB" },
    { id: "006", name: "Nimi", date: "2024-03-02", type: "DOCX", size: "1.5MB" },
    { id: "007", name: "Marketing EXL", date: "2024-03-01", type: "PDF", size: "2MB" },
    { id: "008", name: "Budget MarketingEXL", date: "2024-03-02", type: "DOCX", size: "1.5MB" },
    { id: "009", name: "Budget Nimi", date: "2024-03-01", type: "PDF", size: "2MB" },
    { id: "010", name: "Administraction B", date: "2024-03-02", type: "DOCX", size: "1.5MB" },
    { id: "011", name: "AutomationMarketingexl", date: "2024-03-01", type: "PDF", size: "2MB" },
    { id: "012", name: "Nimi Admin", date: "2024-03-02", type: "DOCX", size: "1.5MB" },
    { id: "013", name: "Marketing EXL Admin", date: "2024-03-01", type: "PDF", size: "2MB" },
    { id: "014", name: "Budget MarketingEXL 2024", date: "2024-03-02", type: "DOCX", size: "1.5MB" },
    { id: "015", name: "Budget Nimi", date: "2024-03-01", type: "PDF", size: "2MB" },
  ];
}

const FileRepository = () => {
    const { user } = useSelector((store) => store.auth);
    const dispatch = useDispatch();

    const [data, setData] = useState([]);

    useEffect(() => {
      getData().then(setData);
    }, []);

  return (
    <div className='min-h-screen bg-[#F4EFCA] flex items-center justify-center container mx-auto py-10'>
            <DataTable columns={columns} data={data} />

    </div>
  )
}

export default FileRepository
