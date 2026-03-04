
import {columns} from "../../components/shared/depColumns";
import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashBoardLayout";
import logo from "../../assets/react.svg";
import DataTable from "@/components/ui/DataTable";
import { de } from "zod/v4/locales";
import NewDepModal from "@/components/shared/NewDepModal";

export default function DepartmentsPage() {

const [data, setData] = useState([]);

useEffect(() => {

    const result = [

        {
        id: 1,
        departments: "dep1",
        surveys: 5,
       
    },
       {
        id: 2,
        departments: "dep2",
        surveys: 3,
    }

    ];
    setData(result);

},[] );

    return (

        <DashboardLayout>
            <div className = "flex pt-5 pl-6  text-lg font-semibold">Departments</div>
            <div className = "flex-1 p-6 pt-1 space-y-6">
                <DataTable columns={columns} data={data} toolbarAction = {<NewDepModal />} ></DataTable>
            </div>
        </DashboardLayout>

    )
}