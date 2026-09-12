import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { ScrollArea } from "../../ui/scroll-area";
import { SheetContent, SheetDescription, SheetHeader, SheetTitle } from "../../ui/sheet";
import { useCreateSubCategory, useUpdateSubCategory } from "../../../hooks/useSubCategories";
import { getErrorInfo } from "../../../api/client";
import { pushToast } from "../../../lib/useToast";
import type { ApiSubCategory } from "../../../api/types";

const formSchema = z.object({
  name: z.string().min(1, "Sub-category name is required"),
});

type AddSubCategoryFormValues = z.infer<typeof formSchema>;

interface AddSubCategoryProps {
  categoryId: string;
  subCategory?: ApiSubCategory;
  onSuccess?: () => void;
}

export default function AddSubCategory({
  categoryId,
  subCategory,
  onSuccess,
}: AddSubCategoryProps) {
  const isEdit = Boolean(subCategory);
  const createSubCategory = useCreateSubCategory();
  const updateSubCategory = useUpdateSubCategory();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<AddSubCategoryFormValues>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      name: subCategory?.name ?? "",
    },
  });

  function handleSubmit(values: AddSubCategoryFormValues) {
    setError(null);

    const options = {
      onSuccess: () => {
        pushToast(isEdit ? "Sub-category updated." : "Sub-category created.");
        onSuccess?.();
      },
      onError: (err: unknown) => {
        setError(getErrorInfo(err).message);
      },
    };

    if (subCategory?._id) {
      updateSubCategory.mutate(
        { id: subCategory._id, name: values.name },
        options as never
      );
    } else {
      createSubCategory.mutate(
        { name: values.name, category: categoryId },
        options as never
      );
    }
  }

  return (
    <SheetContent>
      <ScrollArea className="h-screen">
        <SheetHeader>
          <SheetTitle className="mb-4">
            {isEdit ? "Edit Sub-category" : "Add Sub-category"}
          </SheetTitle>
          <SheetDescription asChild>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sub-category Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Cotton T-shirts" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {error && (
                  <p className="text-sm font-medium text-destructive">{error}</p>
                )}

                <Button
                  type="submit"
                  className="w-full"
                  disabled={createSubCategory.isPending || updateSubCategory.isPending}
                >
                  {createSubCategory.isPending || updateSubCategory.isPending
                    ? isEdit
                      ? "Saving..."
                      : "Creating..."
                    : isEdit
                    ? "Save Changes"
                    : "Add Sub-category"}
                </Button>
              </form>
            </Form>
          </SheetDescription>
        </SheetHeader>
      </ScrollArea>
    </SheetContent>
  );
}