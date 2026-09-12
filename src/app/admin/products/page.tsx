import { useMemo, useState } from "react";
import { useAdminProducts, useDeleteProduct } from "../../../hooks/useProducts";
import {
  createProductColumns,
  type Product,
} from "./columns";
import { DataTable } from "../../../components/admin/DataTable";
import { Sheet } from "../../../components/ui/sheet";
import AddProduct from "../../../components/admin/forms/AddProduct";
import { resolveImagePath } from "../../../api/mappers";
import { getErrorInfo } from "../../../api/client";
import { pushToast } from "../../../lib/useToast";
import type { ApiProduct } from "../../../api/types";

const ProductsPage = () => {
  const { data: products = [], isLoading } = useAdminProducts();
  const deleteProduct = useDeleteProduct();
  const [editing, setEditing] = useState<ApiProduct | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const rows: Product[] = useMemo(
    () =>
      products.map((product) => {
        const images: Record<string, string> = {};
        product.color?.forEach((color, index) => {
          images[color] = resolveImagePath(
            (product.images ? [product.images[index]] : [])[0] ??
              product.imageCover,
            "products"
          );
        });
        images["imageCover"] = resolveImagePath(product.imageCover, "products");
        images[""] = resolveImagePath(product.imageCover, "products");
        return {
          id: (product._id ?? product.id) as string,
          price: product.priceAfterDiscount ?? product.price,
          name: product.title,
          shortDescription: product.description ?? "",
          description: product.description ?? "",
          sizes: product.sizes ?? [],
          colors: product.color ?? [],
          images,
        };
      }),
    [products]
  );

  const handleDelete = (id: string) => {
    deleteProduct.mutate(id, {
      onSuccess: () => pushToast("Product deleted."),
      onError: (error) => pushToast(getErrorInfo(error).message),
    });
  };

  const openEdit = (product: Product) => {
    setEditing(
      products.find(
        (p) => (p._id ?? p.id) === String(product.id)
      ) ?? null
    );
    setSheetOpen(true);
  };

  const columns = useMemo(
    () =>
      createProductColumns({
        onEdit: openEdit,
        onDelete: handleDelete,
      }),
    [products, deleteProduct]
  );

  return (
    <div className="">
      <div className="mb-8 px-4 py-2 bg-secondary rounded-md flex items-center justify-between">
        <h1 className="font-semibold">All Products</h1>
      </div>
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        {sheetOpen && (
          <AddProduct
            key={editing?._id ?? editing?.id ?? "new"}
            product={editing ?? undefined}
            onSuccess={() => setSheetOpen(false)}
          />
        )}
      </Sheet>
      {isLoading ? (
        <p className="text-muted-foreground text-sm">Loading products...</p>
      ) : (
        <DataTable columns={columns} data={rows} />
      )}
    </div>
  );
};

export default ProductsPage;