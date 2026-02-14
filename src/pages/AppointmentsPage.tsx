import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, Plus, User } from "lucide-react";
import { toast } from "sonner";

const mockAppointments = [
  { id: 1, patient: "Sarah Johnson", date: "2026-02-14", time: "09:00 AM", type: "Check-up", status: "Confirmed" },
  { id: 2, patient: "Michael Chen", date: "2026-02-14", time: "10:30 AM", type: "Follow-up", status: "Pending" },
  { id: 3, patient: "Emily Davis", date: "2026-02-14", time: "01:00 PM", type: "Consultation", status: "Confirmed" },
  { id: 4, patient: "James Wilson", date: "2026-02-15", time: "11:00 AM", type: "Lab Review", status: "Pending" },
];

export default function AppointmentsPage() {
  const [showForm, setShowForm] = useState(false);
  const [appointments, setAppointments] = useState(mockAppointments);
  const [form, setForm] = useState({ patient: "", date: "", time: "", type: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.patient || !form.date || !form.time || !form.type) {
      toast.error("Please fill in all fields");
      return;
    }
    const newAppt = { id: Date.now(), ...form, status: "Pending" };
    setAppointments((prev) => [...prev, newAppt]);
    setForm({ patient: "", date: "", time: "", type: "" });
    setShowForm(false);
    toast.success("Appointment booked successfully!");
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">Appointments</h1>
            <p className="text-muted-foreground text-sm mt-1">Manage and schedule patient appointments</p>
          </div>
          <Button onClick={() => setShowForm(!showForm)} className="gap-2">
            <Plus className="h-4 w-4" />
            Book Appointment
          </Button>
        </div>

        {showForm && (
          <Card className="border-primary/20 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-display">New Appointment</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="patient">Patient Name</Label>
                  <Input
                    id="patient"
                    placeholder="Full name"
                    value={form.patient}
                    onChange={(e) => setForm({ ...form, patient: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={form.time}
                    onChange={(e) => setForm({ ...form, time: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <Select value={form.type} onValueChange={(val) => setForm({ ...form, type: val })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Check-up">Check-up</SelectItem>
                      <SelectItem value="Follow-up">Follow-up</SelectItem>
                      <SelectItem value="Consultation">Consultation</SelectItem>
                      <SelectItem value="Lab Review">Lab Review</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="sm:col-span-2 flex gap-2 justify-end pt-2">
                  <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
                  <Button type="submit">Confirm Booking</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="space-y-3">
          {appointments.map((appt) => (
            <Card key={appt.id} className="shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent">
                    <User className="h-5 w-5 text-accent-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{appt.patient}</p>
                    <p className="text-sm text-muted-foreground">{appt.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" /> {appt.date}
                  </span>
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" /> {appt.time}
                  </span>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      appt.status === "Confirmed"
                        ? "bg-success/10 text-success"
                        : "bg-warning/10 text-warning"
                    }`}
                  >
                    {appt.status}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
