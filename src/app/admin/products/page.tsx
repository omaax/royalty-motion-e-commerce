import { adminProducts } from "../../../data/adminData";
import { columns } from "./columns";
import { DataTable } from "./data-table";

const ProductsPage = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">All Products</h1>
      </div>
      <DataTable columns={columns} data={adminProducts} />
    </div>
  );
};

export default ProductsPage;
