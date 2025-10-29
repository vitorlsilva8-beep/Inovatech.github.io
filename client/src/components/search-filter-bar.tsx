import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Category } from "@shared/schema";

interface SearchFilterBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  selectedStatus: string;
  onStatusChange: (value: string) => void;
  categories: Category[];
}

export function SearchFilterBar({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedStatus,
  onStatusChange,
  categories,
}: SearchFilterBarProps) {
  const hasActiveFilters = selectedCategory !== "all" || selectedStatus !== "all";

  const clearFilters = () => {
    onCategoryChange("all");
    onStatusChange("all");
  };

  return (
    <div className="sticky top-16 z-10 bg-background border-b py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar itens..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-9"
              data-testid="input-search"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Select value={selectedCategory} onValueChange={onCategoryChange}>
              <SelectTrigger className="w-[180px]" data-testid="select-category">
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas Categorias</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedStatus} onValueChange={onStatusChange}>
              <SelectTrigger className="w-[180px]" data-testid="select-status">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos Status</SelectItem>
                <SelectItem value="available">Disponível</SelectItem>
                <SelectItem value="claimed">Recuperado</SelectItem>
                <SelectItem value="pending">Pendente</SelectItem>
              </SelectContent>
            </Select>

            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                data-testid="button-clear-filters"
              >
                <X className="w-4 h-4 mr-1" />
                Limpar Filtros
              </Button>
            )}
          </div>
        </div>

        {hasActiveFilters && (
          <div className="flex gap-2 mt-3 flex-wrap">
            {selectedCategory !== "all" && (
              <Badge variant="secondary" className="gap-1">
                Categoria: {categories.find(c => c.id === selectedCategory)?.name}
                <button
                  onClick={() => onCategoryChange("all")}
                  className="ml-1 hover:text-foreground"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            )}
            {selectedStatus !== "all" && (
              <Badge variant="secondary" className="gap-1">
                Status: {selectedStatus === "available" ? "Disponível" : selectedStatus === "claimed" ? "Recuperado" : "Pendente"}
                <button
                  onClick={() => onStatusChange("all")}
                  className="ml-1 hover:text-foreground"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
