import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form";
import { Input } from "../../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { Button } from "../../ui/button";
import { Textarea } from "../../ui/textarea";
import { Checkbox } from "../../ui/checkbox";
import { ScrollArea } from "../../ui/scroll-area";
import { SheetContent, SheetDescription, SheetHeader, SheetTitle } from "../../ui/sheet";
import { useCreateProduct, useUpdateProduct } from "../../../hooks/useProducts";
import { useCategories } from "../../../hooks/useCategories";
import { colorHex } from "../../../api/mappers";
import { getErrorInfo } from "../../../api/client";
import { resolveCategory } from "../../../api/mappers";
import { pushToast } from "../../../lib/useToast";
import type { ApiProduct } from "../../../api/types";

const FALLBACK_CATEGORIES = [
  "T-shirts",
  "Shoes",
  "Accessories",
  "Bags",
  "Dresses",
  "Jackets",
  "Gloves",
];

const COLOR_NAMES = [
  "black",
  "white",
  "grey",
  "brown",
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "purple",
  "pink",
];

const SIZE_OPTIONS = [
  "xs",
  "s",
  "m",
  "l",
  "xl",
  "xxl",
  "34",
  "35",
  "36",
  "37",
  "38",
  "39",
  "40",
  "41",
  "42",
  "43",
  "44",
  "45",
  "46",
  "47",
  "48",
];

const MAX_IMAGES = 5;

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  shortDescription: z.string().min(1, "Short description is required"),
  price: z.coerce.number().min(0.01, "Price must be greater than 0"),
  discount: z.coerce.number().min(0, "Discount cannot be negative").optional(),
  quantity: z.coerce.number().int().min(1, "Quantity must be at least 1"),
  category: z.string().min(1, "Category is required"),
  sizes: z.array(z.string()).min(1, "Select at least one size"),
  colors: z.array(z.string()).min(1, "Select at least one color"),
});

type AddProductFormValues = z.infer<typeof formSchema>;

interface AddProductProps {
  product?: ApiProduct;
  onSuccess?: () => void;
}

export default function AddProduct({ product, onSuccess }: AddProductProps) {
  const isEdit = Boolean(product);
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const { data: apiCategories } = useCategories();
  const [error, setError] = useState<string | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);

  const categoryOptions =
    apiCategories && apiCategories.length > 0
      ? apiCategories.map((c) => c.name)
      : FALLBACK_CATEGORIES;

  const form = useForm<AddProductFormValues>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      name: product?.title ?? "",
      shortDescription: product?.description ?? "",
      price: product?.priceAfterDiscount ?? product?.price ?? 0,
      discount: product?.priceAfterDiscount ? product?.price - product?.priceAfterDiscount : 0,
      quantity: product?.quantity ?? 1,
      category: product ? resolveCategory(product.category) : "",
      sizes: product?.sizes ?? [],
      colors: product?.color ?? [],
    },
  });

  function handleSubmit(values: AddProductFormValues) {
    setError(null);
    const payload = {
      title: values.name,
      description: values.shortDescription,
      quantity: values.quantity,
      price: values.price,
      priceAfterDiscount: values.discount ? Math.max(0, values.price - values.discount) : undefined,
      category: values.category,
      color: values.colors,
      imageCover: coverFile ?? undefined,
      images: galleryFiles.length > 0 ? galleryFiles : undefined,
    };

    const options = {
      onSuccess: () => {
        pushToast(isEdit ? "Product updated." : "Product created.");
        onSuccess?.();
      },
      onError: (err: unknown) => {
        setError(getErrorInfo(err).message);
      },
    };

    if (product?._id ?? product?.id) {
      const id = (product._id ?? product.id) as string;
      updateProduct.mutate({ id, payload }, options as never);
    } else {
      createProduct.mutate(payload, options as never);
    }
  }

  return (
    <SheetContent>
      <ScrollArea className="h-screen">
        <SheetHeader>
          <SheetTitle className="mb-4">{isEdit ? "Edit Product" : "Add Product"}</SheetTitle>
          <SheetDescription asChild>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Product name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="shortDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Short Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Brief description" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" placeholder="0.00" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="discount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Discount (EGP)</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" min={0} placeholder="0.00" {...field} />
                      </FormControl>
                      <FormDescription>Leave at 0 for no discount.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stock Quantity</FormLabel>
                      <FormControl>
                        <Input type="number" min={1} placeholder="1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categoryOptions.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="sizes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sizes</FormLabel>
                      <FormDescription>Select available sizes</FormDescription>
                      <div className="grid grid-cols-4 gap-2">
                        {SIZE_OPTIONS.map((size) => (
                          <FormItem
                            key={size}
                            className="flex flex-row items-center space-x-1 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(size)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, size])
                                    : field.onChange(
                                        field.value?.filter((v) => v !== size)
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">
                              {size}
                            </FormLabel>
                          </FormItem>
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="colors"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Colors</FormLabel>
                      <FormControl>
                        <div className="grid grid-cols-3 gap-4 my-2">
                          {COLOR_NAMES.map((color) => (
                            <div key={color} className="flex items-center gap-2">
                              <Checkbox
                                id={`color-${color}`}
                                checked={field.value?.includes(color)}
                                onCheckedChange={(checked) => {
                                  const currentValues = field.value || [];
                                  if (checked) {
                                    field.onChange([...currentValues, color]);
                                  } else {
                                    field.onChange(
                                      currentValues.filter((v) => v !== color)
                                    );
                                  }
                                }}
                              />
                              <label
                                htmlFor={`color-${color}`}
                                className="flex items-center gap-2 text-xs"
                              >
                                <div
                                  className="w-2 h-2 rounded-full"
                                  style={{ backgroundColor: colorHex(color) }}
                                />
                                {color}
                              </label>
                            </div>
                          ))}
                        </div>
                      </FormControl>
                      <FormDescription>Select the available colors.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-4">
                  <div className="space-y-2">
                    <FormLabel>Cover Image</FormLabel>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setCoverFile(e.target.files?.[0] ?? null)}
                    />
                    <FormDescription>
                      {isEdit && product?.imageCover
                        ? "Leave empty to keep the current cover."
                        : "Main product image."}
                    </FormDescription>
                  </div>

                  <div className="space-y-2">
                    <FormLabel>Gallery Images (up to {MAX_IMAGES})</FormLabel>
                    <Input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) =>
                        setGalleryFiles(
                          Array.from(e.target.files ?? []).slice(0, MAX_IMAGES)
                        )
                      }
                    />
                    <FormDescription>
                      {isEdit && product?.images?.length
                        ? "Leave empty to keep current images."
                        : `Upload up to ${MAX_IMAGES} images.`}
                    </FormDescription>
                  </div>
                </div>

                {error && (
                  <p className="text-sm font-medium text-destructive">{error}</p>
                )}

                <Button
                  type="submit"
                  className="w-full"
                  disabled={createProduct.isPending || updateProduct.isPending}
                >
                  {createProduct.isPending || updateProduct.isPending
                    ? isEdit
                      ? "Saving..."
                      : "Creating..."
                    : isEdit
                    ? "Save Changes"
                    : "Add Product"}
                </Button>
              </form>
            </Form>
          </SheetDescription>
        </SheetHeader>
      </ScrollArea>
    </SheetContent>
  );
}