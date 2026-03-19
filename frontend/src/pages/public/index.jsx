
import {columns} from "../../components/shared/orgColumns";
import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashBoardLayout";

import DataTable from "@/components/ui/DataTable";
import NewOrgModal from "@/components/shared/NewOrgModal";

import api from "@/services/api"

export default function IndexPage() {

const [data, setData] = useState([]);

const fetchOrganizations = () => {
    api.get("/organizations/")
    .then(result => setData(result.data))
    .catch(error => console.error(error));
};

useEffect(() => {
    fetchOrganizations();
}, []);

    return (

        <DashboardLayout>
            <div className="flex-1 p-6 space-y-6">
                <DataTable columns={columns} data={data} title="Organizations" toolbarAction={<NewOrgModal onSuccess={fetchOrganizations} />} />
            </div>
        </DashboardLayout>

    )
}