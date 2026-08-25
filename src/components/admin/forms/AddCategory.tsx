import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { ScrollArea } from "../../ui/scroll-area";
import { SheetContent, SheetDescription, SheetHeader, SheetTitle } from "../../ui/sheet";

const formSchema = z.object({
  name: z.string().min(1, "Category name is required"),
});

type AddCategoryFormValues = z.infer<typeof formSchema>;

export default function AddCategory() {
  const form = useForm<AddCategoryFormValues>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      name: "",
    },
  });

  function handleSubmit(values: AddCategoryFormValues) {
    console.log(values);
    form.reset();
  }

  return (
    <SheetContent>
      <ScrollArea className="h-screen">
        <SheetHeader>
          <SheetTitle className="mb-4">Add Category</SheetTitle>
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

                <Button type="submit" className="w-full">
                  Add Category
                </Button>
              </form>
            </Form>
          </SheetDescription>
        </SheetHeader>
      </ScrollArea>
    </SheetContent>
  );
}
