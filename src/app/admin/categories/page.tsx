import { useMemo, useState } from "react";
import {
  useCategories,
  useDeleteCategory,
} from "../../../hooks/useCategories";
import {
  useDeleteSubCategory,
  useSubCategories,
} from "../../../hooks/useSubCategories";
import { createCategoryColumns, type Category } from "./columns";
import {
  createSubCategoryColumns,
  type SubCategory,
} from "./subColumns";
import { DataTable } from "../../../components/admin/DataTable";
import { Sheet } from "../../../components/ui/sheet";
import { Button } from "../../../components/ui/button";
import { ChevronLeft, Plus } from "lucide-react";
import AddCategory from "../../../components/admin/forms/AddCategory";
import AddSubCategory from "../../../components/admin/forms/AddSubCategory";
import { resolveImagePath } from "../../../api/mappers";
import { getErrorInfo } from "../../../api/client";
import { pushToast } from "../../../lib/useToast";
import type { ApiCategory, ApiSubCategory } from "../../../api/types";

const CategoriesPage = () => {
  const { data: categories = [], isLoading } = useCategories();
  const deleteCategory = useDeleteCategory();
  const [selectedCategory, setSelectedCategory] = useState<ApiCategory | null>(null);
  const [categorySheetOpen, setCategorySheetOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<ApiCategory | null>(null);

  const categoryId = selectedCategory?._id;
  const { data: subCategories = [], isLoading: isLoadingSubs } =
    useSubCategories(categoryId);
  const deleteSubCategory = useDeleteSubCategory();
  const [subSheetOpen, setSubSheetOpen] = useState(false);
  const [editingSubCategory, setEditingSubCategory] = useState<ApiSubCategory | null>(null);

  const categoryRows: Category[] = useMemo(
    () =>
      categories.map((category) => ({
        id: category._id,
        image: resolveImagePath(category.image, "Categories"),
        name: category.name,
      })),
    [categories]
  );

  const subRows: SubCategory[] = useMemo(
    () =>
      subCategories.map((sub) => ({
        id: sub._id,
        name: sub.name,
      })),
    [subCategories]
  );

  const handleDeleteCategory = (id: string) => {
    deleteCategory.mutate(id, {
      onSuccess: () => pushToast("Category deleted."),
      onError: (error) => pushToast(getErrorInfo(error).message),
    });
  };

  const openEditCategory = (category: Category) => {
    setEditingCategory(
      categories.find((c) => c._id === category.id) ?? null
    );
    setCategorySheetOpen(true);
  };

  const handleDeleteSubCategory = (id: string) => {
    deleteSubCategory.mutate(id, {
      onSuccess: () => pushToast("Sub-category deleted."),
      onError: (error) => pushToast(getErrorInfo(error).message),
    });
  };

  const openEditSubCategory = (sub: SubCategory) => {
    setEditingSubCategory(
      subCategories.find((s) => s._id === sub.id) ?? null
    );
    setSubSheetOpen(true);
  };

  const categoryColumns = useMemo(
    () =>
      createCategoryColumns({
        onEdit: openEditCategory,
        onDelete: handleDeleteCategory,
      }),
    [categories, deleteCategory]
  );

  const subColumns = useMemo(
    () =>
      createSubCategoryColumns({
        onEdit: openEditSubCategory,
        onDelete: handleDeleteSubCategory,
      }),
    [subCategories, deleteSubCategory]
  );

  if (selectedCategory) {
    return (
      <div className="">
        <div className="mb-8 px-4 py-2 bg-secondary rounded-md flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="px-2"
              onClick={() => setSelectedCategory(null)}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h1 className="font-semibold">
              {selectedCategory.name} / Sub-categories
            </h1>
          </div>
          <Sheet open={subSheetOpen} onOpenChange={setSubSheetOpen}>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setEditingSubCategory(null);
                setSubSheetOpen(true);
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Sub-category
            </Button>
            {subSheetOpen && (
              <AddSubCategory
                key={editingSubCategory?._id ?? "new"}
                categoryId={selectedCategory._id}
                subCategory={editingSubCategory ?? undefined}
                onSuccess={() => setSubSheetOpen(false)}
              />
            )}
          </Sheet>
        </div>
        {isLoadingSubs ? (
          <p className="text-muted-foreground text-sm">Loading sub-categories...</p>
        ) : (
          <DataTable columns={subColumns} data={subRows} />
        )}
      </div>
    );
  }

  return (
    <div className="">
      <div className="mb-8 px-4 py-2 bg-secondary rounded-md flex items-center justify-between">
        <h1 className="font-semibold">All Categories</h1>
      </div>
      <Sheet open={categorySheetOpen} onOpenChange={setCategorySheetOpen}>
        {categorySheetOpen && (
          <AddCategory
            key={editingCategory?._id ?? "new"}
            category={editingCategory ?? undefined}
            onSuccess={() => setCategorySheetOpen(false)}
          />
        )}
      </Sheet>
      {isLoading ? (
        <p className="text-muted-foreground text-sm">Loading categories...</p>
      ) : (
        <DataTable
          columns={categoryColumns}
          data={categoryRows}
          onRowClick={(row) =>
            setSelectedCategory(
              categories.find((c) => c._id === row.id) ?? null
            )
          }
        />
      )}
    </div>
  );
};

export default CategoriesPage;