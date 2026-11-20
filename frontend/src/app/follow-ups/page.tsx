"use client";

import * as React from "react";
import Link from "next/link";
import {
  Clock,
  CheckCircle2,
  Calendar,
  AlertCircle,
  MessageSquare,
  ArrowRight,
  Filter,
} from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useWorkspace } from "@/context/workspace-context";
import { FollowUp } from "@/types";
import { formatDate } from "@/lib/utils";

export default function FollowUpsPage() {
  const { followUps, completeFollowUp, snoozeFollowUp } = useWorkspace();
  const [filter, setFilter] = React.useState<"All" | "Due Today" | "Upcoming" | "Completed">("All");

  const filtered = followUps.filter((f) => {
    if (filter === "Completed") return f.status === "Completed";
    if (filter === "Due Today")
      return (
        f.status === "Pending" &&
        (f.dueAt.includes("2026-11-18") || f.dueAt.includes("2026-11-19"))
      );
    if (filter === "Upcoming")
      return (
        f.status === "Pending" &&
        !f.dueAt.includes("2026-11-18") &&
        !f.dueAt.includes("2026-11-19")
      );
    return true;
  });

  const handleToggleComplete = (id: string) => {
    completeFollowUp(id);
  };

  return (
    <AppShell pageTitle="Follow-ups">
      <div className="mb-6 space-y-4">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-display text-xl font-bold tracking-tight text-ink-primary sm:text-2xl">
              Follow-up Action Queue
            </h2>
            <p className="mt-0.5 text-xs text-ink-secondary">
              Never forget an unconfirmed lead. Track scheduled callbacks and reminders.
            </p>
          </div>
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap gap-1.5 border-b border-border pb-3">
          {(["All", "Due Today", "Upcoming", "Completed"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                filter === tab
                  ? "bg-sage-accent text-ivory-soft shadow-subtle"
                  : "bg-ivory-soft border border-border text-ink-secondary hover:bg-ivory-muted"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Follow-ups List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border bg-ivory-soft p-12 text-center">
            <Clock className="mx-auto h-8 w-8 text-sage-accent" />
            <h3 className="mt-3 font-display text-sm font-semibold text-ink-primary">
              No follow-ups in this view
            </h3>
            <p className="mt-1 text-xs text-ink-secondary">
              All pending conversations are resolved or no callbacks have been scheduled yet.
            </p>
          </div>
        ) : (
          filtered.map((fup) => {
            const isDueToday =
              (fup.dueAt.includes("2026-11-18") || fup.dueAt.includes("2026-11-19")) &&
              fup.status === "Pending";
            const isDone = fup.status === "Completed";

            return (
              <Card
                key={fup.id}
                className={`transition-all ${
                  isDone ? "opacity-60 bg-ivory-muted/40" : "hover:border-sage-accent/60"
                }`}
              >
                <CardContent className="p-4 sm:p-5">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-start gap-3">
                      <button
                        onClick={() => handleToggleComplete(fup.id)}
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors ${
                          isDone
                            ? "border-sage-forest bg-sage-forest text-ivory-soft"
                            : "border-border hover:border-sage-accent"
                        }`}
                      >
                        {isDone && <CheckCircle2 className="h-3.5 w-3.5" />}
                      </button>

                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-xs font-bold ${
                              isDone ? "line-through text-ink-muted" : "text-ink-primary"
                            }`}
                          >
                            {fup.customerName}
                          </span>
                          {fup.customerHandle && (
                            <span className="text-[11px] text-ink-muted font-mono">
                              {fup.customerHandle}
                            </span>
                          )}
                          <span className="rounded bg-ivory-warm border border-border px-1.5 py-0.2 text-[10px] text-ink-secondary">
                            via {fup.sourceChannel}
                          </span>
                        </div>
                        <p
                          className={`mt-1 text-xs ${
                            isDone ? "line-through text-ink-muted" : "text-ink-secondary"
                          }`}
                        >
                          {fup.note}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-center">
                      <Badge
                        variant={isDone ? "converted" : isDueToday ? "dueToday" : "upcoming"}
                      >
                        {isDone ? "Completed" : isDueToday ? "Due Today" : "Upcoming"}
                      </Badge>
                      {!isDone && (
                        <button
                          type="button"
                          onClick={() => snoozeFollowUp(fup.id, 2)}
                          className="rounded-md border border-beige-border bg-beige-warm px-2 py-1 text-xs text-ink-secondary hover:bg-beige-subtle transition-colors"
                          title="Snooze reminder by 2 days"
                        >
                          Snooze +2d
                        </button>
                      )}
                      <Link
                        href="/enquiries"
                        className="inline-flex items-center gap-1 rounded-md border border-border bg-ivory-soft px-2.5 py-1 text-xs text-ink-primary hover:bg-ivory-muted"
                      >
                        <span>View Chat</span>
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </AppShell>
  );
}
