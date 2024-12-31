import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select"
import { useGetUsers } from "../../../hooks/use-get-users"
import { useUpdateRole } from "../../../hooks/use-update-role"
import { toast } from "react-toastify"
import { User } from "../../../types/user"

export default function RoleManagement() {
  const { users = [], loading: fetchingUsers, error: fetchError } = useGetUsers();
  const { updateRole, loading: updating, error: updateError } = useUpdateRole();

  const handleUpdateRole = async (userId: number, role: User["role"]) => {
    try {
      await updateRole(userId, role);
      
      // Show toast and wait before reload
      toast.success('Role updated successfully', {
        onClose: () => window.location.reload(),
        autoClose: 800 
      });
      
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to update role');
    }
  }

  if (fetchingUsers) {
    return <div className="container p-8">Loading users...</div>;
  }

  if (fetchError) {
    return <div className="container p-8 text-red-500">Error: {fetchError}</div>;
  }

  return (
    <div className="container space-y-6 p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Role Management</h2>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-4 grid grid-cols-4 font-medium border-b border-gray-200">
          <div>Name</div>
          <div>Email</div>
          <div>Current Role</div>
          <div>Actions</div>
        </div>
        {users && users.length > 0 ? (
          users.map((user) => (
            <div key={user.id} className="p-4 grid grid-cols-4 items-center border-b last:border-0">
              <div>{user.name}</div>
              <div>{user.email}</div>
              <div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                  {user.role}
                </span>
              </div>
              <div>
                <Select
                  value={user.role}
                  onValueChange={(value: User["role"]) => user.id && handleUpdateRole(user.id, value)}
                  disabled={updating}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ADMIN">Admin</SelectItem>
                    <SelectItem value="CASHIER">Cashier</SelectItem>
                    <SelectItem value="USER">User</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          ))
        ) : (
          <div className="p-4 text-center text-gray-500">
            No users found
          </div>
        )}
      </div>

      {updateError && (
        <div className="text-red-500 mt-4">
          Error updating role: {updateError}
        </div>
      )}
    </div>
  )
}



