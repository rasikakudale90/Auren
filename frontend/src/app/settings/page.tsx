"use client";

import * as React from "react";
import {
  Settings,
  Store,
  Globe,
  Sparkles,
  Download,
  Trash2,
  CheckCircle2,
  RotateCcw,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { mockBusinesses, mockTrashItems } from "@/lib/mock-data";
import { TrashItem } from "@/types";

export default function SettingsPage() {
  const [biz, setBiz] = React.useState(mockBusinesses[0]);
  const [saved, setSaved] = React.useState(false);
  const [exported, setExported] = React.useState(false);

  // Trash & 30-Day Retention State (SRS FR-DATA-002 / SEC-004)
  const [trashItems, setTrashItems] = React.useState<TrashItem[]>(mockTrashItems);
  const [trashNotice, setTrashNotice] = React.useState<string | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleExportCSV = () => {
    setExported(true);
    setTimeout(() => setExported(false), 3000);
  };

  const handleRestore = (id: string, title: string) => {
    setTrashItems((prev) => prev.filter((item) => item.id !== id));
    setTrashNotice(`Restored "${title}" back to active records.`);
    setTimeout(() => setTrashNotice(null), 3500);
  };

  const handleEmptyTrash = () => {
    const count = trashItems.length;
    setTrashItems([]);
    setTrashNotice(`Permanently cleared ${count} items from 30-day trash retention.`);
    setTimeout(() => setTrashNotice(null), 3500);
  };

  return (
    <AppShell pageTitle="Settings">
      <div className="mb-6">
        <h2 className="font-display text-xl font-bold tracking-tight text-ink-primary sm:text-2xl">
          Workspace Settings
        </h2>
        <p className="mt-0.5 text-xs text-ink-secondary">
          Configure business details, regional formatting, AI quota, data export, and 30-day retention.
        </p>
      </div>

      <div className="space-y-6 max-w-4xl">
        {/* 1. Business Profile */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Store className="h-4 w-4 text-sage-accent" />
              <CardTitle>Business Profile</CardTitle>
            </div>
            <CardDescription>
              Basic workspace identity displayed across customer receipts and messages.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-ink-primary">Business Name</label>
                  <Input
                    value={biz.name}
                    onChange={(e) => setBiz({ ...biz, name: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-ink-primary">Category</label>
                  <Input
                    value={biz.category}
                    onChange={(e) => setBiz({ ...biz, category: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-ink-primary">Contact Phone</label>
                  <Input
                    value={biz.phone || ""}
                    onChange={(e) => setBiz({ ...biz, phone: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-ink-primary">Studio Address</label>
                  <Input
                    value={biz.address || ""}
                    onChange={(e) => setBiz({ ...biz, address: e.target.value })}
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <Button type="submit" size="sm" className="bg-sage-accent text-ivory-soft hover:bg-sage-hover">
                  {saved ? "Changes Saved!" : "Save Profile"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* 2. Regional Preferences */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-sage-accent" />
              <CardTitle>Regional & Currency Standards</CardTitle>
            </div>
            <CardDescription>
              Used for formatting currency totals, payment receipts, and follow-up alerts.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="font-medium text-ink-primary">Currency</label>
                <Input value={biz.currency} readOnly className="mt-1 bg-ivory-warm" />
              </div>
              <div>
                <label className="font-medium text-ink-primary">Timezone</label>
                <Input value={biz.timezone} readOnly className="mt-1 bg-ivory-warm" />
              </div>
              <div>
                <label className="font-medium text-ink-primary">Date Format</label>
                <Input value={biz.dateFormat} readOnly className="mt-1 bg-ivory-warm" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 3. AI Extraction Quota (Gemini API) */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-sage-accent" />
              <CardTitle>Gemini AI Extraction Quota</CardTitle>
            </div>
            <CardDescription>
              Monthly allowance for AI-assisted chat and screenshot extractions.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-ink-primary">
                {biz.aiQuotaUsed} of {biz.aiQuotaLimit} extractions used
              </span>
              <span className="text-ink-muted">
                Resets on {biz.aiQuotaResetDate}
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-border">
              <div
                className="h-full rounded-full bg-sage-accent"
                style={{ width: `${(biz.aiQuotaUsed / biz.aiQuotaLimit) * 100}%` }}
              />
            </div>
            <p className="text-[11px] text-ink-secondary">
              Core manual enquiry, order, and customer tracking remains 100% active even if quota is exhausted.
            </p>
          </CardContent>
        </Card>

        {/* 4. Complete Data Export (SRS FR-DATA-001) */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Download className="h-4 w-4 text-sage-accent" />
              <CardTitle>Data Portability & CSV Export</CardTitle>
            </div>
            <CardDescription>
              Download a complete archive of all customers, inquiries, follow-ups, and orders.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-xl border border-border bg-ivory-warm p-4">
              <div>
                <p className="text-xs font-semibold text-ink-primary">
                  Export Business Archive (CSV)
                </p>
                <p className="text-[11px] text-ink-secondary mt-0.5">
                  Includes separate CSV files for Customers, Enquiries, Orders, and Payments.
                </p>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={handleExportCSV}
                className="gap-1.5 text-xs self-start sm:self-auto"
              >
                <Download className="h-3.5 w-3.5" />
                <span>{exported ? "CSV Downloaded!" : "Export CSV Archive"}</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 5. Trash & 30-Day Data Retention (SRS FR-DATA-002 / SEC-004) */}
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Trash2 className="h-4 w-4 text-burgundy-accent" />
                <CardTitle>Trash & 30-Day Data Retention</CardTitle>
              </div>
              <Badge variant="burgundy" className="text-[10px]">
                SRS FR-DATA-002
              </Badge>
            </div>
            <CardDescription>
              Soft-deleted inquiries, customers, and orders are safely retained for 30 days before permanent purging. You can restore them anytime.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {trashNotice && (
              <div className="flex items-center gap-2 rounded-xl border border-pastel-sage bg-pastel-sage/50 p-3 text-xs text-sage-forest">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-sage-accent" />
                <span>{trashNotice}</span>
              </div>
            )}

            {trashItems.length === 0 ? (
              <div className="rounded-xl border border-dashed border-border bg-ivory-warm p-6 text-center">
                <Trash2 className="mx-auto h-7 w-7 text-ink-muted/40" />
                <p className="mt-2 text-xs font-semibold text-ink-primary">Trash is completely empty</p>
                <p className="mt-0.5 text-[11px] text-ink-muted">
                  Deleted records will appear here for 30 days before being automatically purged.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-ink-muted">
                    {trashItems.length} items currently in retention
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleEmptyTrash}
                    className="h-7 gap-1.5 text-xs text-burgundy-accent border-burgundy-border hover:bg-burgundy-soft hover:text-burgundy-hover"
                  >
                    <Trash2 className="h-3 w-3" />
                    <span>Empty Trash Now</span>
                  </Button>
                </div>

                <div className="divide-y divide-border rounded-xl border border-border bg-ivory-soft overflow-hidden">
                  {trashItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3.5 sm:p-4 gap-3 transition-colors hover:bg-ivory-warm"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-ink-primary">
                            {item.title}
                          </span>
                          <Badge
                            variant={
                              item.type === "Customer"
                                ? "vip"
                                : item.type === "Order"
                                ? "burgundy"
                                : "beige"
                            }
                            className="text-[10px]"
                          >
                            {item.type}
                          </Badge>
                        </div>
                        <p className="text-[11px] text-ink-secondary">{item.details}</p>
                        <div className="flex items-center gap-3 text-[10px] text-ink-muted">
                          <span>Deleted {item.deletedAt}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1 text-burgundy-accent font-medium">
                            <Clock className="h-3 w-3" />
                            Auto-purges in {item.daysRemaining} days
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleRestore(item.id, item.title)}
                          className="h-7 gap-1 text-xs border-sage-accent/40 text-sage-forest hover:bg-pastel-sage/50"
                        >
                          <RotateCcw className="h-3 w-3 text-sage-accent" />
                          <span>Restore</span>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
