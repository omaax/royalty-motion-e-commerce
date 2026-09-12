import { useMemo } from "react";
import { useAdminUsers, useDeleteUser } from "../../../hooks/useUsers";
import { createUserColumns, type User } from "./columns";
import { DataTable } from "../../../components/admin/DataTable";
import { resolveImagePath } from "../../../api/mappers";
import { getErrorInfo } from "../../../api/client";
import { pushToast } from "../../../lib/useToast";

const UsersPage = () => {
  const { data: users = [], isLoading } = useAdminUsers();
  const deleteUser = useDeleteUser();

  const rows: User[] = useMemo(
    () =>
      users.map((user) => ({
        id: user._id,
        avatar: user.imgProfile
          ? resolveImagePath(user.imgProfile, "users")
          : "/admin/logo.jpg",
        name: user.name,
        email: user.email,
        status:
          (user.isActive ?? user.active ?? true) ? "active" : "inactive",
      })),
    [users]
  );

  const handleDelete = (id: string) => {
    deleteUser.mutate(id, {
      onSuccess: () => pushToast("User deleted."),
      onError: (error) => pushToast(getErrorInfo(error).message),
    });
  };

  const columns = useMemo(
    () => createUserColumns(handleDelete),
    [deleteUser]
  );

  return (
    <div className="">
      <div className="mb-8 px-4 py-2 bg-secondary rounded-md flex items-center justify-between">
        <h1 className="font-semibold">All Users</h1>
      </div>
      {isLoading ? (
        <p className="text-muted-foreground text-sm">Loading users...</p>
      ) : (
        <DataTable columns={columns} data={rows} />
      )}
    </div>
  );
};

export default UsersPage;