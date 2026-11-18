"use client";

import * as React from "react";
import Image from "next/image";
import {
  Package,
  Plus,
  Search,
  AlertTriangle,
  CheckCircle2,
  Tag,
} from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { mockProducts } from "@/lib/mock-data";
import { Product } from "@/types";
import { formatCurrency } from "@/lib/utils";

export default function ProductsPage() {
  const [products, setProducts] = React.useState<Product[]>(mockProducts);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isAddOpen, setIsAddOpen] = React.useState(false);

  // New product form
  const [name, setName] = React.useState("");
  const [category, setCategory] = React.useState("Home Décor");
  const [price, setPrice] = React.useState<number>(1200);
  const [stock, setStock] = React.useState<number>(10);
  const [variants, setVariants] = React.useState("Standard");

  const filtered = products.filter(
    (p) =>
      searchQuery === "" ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const newProd: Product = {
      id: `prod-${Date.now()}`,
      businessId: "biz-1",
      name,
      category,
      price,
      stockQuantity: stock,
      lowStockThreshold: 3,
      variants: variants.split(",").map((v) => v.trim()),
      isArchived: false,
      imageUrl:
        "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=600&q=80",
    };
    setProducts([newProd, ...products]);
    setIsAddOpen(false);
    setName("");
    setPrice(1000);
    setStock(10);
  };

  return (
    <AppShell pageTitle="Products Catalogue">
      <div className="mb-6 space-y-4">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-display text-xl font-bold tracking-tight text-ink-primary sm:text-2xl">
              Internal Product Catalogue
            </h2>
            <p className="mt-0.5 text-xs text-ink-secondary">
              Reference items, standard unit prices, and manual inventory tracking.
            </p>
          </div>

          <Button
            onClick={() => setIsAddOpen(true)}
            size="sm"
            className="gap-1.5 bg-sage-accent text-ivory-soft hover:bg-sage-hover self-start sm:self-auto"
          >
            <Plus className="h-4 w-4" />
            <span>Add Product</span>
          </Button>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-ink-muted" />
          <Input
            type="search"
            placeholder="Search products by name or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 text-xs"
          />
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((prod) => {
          const isLowStock = prod.stockQuantity <= prod.lowStockThreshold;

          return (
            <Card key={prod.id} className="overflow-hidden transition-all hover:border-sage-accent/60">
              {prod.imageUrl && (
                <div className="relative h-44 w-full bg-ivory-warm">
                  <Image
                    src={prod.imageUrl}
                    alt={prod.name}
                    fill
                    className="object-cover"
                  />
                  {isLowStock && (
                    <div className="absolute top-2 right-2 rounded-full border border-red-200 bg-red-50/90 px-2 py-0.5 text-[10px] font-bold text-red-700 backdrop-blur-sm">
                      Low Stock: {prod.stockQuantity} left
                    </div>
                  )}
                </div>
              )}
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-semibold text-sage-accent uppercase tracking-wider">
                      {prod.category}
                    </span>
                    <h3 className="font-display text-sm font-semibold text-ink-primary mt-0.5">
                      {prod.name}
                    </h3>
                  </div>
                  <span className="font-display text-sm font-bold text-ink-primary font-mono">
                    {formatCurrency(prod.price)}
                  </span>
                </div>

                {prod.description && (
                  <p className="mt-2 text-xs text-ink-secondary line-clamp-2">
                    {prod.description}
                  </p>
                )}

                {/* Variants */}
                <div className="mt-3 flex flex-wrap gap-1">
                  {prod.variants.map((v) => (
                    <span
                      key={v}
                      className="rounded bg-ivory-warm border border-border px-1.5 py-0.5 text-[10px] text-ink-muted"
                    >
                      {v}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-xs text-ink-secondary">
                  <span>Stock: {prod.stockQuantity} units</span>
                  {prod.sku && <span className="font-mono text-[10px]">{prod.sku}</span>}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Add Product Modal */}
      {isAddOpen && (
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Catalogue Product</DialogTitle>
              <DialogDescription>
                Internal reference item for creating quick order items.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleAddProduct} className="space-y-4 pt-2">
              <div>
                <label className="text-xs font-medium text-ink-primary">Product Name *</label>
                <Input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Handmade Ceramic Cup"
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-ink-primary">Category</label>
                  <Input
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-ink-primary">Price (₹) *</label>
                  <Input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-ink-primary">Stock Quantity</label>
                  <Input
                    type="number"
                    value={stock}
                    onChange={(e) => setStock(parseInt(e.target.value) || 0)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-ink-primary">Variants (comma separated)</label>
                  <Input
                    value={variants}
                    onChange={(e) => setVariants(e.target.value)}
                    placeholder="Small, Medium, Large"
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 border-t border-border pt-4">
                <Button type="button" variant="ghost" size="sm" onClick={() => setIsAddOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" size="sm" className="bg-sage-accent text-ivory-soft hover:bg-sage-hover">
                  Save Product
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </AppShell>
  );
}
