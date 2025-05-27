"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import axios, { api } from "@/lib/axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface User {
  id: string;
  email: string;
  Password: string;
  // createdAt: string;
  // status: "active" | "inactive";
}

const usersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch senders on component mount
  useEffect(() => {
    const fetchSenders = async () => {
      try {
        const response = await api.get("/admin/create-user");
        const data = response.data;
        setUsers(data);
      } catch (error) {
        console.error("Error fetching senders:", error);
      }
    };
    fetchSenders();
  }, []);

  // Handle sender creation
  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await api.post("/admin/create-user", {
        email,
        app_password:password,
      });

      const newUser = await response.data;
      setUsers([...users, newUser]);
      setIsDialogOpen(false);
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Error creating sender:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Users</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Add New user</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New User</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateUser} className="space-y-4">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Creating..." : "Create User"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>userName</TableHead>
            {/* <TableHead>Status</TableHead>
            <TableHead>Created At</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>
                {user.email}
                {/* <span
                  className={`px-2 py-1 rounded ${
                    sender.status === "active"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {sender.status}
                </span> */}
              </TableCell>
              {/* <TableCell>
                {new Date(sender.createdAt).toLocaleDateString()}
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default usersPage;
