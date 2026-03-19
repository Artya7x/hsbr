
import { Button } from "@/components/ui/button";
import { FaEye } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
export const columns = [
  
  {
    accessorKey: "org_name",
    header: "Organization",
  },

    {
    accessorKey: "phone",
    header: "Phone",
  },

    //Generate action buttons for each row
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const org = row.original ; 
      const navigate = useNavigate();
      return (
        <div className="flex gap-4">
          <Button size="sm" variant="classic" onClick={() => { navigate(`/departments/${org.org_id}`); }}>
            <FaEye /> View
          </Button>
          <Button size="sm" variant="outline">
            <CiEdit className="text-current" /> Edit
          </Button>
        </div>
      )

  },

}
];
