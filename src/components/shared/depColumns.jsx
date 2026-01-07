
import { Button } from "@/components/ui/button";
import { FaEye } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
export const columns = [

  {
    accessorKey: "departments",
    header: "Department",
  },
  {
    accessorKey: "surveys",
    header: "Surveys",
  },

  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const org = row.original ; 
      const navigate = useNavigate();
      return (
        <div className = " flex gap-1 ">
            <Button size="sm" variant="view"  onClick={() => {navigate(`/Surveys/${org.id}`);} }>
                <FaEye /> View
            </Button>
          
        </div>
      )

  },

}
];
