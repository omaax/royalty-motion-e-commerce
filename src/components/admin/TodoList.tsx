import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "../ui/button";
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
    <div className="flex flex-col h-full">
      <h1 className="text-lg font-medium mb-6">Todo List</h1>
      <Popover>
        <PopoverTrigger asChild>
          <Button className="w-full">
            <CalendarIcon />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-auto">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(day) => setDate(day)}
          />
        </PopoverContent>
      </Popover>
      <ScrollArea className="flex-1 min-h-0 mt-4 overflow-y-auto">
        <div className="flex flex-col gap-4 h-full">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className="flex flex-1 items-center gap-4 rounded-lg border p-4"
            >
              <Checkbox
                checked={todo.completed}
                onCheckedChange={() => toggleTodo(todo.id)}
              />
              <span
                className={cn(
                  "text-sm text-muted-foreground",
                  todo.completed && "line-through"
                )}
              >
                {todo.label}
              </span>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
