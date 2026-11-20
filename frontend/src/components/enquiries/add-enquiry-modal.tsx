"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  UploadCloud,
  FileText,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  X,
} from "lucide-react";
import { SourceChannel } from "@/types";
import { mockProducts, mockCustomers } from "@/lib/mock-data";
import { useWorkspace } from "@/context/workspace-context";

interface AddEnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const CHANNELS: SourceChannel[] = [
  "Instagram",
  "WhatsApp",
  "Facebook",
  "Telegram",
  "Website",
  "Phone call",
  "Walk-in",
  "Referral",
  "Other",
];

export function AddEnquiryModal({
  isOpen,
  onClose,
  onSuccess,
}: AddEnquiryModalProps) {
  const { addEnquiry } = useWorkspace();
  const [selectedChannel, setSelectedChannel] = React.useState<SourceChannel>("Instagram");
  const [activeTab, setActiveTab] = React.useState<"manual" | "paste" | "screenshot">("paste");

  // Form states
  const [customerName, setCustomerName] = React.useState("");
  const [customerHandle, setCustomerHandle] = React.useState("");
  const [customerPhone, setCustomerPhone] = React.useState("");
  const [productInterest, setProductInterest] = React.useState("");
  const [variant, setVariant] = React.useState("");
  const [quantity, setQuantity] = React.useState<number>(1);
  const [expectedValue, setExpectedValue] = React.useState<number | "">("");
  const [rawText, setRawText] = React.useState("");
  const [notes, setNotes] = React.useState("");

  // AI Extraction state
  const [isExtracting, setIsExtracting] = React.useState(false);
  const [extractionDone, setExtractionDone] = React.useState(false);
  const [uploadedFiles, setUploadedFiles] = React.useState<string[]>([]);
  const [saveSuccess, setSaveSuccess] = React.useState(false);

  // Simulated Gemini AI Extraction
  const handleSimulateAiExtraction = () => {
    if (!rawText.trim() && uploadedFiles.length === 0) return;
    setIsExtracting(true);

    setTimeout(() => {
      setIsExtracting(false);
      setExtractionDone(true);

      // Intelligent parser simulation based on sample messages
      if (rawText.toLowerCase().includes("vase") || uploadedFiles.length > 0) {
        setCustomerName("Pooja Sharma");
        setCustomerHandle("@poojasharma_style");
        setProductInterest("Handcrafted Ceramic Vase");
        setVariant("Earthy Sage");
        setQuantity(2);
        setExpectedValue(3100);
        setNotes("Needs delivery to Andheri East by Friday for a housewarming gift.");
      } else if (rawText.toLowerCase().includes("journal") || rawText.toLowerCase().includes("leather")) {
        setCustomerName("Deepak Verma");
        setCustomerPhone("+91 98311 00293");
        setProductInterest("Embossed Leather Keepsake Journal");
        setQuantity(20);
        setExpectedValue(18000);
        setNotes("Custom logo embossing requested for corporate gift.");
      } else {
        setCustomerName("New Client");
        setProductInterest("Custom Soy Wax Botanical Candle");
        setQuantity(1);
        setExpectedValue(650);
        setNotes("Customer asked for price and shipping timeline.");
      }
    }, 1200);
  };

  const handleSaveEnquiry = () => {
    setSaveSuccess(true);
    addEnquiry({
      customerName: customerName.trim() || "Anonymous Inquiry",
      customerHandle: customerHandle.trim() || undefined,
      customerPhone: customerPhone.trim() || undefined,
      sourceChannel: selectedChannel,
      status: "New",
      originalMessage:
        rawText.trim() ||
        (uploadedFiles.length > 0
          ? "[Screenshot Capture: Incoming Customer Inquiry]"
          : "Manual entry recorded by owner"),
      messageNotes: notes.trim() || undefined,
      productInterest: productInterest.trim() || undefined,
      variant: variant.trim() || undefined,
      quantity: quantity || 1,
      expectedValue: expectedValue === "" ? undefined : Number(expectedValue),
      isAiExtracted: extractionDone,
      screenshots: uploadedFiles,
    });

    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
      if (onSuccess) onSuccess();
      // Reset form
      setCustomerName("");
      setCustomerHandle("");
      setCustomerPhone("");
      setProductInterest("");
      setVariant("");
      setQuantity(1);
      setExpectedValue("");
      setRawText("");
      setNotes("");
      setExtractionDone(false);
      setUploadedFiles([]);
    }, 700);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-pastel-sage text-sage-forest">
              <FileText className="h-4 w-4" />
            </div>
            <div>
              <DialogTitle>Capture Customer Enquiry</DialogTitle>
              <DialogDescription>
                Record incoming conversations from social channels or direct inquiries.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {saveSuccess ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pastel-sage text-sage-forest">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <h3 className="mt-4 font-display text-base font-semibold text-ink-primary">
              Enquiry Saved Successfully!
            </h3>
            <p className="mt-1 text-xs text-ink-secondary">
              Added to your active workspace and ready for follow-up or order conversion.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* 1. Source Channel Selector */}
            <div>
              <label className="text-xs font-semibold text-ink-primary">
                Where did this enquiry come from?
              </label>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {CHANNELS.map((channel) => (
                  <button
                    key={channel}
                    type="button"
                    onClick={() => setSelectedChannel(channel)}
                    className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                      selectedChannel === channel
                        ? "bg-sage-accent text-ivory-soft shadow-subtle"
                        : "border border-border bg-ivory-soft text-ink-secondary hover:bg-ivory-muted"
                    }`}
                  >
                    {channel}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Capture Method Tabs */}
            <Tabs
              value={activeTab}
              onValueChange={(val: any) => setActiveTab(val)}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="paste" className="gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-sage-accent" />
                  <span>Paste Chat (AI)</span>
                </TabsTrigger>
                <TabsTrigger value="screenshot" className="gap-1.5">
                  <UploadCloud className="h-3.5 w-3.5" />
                  <span>Screenshots</span>
                </TabsTrigger>
                <TabsTrigger value="manual" className="gap-1.5">
                  <FileText className="h-3.5 w-3.5" />
                  <span>Manual Form</span>
                </TabsTrigger>
              </TabsList>

              {/* Tab A: Paste Raw Chat Message */}
              <TabsContent value="paste" className="space-y-3 pt-2">
                <div>
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-medium text-ink-secondary">
                      Paste the conversation from {selectedChannel}:
                    </label>
                    <span className="text-[10px] text-ink-muted">
                      Supports English, Hindi & Hinglish
                    </span>
                  </div>
                  <Textarea
                    placeholder="e.g. 'Hi, loved your ceramic vase reel. Is the Earthy Sage variant available? Need 2 pieces delivered to Pune by Friday. Price with delivery please?'"
                    value={rawText}
                    onChange={(e) => setRawText(e.target.value)}
                    className="mt-1 h-24 text-xs font-mono"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() =>
                      setRawText(
                        "Hey! Loved your reel on the ceramic vases. Can you tell me if the Earthy Sage variant is in stock? Also, I need 2 pieces delivered to Andheri East by Friday for a housewarming gift. Price with delivery please?"
                      )
                    }
                    className="text-[11px] text-sage-accent underline hover:text-sage-hover"
                  >
                    Insert sample customer message
                  </button>

                  <Button
                    type="button"
                    onClick={handleSimulateAiExtraction}
                    disabled={!rawText.trim() || isExtracting}
                    size="sm"
                    className="gap-1.5 bg-sage-accent text-xs hover:bg-sage-hover"
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>{isExtracting ? "Extracting..." : "Extract with Gemini AI"}</span>
                  </Button>
                </div>
              </TabsContent>

              {/* Tab B: Upload Screenshot */}
              <TabsContent value="screenshot" className="space-y-3 pt-2">
                <div className="rounded-xl border-2 border-dashed border-border bg-ivory-warm p-6 text-center">
                  <UploadCloud className="mx-auto h-8 w-8 text-sage-accent" />
                  <p className="mt-2 text-xs font-semibold text-ink-primary">
                    Upload chat screenshot (up to 3 images)
                  </p>
                  <p className="mt-0.5 text-[10px] text-ink-muted">
                    Supports JPG, PNG, WebP up to 10MB each. Private & encrypted.
                  </p>

                  <div className="mt-4 flex justify-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setUploadedFiles([
                          "AurenLogin .png (Sample Chat Screenshot)",
                        ])
                      }
                      className="text-xs"
                    >
                      Attach Sample Screenshot
                    </Button>
                  </div>

                  {uploadedFiles.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2 justify-center">
                      {uploadedFiles.map((f, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-1.5 rounded-full border border-border bg-ivory-soft px-3 py-1 text-xs text-ink-primary"
                        >
                          <CheckCircle2 className="h-3 w-3 text-sage-forest" />
                          <span>{f}</span>
                          <button
                            type="button"
                            onClick={() => setUploadedFiles([])}
                            className="ml-1 text-ink-muted hover:text-ink-primary"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {uploadedFiles.length > 0 && (
                  <div className="flex justify-end">
                    <Button
                      type="button"
                      onClick={handleSimulateAiExtraction}
                      disabled={isExtracting}
                      size="sm"
                      className="gap-1.5 bg-sage-accent text-xs hover:bg-sage-hover"
                    >
                      <Sparkles className="h-3.5 w-3.5" />
                      <span>{isExtracting ? "Scanning Screenshot..." : "Extract Details via AI"}</span>
                    </Button>
                  </div>
                )}
              </TabsContent>

              {/* Tab C: Direct Manual Fields */}
              <TabsContent value="manual" className="pt-2">
                <p className="text-xs text-ink-muted">
                  Direct entry mode: fill out details manually under 10 seconds.
                </p>
              </TabsContent>
            </Tabs>

            {/* AI Review Banner */}
            {extractionDone && (
              <div className="rounded-lg border border-border bg-pastel-sage/50 p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-sage-forest">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>AI Draft Ready — Review & Confirm</span>
                  </div>
                  <Badge variant="replied" className="text-[10px]">
                    Needs Owner Confirmation
                  </Badge>
                </div>
                <p className="mt-1 text-[11px] text-ink-secondary">
                  Please verify the extracted customer name, product interest, and agreed prices before saving.
                </p>
              </div>
            )}

            {/* 3. Editable Fields (Human-in-the-Loop review) */}
            <div className="grid grid-cols-1 gap-3 rounded-xl border border-border bg-ivory-soft p-4 sm:grid-cols-2">
              <div>
                <label className="text-xs font-medium text-ink-secondary">
                  Customer Name *
                </label>
                <Input
                  placeholder="e.g. Pooja Sharma"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-ink-secondary">
                  Social Handle or Phone
                </label>
                <Input
                  placeholder="e.g. @poojasharma_style or +91 98210..."
                  value={customerHandle}
                  onChange={(e) => setCustomerHandle(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-ink-secondary">
                  Product / Service Interest
                </label>
                <Input
                  placeholder="e.g. Handcrafted Ceramic Vase"
                  value={productInterest}
                  onChange={(e) => setProductInterest(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-ink-secondary">
                  Variant / Customization
                </label>
                <Input
                  placeholder="e.g. Earthy Sage or Custom Tag"
                  value={variant}
                  onChange={(e) => setVariant(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-ink-secondary">
                  Quantity
                </label>
                <Input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  className="mt-1"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-ink-secondary">
                  Expected / Quoted Amount (₹)
                </label>
                <Input
                  type="number"
                  placeholder="e.g. 3100"
                  value={expectedValue}
                  onChange={(e) =>
                    setExpectedValue(e.target.value ? parseFloat(e.target.value) : "")
                  }
                  className="mt-1"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-medium text-ink-secondary">
                  Internal Notes & Delivery Location
                </label>
                <Textarea
                  placeholder="e.g. Customer needs delivery to Andheri East by Friday. Housewarming gift."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="mt-1 h-16"
                />
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between border-t border-border pt-3">
              <span className="text-[11px] text-ink-muted">
                {selectedChannel} • {customerName ? customerName : "Draft"}
              </span>

              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  onClick={handleSaveEnquiry}
                  disabled={!customerName.trim()}
                  size="sm"
                  className="gap-1.5 bg-sage-accent text-ivory-soft hover:bg-sage-hover"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Review & Save Enquiry</span>
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
