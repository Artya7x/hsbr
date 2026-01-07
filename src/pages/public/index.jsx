
import {columns} from "../../components/shared/orgColumns";
import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashBoardLayout";
import logo from "../../assets/react.svg";
import DataTable from "@/components/ui/DataTable";
import NewOrgModal from "@/components/shared/NewOrgModal";

export default function IndexPage() {

const [data, setData] = useState([]);

useEffect(() => {

    const result = [

        {
            id: 1,
            logo: logo,
            organization: "Orginization",

            manager_name: "Panagiotis",
            phone: 99178002,
    },
       {
        id: 2,
        logo: logo,
        organization: "sdf",
       
        manager_name: "Panagiotis",
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