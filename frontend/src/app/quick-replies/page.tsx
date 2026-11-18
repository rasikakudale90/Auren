"use client";

import * as React from "react";
import {
  Zap,
  Copy,
  Check,
  Plus,
  Trash2,
} from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { mockQuickReplies } from "@/lib/mock-data";
import { QuickReply } from "@/types";

export default function QuickRepliesPage() {
  const [replies, setReplies] = React.useState<QuickReply[]>(mockQuickReplies);
  const [copiedId, setCopiedId] = React.useState<string | null>(null);
  const [isAddOpen, setIsAddOpen] = React.useState(false);

  const [title, setTitle] = React.useState("");
  const [category, setCategory] = React.useState<QuickReply["category"]>("Price");
  const [message, setMessage] = React.useState("");

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const newReply: QuickReply = {
      id: `qr-${Date.now()}`,
      businessId: "biz-1",
      title,
      category,
      message,
    };
    setReplies([...replies, newReply]);
    setIsAddOpen(false);
    setTitle("");
    setMessage("");
  };

  return (
    <AppShell pageTitle="Quick Replies">
      <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h2 className="font-display text-xl font-bold tracking-tight text-ink-primary sm:text-2xl">
            Canned Quick Replies
          </h2>
          <p className="mt-0.5 text-xs text-ink-secondary">
            1-click copy responses to paste into your Instagram, WhatsApp, or Facebook chats.
          </p>
        </div>

        <Button
          onClick={() => setIsAddOpen(true)}
          size="sm"
          className="gap-1.5 bg-sage-accent text-ivory-soft hover:bg-sage-hover self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          <span>New Template</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {replies.map((qr) => (
          <Card key={qr.id} className="transition-all hover:border-sage-accent/60">
            <CardContent className="p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-sm font-semibold text-ink-primary">
                  {qr.title}
                </h3>
                <Badge variant="neutral" className="text-[10px]">
                  {qr.category}
                </Badge>
              </div>

              <div className="rounded-lg bg-ivory-warm p-3 text-xs text-ink-secondary leading-relaxed border border-border/70 font-mono">
                {qr.message}
              </div>

              <div className="flex justify-end pt-1">
                <Button
                  onClick={() => handleCopy(qr.id, qr.message)}
                  size="sm"
                  className={`gap-1.5 text-xs transition-all ${
                    copiedId === qr.id
                      ? "bg-sage-forest text-ivory-soft"
                      : "bg-sage-accent text-ivory-soft hover:bg-sage-hover"
                  }`}
                >
                  {copiedId === qr.id ? (
                    <>
                      <Check className="h-3.5 w-3.5" />
                      <span>Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy Reply</span>
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {isAddOpen && (
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Create Quick Reply Template</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleAdd} className="space-y-4 pt-2">
              <div>
                <label className="text-xs font-medium text-ink-primary">Template Title</label>
                <Input
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. UPI Payment Details"
                  className="mt-1"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-ink-primary">Category</label>
                <select
                  value={category}
                  onChange={(e: any) => setCategory(e.target.value)}
                  className="mt-1 flex h-9 w-full rounded-md border border-border bg-ivory-soft px-3 py-1 text-xs"
                >
                  <option value="Price">Price</option>
                  <option value="Delivery">Delivery</option>
                  <option value="Availability">Availability</option>
                  <option value="Customisation">Customisation</option>
                  <option value="General">General</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-ink-primary">Message Content</label>
                <Textarea
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type the message you want to reuse..."
                  className="mt-1 h-24 text-xs font-mono"
                />
              </div>

              <div className="flex justify-end gap-2 border-t border-border pt-4">
                <Button type="button" variant="ghost" size="sm" onClick={() => setIsAddOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" size="sm" className="bg-sage-accent text-ivory-soft hover:bg-sage-hover">
                  Save Template
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </AppShell>
  );
}
