
import {columns} from "../../components/shared/depColumns";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashBoardLayout";
import logo from "../../assets/react.svg";
import DataTable from "@/components/ui/DataTable";
import { de } from "zod/v4/locales";
import NewDepModal from "@/components/shared/NewDepModal";
import api from "@/services/api";
export default function DepartmentsPage() {


const [data, setData] = useState([]);
const {id} = useParams()
const fetchDepartment = () => {

    api.get(`/organizations/${id}/department`)
    .then(result => setData(result.data))
    .catch(error => console.error(error))
    
}


useEffect(() => {

    fetchDepartment();
    

},[] );

    return (

        <DashboardLayout>
            <div className = "flex-1 p-6 pt-1 space-y-6">
                <DataTable columns={columns} data={data} title = "Departments" toolbarAction = {<NewDepModal />} ></DataTable>
            </div>
        </DashboardLayout>

    )
}