import { DashboardHeader } from "@/components/dashboard/header";
import { PageHeader } from "@/components/dashboard/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";

export const metadata = { title: "Appointments" };

const appointments = [
  { title: "Dental Consultation", contact: "Sarah Mitchell", time: "Today, 2:00 PM", status: "CONFIRMED" },
  { title: "Property Viewing", contact: "Alex Rivera", time: "Tomorrow, 10:00 AM", status: "SCHEDULED" },
  { title: "Coaching Session", contact: "Emma Chen", time: "Wed, 4:30 PM", status: "SCHEDULED" },
];

export default function AppointmentsPage() {
  return (
    <>
      <DashboardHeader title="Appointments" />
      <div className="flex-1 p-6">
        <PageHeader
          title="Calendar"
          description="Manage availability, bookings and reminders."
          action={
            <Button>
              <Plus className="h-4 w-4" />
              New appointment
            </Button>
          }
        />

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Upcoming</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {appointments.map((apt) => (
                <div
                  key={apt.title}
                  className="flex items-center justify-between rounded-lg border border-border p-4"
                >
                  <div>
                    <p className="font-medium">{apt.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {apt.contact} · {apt.time}
                    </p>
                  </div>
                  <Badge variant={apt.status === "CONFIRMED" ? "success" : "secondary"}>
                    {apt.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Availability</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              {["Mon–Fri", "Sat", "Sun"].map((day, i) => (
                <div key={day} className="flex justify-between rounded-lg border border-border p-3">
                  <span>{day}</span>
                  <span className="text-muted-foreground">
                    {i === 0 ? "9:00 AM – 6:00 PM" : i === 1 ? "10:00 AM – 2:00 PM" : "Closed"}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
