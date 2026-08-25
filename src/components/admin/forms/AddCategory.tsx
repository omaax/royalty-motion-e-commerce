import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";

const formSchema = z.object({
  name: z.string().min(1, "Category name is required"),
});

type AddCategoryFormValues = z.infer<typeof formSchema>;

interface AddCategoryProps {
  onSubmit?: (values: AddCategoryFormValues) => void;
}

export default function AddCategory({ onSubmit }: AddCategoryProps) {
  const form = useForm<AddCategoryFormValues>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      name: "",
    },
  });

  function handleSubmit(values: AddCategoryFormValues) {
    onSubmit?.(values);
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="mt-6 space-y-6">
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

          <Button type="submit" className="w-full">
            Add Category
          </Button>
      </form>
    </Form>
  );
}
