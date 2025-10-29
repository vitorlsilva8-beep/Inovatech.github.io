import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ItemCard } from "@/components/item-card";
import { EmptyState } from "@/components/empty-state";
import { SearchFilterBar } from "@/components/search-filter-bar";
import { ItemDetailDialog } from "@/components/item-detail-dialog";
import { ItemFormDialog } from "@/components/item-form-dialog";
import { DeleteConfirmationDialog } from "@/components/delete-confirmation-dialog";
import { ClaimItemDialog } from "@/components/claim-item-dialog";
import { ItemsGridSkeleton } from "@/components/loading-skeleton";
import { ThemeToggle } from "@/components/theme-toggle";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Item, Category, InsertItem } from "@shared/schema";
import logoImg from "@assets/generated_images/Lost_and_found_logo_e3dc4fc8.png";

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [deletingItem, setDeletingItem] = useState<Item | null>(null);
  const [claimingItem, setClaimingItem] = useState<Item | null>(null);
  const { toast } = useToast();

  const { data: items = [], isLoading: isLoadingItems } = useQuery<Item[]>({
    queryKey: ["/api/items"],
  });

  const { data: categories = [], isLoading: isLoadingCategories } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const createItemMutation = useMutation({
    mutationFn: async (data: InsertItem) => {
      if (editingItem) {
        return await apiRequest("PATCH", `/api/items/${editingItem.id}`, {
          name: data.name,
          description: data.description,
          categoryId: data.categoryId,
          location: data.location,
          dateFound: data.dateFound,
          status: data.status,
          imageUrl: data.imageUrl || undefined,
        });
      }
      return await apiRequest("POST", "/api/items", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/items"] });
      setIsFormOpen(false);
      setEditingItem(null);
      toast({
        title: editingItem ? "Item atualizado com sucesso!" : "Item cadastrado com sucesso!",
        description: editingItem ? "As alterações foram salvas." : "O item foi adicionado ao inventário.",
      });
    },
    onError: () => {
      toast({
        title: editingItem ? "Erro ao atualizar item" : "Erro ao cadastrar item",
        description: "Ocorreu um erro. Tente novamente.",
        variant: "destructive",
      });
    },
  });

  const deleteItemMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest("DELETE", `/api/items/${id}`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/items"] });
      setDeletingItem(null);
      toast({
        title: "Item excluído com sucesso!",
        description: "O item foi removido do inventário.",
      });
    },
    onError: () => {
      toast({
        title: "Erro ao excluir item",
        description: "Ocorreu um erro ao tentar excluir o item. Tente novamente.",
        variant: "destructive",
      });
    },
  });

  const markClaimedMutation = useMutation({
    mutationFn: async ({ itemId, claimedBy }: { itemId: string; claimedBy: string }) => {
      return await apiRequest("PATCH", `/api/items/${itemId}`, {
        status: "claimed",
        claimedBy,
        claimedDate: new Date().toISOString(),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/items"] });
      setClaimingItem(null);
      toast({
        title: "Item marcado como recuperado!",
        description: "O status do item foi atualizado.",
      });
    },
    onError: () => {
      toast({
        title: "Erro ao atualizar status",
        description: "Ocorreu um erro ao tentar atualizar o status do item. Tente novamente.",
        variant: "destructive",
      });
    },
  });

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === "all" || item.categoryId === selectedCategory;
    const matchesStatus = selectedStatus === "all" || item.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleItemClick = (item: Item) => {
    setSelectedItem(item);
    setIsDetailOpen(true);
  };

  const handleEdit = (item: Item) => {
    setEditingItem(item);
    setIsFormOpen(true);
  };

  const handleDelete = (item: Item) => {
    setDeletingItem(item);
  };

  const handleMarkClaimed = (item: Item) => {
    setClaimingItem(item);
  };

  const handleConfirmClaim = (claimedBy: string) => {
    if (claimingItem) {
      markClaimedMutation.mutate({ itemId: claimingItem.id, claimedBy });
    }
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingItem(null);
  };

  const isLoading = isLoadingItems || isLoadingCategories;

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-20 h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <img src={logoImg} alt="" className="w-8 h-8" />
            <h1 className="text-xl font-semibold">Achados e Perdidos</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={() => setIsFormOpen(true)}
              data-testid="button-add-item"
            >
              <Plus className="w-4 h-4 mr-2" />
              Cadastrar Item
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <SearchFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        categories={categories}
      />

      <main className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <ItemsGridSkeleton />
          ) : filteredItems.length === 0 ? (
            <EmptyState
              title={searchQuery || selectedCategory !== "all" || selectedStatus !== "all" 
                ? "Nenhum item encontrado"
                : "Nenhum item cadastrado"}
              description={searchQuery || selectedCategory !== "all" || selectedStatus !== "all"
                ? "Tente ajustar os filtros de busca para encontrar o que procura."
                : "Comece cadastrando o primeiro item perdido ou encontrado no sistema."}
              actionLabel={!searchQuery && selectedCategory === "all" && selectedStatus === "all" ? "Cadastrar Primeiro Item" : undefined}
              onAction={!searchQuery && selectedCategory === "all" && selectedStatus === "all" ? () => setIsFormOpen(true) : undefined}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map((item) => (
                <ItemCard
                  key={item.id}
                  item={item}
                  category={categories.find(c => c.id === item.categoryId)}
                  onClick={() => handleItemClick(item)}
                  onEdit={() => handleEdit(item)}
                  onDelete={() => handleDelete(item)}
                  onMarkClaimed={() => handleMarkClaimed(item)}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <ItemDetailDialog
        item={selectedItem}
        category={categories.find(c => c.id === selectedItem?.categoryId)}
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
      />

      <ItemFormDialog
        open={isFormOpen}
        onOpenChange={handleFormClose}
        onSubmit={(data) => createItemMutation.mutate(data)}
        categories={categories}
        isPending={createItemMutation.isPending}
        editingItem={editingItem}
      />

      <DeleteConfirmationDialog
        open={!!deletingItem}
        onOpenChange={(open) => !open && setDeletingItem(null)}
        onConfirm={() => deletingItem && deleteItemMutation.mutate(deletingItem.id)}
        itemName={deletingItem?.name || ""}
        isPending={deleteItemMutation.isPending}
      />

      <ClaimItemDialog
        open={!!claimingItem}
        onOpenChange={(open) => !open && setClaimingItem(null)}
        onConfirm={handleConfirmClaim}
        itemName={claimingItem?.name || ""}
        isPending={markClaimedMutation.isPending}
      />
    </div>
  );
}
