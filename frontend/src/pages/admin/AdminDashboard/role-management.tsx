import { Button } from "../../../components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select"
import { Plus } from 'lucide-react'
import { useState } from "react"

interface UserRole {
  id: string
  email: string
  role: "ADMIN" | "CASHIER" | "USER"
}

export default function RoleManagement() {
  const [users, setUsers] = useState<UserRole[]>([
    { id: "1", email: "admin@example.com", role: "ADMIN" },
    { id: "2", email: "cashier@example.com", role: "CASHIER" },
    { id: "3", email: "user@example.com", role: "USER" },
  ])

  const handleAddUser = (userData: Partial<UserRole>) => {
    setUsers([...users, { ...userData, id: Math.random().toString() } as UserRole])
  }

  const handleUpdateRole = (id: string, role: UserRole["role"]) => {
    setUsers(users.map((user) => (user.id === id ? { ...user, role } : user)))
  }

  return (
    <div className="container space-y-6 p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Role Management</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
            </DialogHeader>
            <UserForm onSave={handleAddUser} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-4 grid grid-cols-3 font-medium border-b border-gray-200">
          <div>Email</div>
          <div>Current Role</div>
          <div>Actions</div>
        </div>
        {users.map((user) => (
          <div key={user.id} className="p-4 grid grid-cols-3 items-center border-b last:border-0">
            <div>{user.email}</div>
            <div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                {user.role}
              </span>
            </div>
            <div>
              <Select
                value={user.role}
                onValueChange={(value: UserRole["role"]) => handleUpdateRole(user.id, value)}
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
        ))}
      </div>
    </div>
  )
}

function UserForm({ onSave }: { onSave: (user: Partial<UserRole>) => void }) {
  const [formData, setFormData] = useState({
    email: "",
    role: "USER" as UserRole["role"],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="role">Role</Label>
        <Select
          value={formData.role}
          onValueChange={(value: UserRole["role"]) => setFormData({ ...formData, role: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ADMIN">Admin</SelectItem>
            <SelectItem value="CASHIER">Cashier</SelectItem>
            <SelectItem value="USER">User</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit" className="w-full">
        Add User
      </Button>
    </form>
  )
}

