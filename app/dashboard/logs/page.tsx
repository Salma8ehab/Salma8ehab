"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { Card } from "@/components/ui/card";

export default function LogsPage() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    api.get("/logs").then((res) => setLogs(res.data));
  }, []);

  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold mb-4">Message Logs</h2>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left border-b">
            <th>Email</th>
            <th>Status</th>
            <th>Sender</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id} className="border-b">
              <td>{log.to}</td>
              <td
                className={
                  log.status === "failed" ? "text-red-600" : "text-green-600"
                }
              >
                {log.status}
              </td>
              <td>{log.sender_email}</td>
              <td>{new Date(log.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
