import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  BadgeCheck,
  Shield,
  Candy,
  Citrus,
  Mail,
  Phone,
  MapPin,
  CalendarDays,
  Pencil,
} from "lucide-react";
import { adminUsers } from "../../../../data/adminData";
import { type User } from "../columns";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../../../components/ui/breadcrumb";
import { Badge } from "../../../../components/ui/badge";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../../../../components/ui/hover-card";
import { Progress } from "../../../../components/ui/progress";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "../../../../components/ui/sheet";
import { Button } from "../../../../components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../components/ui/avatar";
import AppLineChart from "../../../../components/admin/charts/AppLineChart";
import EditUser from "../../../../components/admin/forms/EditUser";

const UserDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const user = adminUsers.find((u) => u.id === id);

  if (!user) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-muted-foreground">User not found.</p>
      </div>
    );
  }

  const badges = [
    {
      icon: BadgeCheck,
      label: "Verified",
      color: "text-blue-500",
      description: "This user has been verified.",
    },
    {
      icon: Shield,
      label: "Trusted",
      color: "text-green-500",
      description: "Trusted customer with a strong purchase history.",
    },
    {
      icon: Candy,
      label: "Gold Member",
      color: "text-yellow-500",
      description: "Gold tier loyalty member.",
    },
    {
      icon: Citrus,
      label: "Referrer",
      color: "text-orange-500",
      description: "Has referred other customers.",
    },
  ];

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="space-y-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/admin">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/admin/users">Users</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{user.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-6 lg:col-span-1">
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h3 className="mb-4 text-sm font-semibold text-muted-foreground">
              User Badges
            </h3>
            <div className="flex flex-wrap gap-3">
              {badges.map((badge) => (
                <HoverCard key={badge.label}>
                  <HoverCardTrigger asChild>
                    <button className="rounded-md border p-2 transition-colors hover:bg-muted">
                      <badge.icon className={`h-5 w-5 ${badge.color}`} />
                    </button>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-64">
                    <div className="space-y-1">
                      <h4 className="text-sm font-semibold">{badge.label}</h4>
                      <p className="text-sm text-muted-foreground">
                        {badge.description}
                      </p>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              ))}
            </div>
          </div>

          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h3 className="mb-4 text-sm font-semibold text-muted-foreground">
              User Card
            </h3>
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-lg font-semibold">{user.name}</p>
                <p className="text-sm text-muted-foreground">
                  {user.status === "active"
                    ? "Active customer"
                    : "Inactive customer"}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-muted-foreground">
                User Information
              </h3>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                </SheetTrigger>
                <EditUser
                  defaultValues={{
                    name: user.name,
                    email: user.email,
                    phone: "+1 (555) 123-4567",
                    address: "123 Main St",
                    city: "New York",
                  }}
                />
              </Sheet>
            </div>

            <div className="space-y-4">
              <div>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Completion</span>
                  <span className="font-medium">85%</span>
                </div>
                <Progress value={85} />
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <BadgeCheck className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Name:</span>
                  <span className="font-medium">{user.name}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Email:</span>
                  <span className="font-medium">{user.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Phone:</span>
                  <span className="font-medium">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Address:</span>
                  <span className="font-medium">123 Main St</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">City:</span>
                  <span className="font-medium">New York</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <CalendarDays className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Joined:</span>
                  <span className="font-medium">Jan 15, 2024</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <AppLineChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailPage;
