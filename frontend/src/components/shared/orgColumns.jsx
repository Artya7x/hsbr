
import { Button } from "@/components/ui/button";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import NewOrgModal from "@/components/shared/NewOrgModal";

export const columns = (onSuccess) => [

  {
    accessorKey: "logo",
    header: "Logo",
    cell: ({ row }) => {
      const logo = row.original.logo;
      if (!logo) return <span className="text-gray-300 text-xs">No logo</span>;
      return (
        <img
          src={`${import.meta.env.VITE_API_URL}/${logo}`}
          alt="logo"
          className="h-8 w-8 rounded-full object-cover"
        />
      );
    },
  },

  {
    accessorKey: "org_name",
    header: "Organization",
  },

  {
    accessorKey: "phone",
    header: "Phone",
  },

  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const org = row.original;
      const navigate = useNavigate();
      return (
        <div className="flex gap-4">
          <Button size="sm" variant="classic" onClick={() => { navigate(`/departments/${org.org_id}`); }}>
            <FaEye /> View
          </Button>
          <NewOrgModal org={org} onSuccess={onSuccess} />
        </div>
      );
    },
  },
];
