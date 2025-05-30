"use client";
import { useEffect, useState } from "react";

type Incident = {
  id: number;
  type: string;
  status: string;
  severity: "critical" | "high" | "medium" | "low";
  reported_by: string;
  date_reported: string;
  last_updated: string;
  description: string;
};

export default function DashboardPage() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/incidents")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch incidents");
        return res.json();
      })
      .then((data) => setIncidents(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading incidents...</div>;
  if (error) return <div className='text-red-600'>Error: {error}</div>;

  return (
    <div>
      <h1 className='text-2xl mb-4'>Incidents</h1>
      <div className='overflow-x-auto'>
        <table className='min-w-full border border-gray-300 bg-white'>
          <thead>
            <tr className='bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-200'>
              <th className='px-4 py-2'>ID</th>
              <th className='px-4 py-2'>Type</th>
              <th className='px-4 py-2'>Status</th>
              <th className='px-4 py-2'>Severity</th>
              <th className='px-4 py-2'>Reported By</th>
              <th className='px-4 py-2'>Date Reported</th>
              <th className='px-4 py-2'>Last Updated</th>
              <th className='px-4 py-2'>Description</th>
            </tr>
          </thead>
          <tbody>
            {incidents.map((inc) => (
              <tr key={inc.id} className='border-t dark:border-gray-700'>
                <td className='px-4 py-2'>{inc.id}</td>
                <td className='px-4 py-2'>{inc.type}</td>
                <td className='px-4 py-2'>{inc.status}</td>
                <td
                  className={`px-4 py-2 font-bold ${
                    inc.severity === "critical"
                      ? "text-red-700 dark:text-red-400"
                      : inc.severity === "high"
                      ? "text-orange-600 dark:text-orange-400"
                      : inc.severity === "medium"
                      ? "text-yellow-600 dark:text-yellow-300"
                      : "text-green-700 dark:text-green-400"
                  }`}
                >
                  {inc.severity}
                </td>
                <td className='px-4 py-2'>{inc.reported_by}</td>
                <td className='px-4 py-2'>{inc.date_reported}</td>
                <td className='px-4 py-2'>{inc.last_updated}</td>
                <td className='px-4 py-2'>{inc.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
