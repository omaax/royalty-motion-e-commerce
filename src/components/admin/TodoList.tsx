import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";
import { ScrollArea } from "../ui/scroll-area";
import { Calendar } from "../ui/calendar";
import { cn } from "../../lib/utils";

interface Todo {
  id: string;
  label: string;
  completed: boolean;
  dueDate: Date;
}

const initialTodos: Todo[] = [
  { id: "t1", label: "Review ANCIENT Hoodie inventory", completed: false, dueDate: new Date() },
  { id: "t2", label: "Update product photos for Masquerade Tee", completed: true, dueDate: new Date() },
  { id: "t3", label: "Process pending refund for Order #421", completed: false, dueDate: new Date() },
  { id: "t4", label: "Respond to vendor inquiry about restock", completed: false, dueDate: new Date() },
  { id: "t5", label: "Schedule Instagram post for Sinner Pullover", completed: true, dueDate: new Date() },
  { id: "t6", label: "Audit Q3 sales report", completed: false, dueDate: new Date() },
  { id: "t7", label: "Confirm shipping rates with carrier", completed: false, dueDate: new Date() },
  { id: "t8", label: "Add size guide for Hidden in Plain Sight Tee", completed: true, dueDate: new Date() },
];

export function TodoList() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <Card className="col-span-1 lg:col-span-4">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Todos</CardTitle>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-[200px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(day) => setDate(day)}
            />
          </PopoverContent>
        </Popover>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[350px] pr-4">
          <div className="space-y-3">
            {todos.map((todo) => (
              <div
                key={todo.id}
                className="flex items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-muted/50"
              >
                <Checkbox
                  checked={todo.completed}
                  onCheckedChange={() => toggleTodo(todo.id)}
                />
                <span
                  className={cn(
                    "text-sm",
                    todo.completed && "text-muted-foreground line-through"
                  )}
                >
                  {todo.label}
                </span>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
