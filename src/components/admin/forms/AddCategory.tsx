import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { ScrollArea } from "../../ui/scroll-area";
import { SheetContent, SheetDescription, SheetHeader, SheetTitle } from "../../ui/sheet";
import { useCreateCategory, useUpdateCategory } from "../../../hooks/useCategories";
import { getErrorInfo } from "../../../api/client";
import { pushToast } from "../../../lib/useToast";
import type { ApiCategory } from "../../../api/types";

const formSchema = z.object({
  name: z.string().min(1, "Category name is required"),
});

type AddCategoryFormValues = z.infer<typeof formSchema>;

interface AddCategoryProps {
  category?: ApiCategory;
  onSuccess?: () => void;
}

export default function AddCategory({ category, onSuccess }: AddCategoryProps) {
  const isEdit = Boolean(category);
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<AddCategoryFormValues>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      name: category?.name ?? "",
    },
  });

  function handleSubmit(values: AddCategoryFormValues) {
    setError(null);

    const options = {
      onSuccess: () => {
        pushToast(isEdit ? "Category updated." : "Category created.");
        onSuccess?.();
      },
      onError: (err: unknown) => {
        setError(getErrorInfo(err).message);
      },
    };

    if (category?._id) {
      updateCategory.mutate({ id: category._id, name: values.name }, options as never);
    } else {
      createCategory.mutate({ name: values.name }, options as never);
    }
  }

  return (
    <SheetContent>
      <ScrollArea className="h-screen">
        <SheetHeader>
          <SheetTitle className="mb-4">{isEdit ? "Edit Category" : "Add Category"}</SheetTitle>
          <SheetDescription asChild>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. T-shirts" {...field} />
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
                  disabled={createCategory.isPending || updateCategory.isPending}
                >
                  {createCategory.isPending || updateCategory.isPending
                    ? isEdit
                      ? "Saving..."
                      : "Creating..."
                    : isEdit
                    ? "Save Changes"
                    : "Add Category"}
                </Button>
              </form>
            </Form>
          </SheetDescription>
        </SheetHeader>
      </ScrollArea>
    </SheetContent>
  );
}