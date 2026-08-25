import { adminUsers } from "../../../data/adminData";
import { columns } from "./columns";
import { DataTable } from "./data-table";

const UsersPage = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold tracking-tight">All Payments</h1>
      <DataTable columns={columns} data={adminUsers} />
    </div>
  );
};

export default UsersPage;
