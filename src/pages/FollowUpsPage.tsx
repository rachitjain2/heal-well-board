import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ClipboardCheck, User, Phone } from "lucide-react";
import { toast } from "sonner";

const followUps = [
  { id: 1, patient: "Michael Chen", condition: "Diabetes Type 2", dueDate: "2026-02-16", phone: "+1 555-0102" },
  { id: 2, patient: "James Wilson", condition: "Cardiac Arrhythmia", dueDate: "2026-02-15", phone: "+1 555-0104" },
  { id: 3, patient: "Robert Lee", condition: "COPD", dueDate: "2026-02-18", phone: "+1 555-0106" },
];

export default function FollowUpsPage() {
  const markDone = (name: string) => {
    toast.success(`Follow-up for ${name} marked as completed`);
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10">
            <ClipboardCheck className="h-5 w-5 text-destructive" />
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">Follow-ups</h1>
            <p className="text-muted-foreground text-sm mt-1">{followUps.length} patients due for follow-up</p>
          </div>
        </div>

        <div className="space-y-3">
          {followUps.map((fu) => (
            <Card key={fu.id} className="shadow-sm border-l-4 border-l-destructive">
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent">
                    <User className="h-5 w-5 text-accent-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{fu.patient}</p>
                    <p className="text-sm text-muted-foreground">{fu.condition}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-muted-foreground">Due: {fu.dueDate}</span>
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <Phone className="h-3.5 w-3.5" /> {fu.phone}
                  </span>
                  <Button size="sm" variant="outline" onClick={() => markDone(fu.patient)}>
                    Mark Done
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
