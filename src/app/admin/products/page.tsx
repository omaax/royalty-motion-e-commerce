import { adminProducts } from "../../../data/adminData";
import { columns } from "./columns";
import { DataTable } from "./data-table";

const ProductsPage = () => {
  return (
    <div className="">
      <div className="mb-8 px-4 py-2 bg-secondary rounded-md">
        <h1 className="font-semibold">All Products</h1>
      </div>
      <DataTable columns={columns} data={adminProducts} />
    </div>
  );
};

export default ProductsPage;
