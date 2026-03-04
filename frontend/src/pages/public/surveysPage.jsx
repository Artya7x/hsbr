
import {columns} from "../../components/shared/surveyColumns";
import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashBoardLayout";
import logo from "../../assets/react.svg";
import DataTable from "@/components/ui/DataTable";
import NewOrgModal from "@/components/shared/NewOrgModal";

export default function Surveys() {

const [data, setData] = useState([]);

useEffect(() => {

    const result = [

    {
        id: 1,
        date: "2023-10-01",
        status: "Completed",  
    },
    
    {
        id: 2,
        date: "2023-11-15",
        status: "Pending",
    }

    ];
    setData(result);

},[] );
    return (

        <DashboardLayout>
            
            <div className = "flex pt-5 pl-6  text-lg font-semibold">Surveys</div>
            <div className = "flex-1 p-6 pt-1 space-y-6">    
                <DataTable columns={columns} data={data}  > </DataTable>
            </div>
        </DashboardLayout>

    )
}