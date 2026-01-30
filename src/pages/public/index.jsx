
import {columns} from "../../components/shared/orgColumns";
import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashBoardLayout";
import logo from "../../assets/react.svg";
import DataTable from "@/components/ui/DataTable";
import NewOrgModal from "@/components/shared/NewOrgModal";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"


export default function IndexPage() {

const [data, setData] = useState([]);

useEffect(() => {

    const result = [

        {
            id: 1,
          
            organization: "Org1",

            manager_name: "Marios",
            phone: 99027659,
    },
       {
        id: 2,
       
        organization: "Org2",
       
        manager_name: "Andreas",
        phone: 99178002,
    }

    ];
    setData(result);

},[] );
    return (

        <DashboardLayout>
            <div className = "flex pt-5 pl-6  text-lg font-semibold">Organization</div>
            <div className = "flex-1 p-6 pt-1 space-y-6">   
                <DataTable columns={columns} data={data} toolbarAction = {<NewOrgModal />}> </DataTable>
            </div>
        </DashboardLayout>

    )
}