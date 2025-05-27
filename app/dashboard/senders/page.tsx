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

interface Sender {
  id: string;
  email: string;
  appPassword: string;
  createdAt: string;
  status: "active" | "inactive";
}

const SendersPage = () => {
  const [senders, setSenders] = useState<Sender[]>([]);
  const [email, setEmail] = useState("");
  const [appPassword, setAppPassword] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch senders on component mount
  useEffect(() => {
    const fetchSenders = async () => {
      try {
        const response = await api.get("/senders");
        const data = response.data;
        setSenders(data);
      } catch (error) {
        console.error("Error fetching senders:", error);
      }
    };
    fetchSenders();
  }, []);

  // Handle sender creation
  const handleCreateSender = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await api.post("/senders", {
        email,
        app_password: appPassword,
      });

      const newSender = await response.data;
      setSenders([...senders, newSender]);
      setIsDialogOpen(false);
      setEmail("");
      setAppPassword("");
    } catch (error) {
      console.error("Error creating sender:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Senders</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Add New Sender</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Sender</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateSender} className="space-y-4">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                type="password"
                placeholder="App Password"
                value={appPassword}
                onChange={(e) => setAppPassword(e.target.value)}
                required
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Creating..." : "Create Sender"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Email</TableHead>
            {/* <TableHead>Status</TableHead>
            <TableHead>Created At</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {senders.map((sender) => (
            <TableRow key={sender.id}>
              <TableCell>{sender.id}</TableCell>
              <TableCell>
                {sender.email}
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

export default SendersPage;
