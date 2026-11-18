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
} from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockBusinesses } from "@/lib/mock-data";

export default function SettingsPage() {
  const [biz, setBiz] = React.useState(mockBusinesses[0]);
  const [saved, setSaved] = React.useState(false);
  const [exported, setExported] = React.useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleExportCSV = () => {
    setExported(true);
    setTimeout(() => setExported(false), 3000);
  };

  return (
    <AppShell pageTitle="Settings">
      <div className="mb-6">
        <h2 className="font-display text-xl font-bold tracking-tight text-ink-primary sm:text-2xl">
          Workspace Settings
        </h2>
        <p className="mt-0.5 text-xs text-ink-secondary">
          Configure business details, regional formatting, AI quota, and data exports.
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
      </div>
    </AppShell>
  );
}
