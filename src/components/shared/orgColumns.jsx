
import { Button } from "@/components/ui/button";
import { FaEye } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
export const columns = [
   {
    accessorKey: "logo",
    header: "Logo",
  },
  {
    accessorKey: "organization",
    header: "Organization",
  },

  {
    accessorKey: "manager_name",
    header: "Manager Name",
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
        <div className = " flex gap-1 ">
          <Button size="sm" variant="view"  onClick={() => {navigate(`/departments/${org.id}`);} }>
            <FaEye /> View
            </Button>
           <Button size="sm" variant="edit">
            <CiEdit /> Edit
            </Button>
        </div>
      )

  },

}
];
