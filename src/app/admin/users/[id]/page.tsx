import { useParams, Link } from "react-router-dom";
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
import { useAdminUser, useUpdateUser } from "../../../../hooks/useUsers";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../../../components/ui/breadcrumb";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../../../../components/ui/hover-card";
import { Progress } from "../../../../components/ui/progress";
import { Sheet, SheetContent, SheetTrigger } from "../../../../components/ui/sheet";
import { Button } from "../../../../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../../../../components/ui/avatar";
import AppLineChart from "../../../../components/admin/charts/AppLineChart";
import EditUser from "../../../../components/admin/forms/EditUser";
import { resolveImagePath } from "../../../../api/mappers";
import { getErrorInfo } from "../../../../api/client";
import { pushToast } from "../../../../lib/useToast";

const UserDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: user, isLoading } = useAdminUser(id);
  const updateUser = useUpdateUser();

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-muted-foreground">Loading user...</p>
      </div>
    );
  }

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

  const joined = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "N/A";

  const handleUpdate = (values: { name: string; email: string; role: "user" | "admin" }) => {
    if (!id) return;
    updateUser.mutate(
      { id, payload: values },
      {
        onSuccess: () => pushToast("User updated."),
        onError: (error) => pushToast(getErrorInfo(error).message),
      }
    );
  };

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
                <AvatarImage
                  src={
                    user.imgProfile
                      ? resolveImagePath(user.imgProfile, "users")
                      : "/admin/logo.jpg"
                  }
                  alt={user.name}
                />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-lg font-semibold">{user.name}</p>
                <p className="text-sm text-muted-foreground">
                  {(user.isActive ?? user.active ?? true)
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
                    role: user.role ?? "user",
                  }}
                  onSubmit={handleUpdate}
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
                  <span className="font-medium">{user.phone ?? "Not set"}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Role:</span>
                  <span className="font-medium">{user.role ?? "user"}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <CalendarDays className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Joined:</span>
                  <span className="font-medium">{joined}</span>
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