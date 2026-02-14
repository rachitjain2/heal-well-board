import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, User } from "lucide-react";
import { useState } from "react";

type PatientStatus = "Active" | "Due for Follow-up" | "Discharged";

interface Patient {
  id: number;
  name: string;
  age: number;
  condition: string;
  lastVisit: string;
  status: PatientStatus;
}

const mockPatients: Patient[] = [
  { id: 1, name: "Sarah Johnson", age: 34, condition: "Hypertension", lastVisit: "2026-02-10", status: "Active" },
  { id: 2, name: "Michael Chen", age: 52, condition: "Diabetes Type 2", lastVisit: "2026-01-28", status: "Due for Follow-up" },
  { id: 3, name: "Emily Davis", age: 27, condition: "Asthma", lastVisit: "2026-02-12", status: "Active" },
  { id: 4, name: "James Wilson", age: 65, condition: "Cardiac Arrhythmia", lastVisit: "2026-01-15", status: "Due for Follow-up" },
  { id: 5, name: "Maria Garcia", age: 41, condition: "Migraine", lastVisit: "2026-02-01", status: "Discharged" },
  { id: 6, name: "Robert Lee", age: 58, condition: "COPD", lastVisit: "2026-01-20", status: "Due for Follow-up" },
];

const statusStyles: Record<PatientStatus, string> = {
  "Active": "bg-success/10 text-success",
  "Due for Follow-up": "bg-destructive/10 text-destructive",
  "Discharged": "bg-muted text-muted-foreground",
};

export default function PatientsPage() {
  const [search, setSearch] = useState("");
  const filtered = mockPatients.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.condition.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Patients</h1>
          <p className="text-muted-foreground text-sm mt-1">View and manage patient records</p>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search patients by name or condition..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="space-y-3">
          {filtered.map((patient) => (
            <Card key={patient.id} className="shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent">
                    <User className="h-5 w-5 text-accent-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{patient.name}</p>
                    <p className="text-sm text-muted-foreground">{patient.condition} · Age {patient.age}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-muted-foreground">Last visit: {patient.lastVisit}</span>
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyles[patient.status]}`}>
                    {patient.status}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-8">No patients found.</p>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
