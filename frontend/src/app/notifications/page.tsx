"use client";

import * as React from "react";
import Link from "next/link";
import {
  Bell,
  Clock,
  MessageSquare,
  AlertTriangle,
  ShoppingBag,
  CheckCircle2,
} from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useWorkspace } from "@/context/workspace-context";
import { NotificationItem } from "@/types";
import { formatDate } from "@/lib/utils";

export default function NotificationsPage() {
  const { notifications, markNotificationRead } = useWorkspace();

  const handleMarkAllRead = () => {
    notifications.forEach((n) => markNotificationRead(n.id));
  };

  return (
    <AppShell pageTitle="Notifications">
      <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h2 className="font-display text-xl font-bold tracking-tight text-ink-primary sm:text-2xl">
            In-App Notifications
          </h2>
          <p className="mt-0.5 text-xs text-ink-secondary">
            Operational reminders for due follow-ups, low stock thresholds, and new customer chats.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={handleMarkAllRead}
          className="text-xs self-start sm:self-auto"
        >
          Mark all as read
        </Button>
      </div>

      <div className="space-y-3">
        {notifications.map((notif) => {
          const Icon =
            notif.type === "follow_up"
              ? Clock
              : notif.type === "new_enquiry"
              ? MessageSquare
              : notif.type === "low_stock"
              ? AlertTriangle
              : ShoppingBag;

          return (
            <Card
              key={notif.id}
              className={`transition-all ${
                notif.isRead ? "bg-ivory-soft/60" : "bg-ivory-soft border-sage-accent/50"
              }`}
            >
              <CardContent className="flex items-start justify-between p-4 sm:p-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-pastel-sage text-sage-forest">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-display text-xs font-bold text-ink-primary">
                        {notif.title}
                      </h3>
                      {!notif.isRead && (
                        <span className="h-2 w-2 rounded-full bg-sage-accent" />
                      )}
                    </div>
                    <p className="mt-0.5 text-xs text-ink-secondary">
                      {notif.description}
                    </p>
                    <span className="mt-1 block text-[10px] text-ink-muted">
                      {formatDate(notif.createdAt)}
                    </span>
                  </div>
                </div>

                {notif.linkUrl && (
                  <Link
                    href={notif.linkUrl}
                    className="text-xs font-semibold text-sage-accent hover:underline self-center shrink-0 ml-2"
                  >
                    View →
                  </Link>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </AppShell>
  );
}
