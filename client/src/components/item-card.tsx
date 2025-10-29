import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { MapPin, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ItemActionsMenu } from "./item-actions-menu";
import type { Item, Category } from "@shared/schema";

interface ItemCardProps {
  item: Item;
  category?: Category;
  onClick: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onMarkClaimed: () => void;
}

export function ItemCard({ item, category, onClick, onEdit, onDelete, onMarkClaimed }: ItemCardProps) {
  const statusColors = {
    available: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    claimed: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
    pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
  };

  const statusLabels = {
    available: "Disponível",
    claimed: "Recuperado",
    pending: "Pendente",
  };

  return (
    <Card
      className="overflow-hidden hover-elevate active-elevate-2 cursor-pointer transition-colors duration-200"
      onClick={onClick}
      data-testid={`card-item-${item.id}`}
    >
      <div className="aspect-video w-full bg-muted relative overflow-hidden">
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <MapPin className="w-12 h-12 text-muted-foreground/40" />
          </div>
        )}
        <div className="absolute top-2 right-2 flex gap-2 items-start">
          <Badge
            className={statusColors[item.status as keyof typeof statusColors]}
            data-testid={`badge-status-${item.id}`}
          >
            {statusLabels[item.status as keyof typeof statusLabels]}
          </Badge>
        </div>
        <div className="absolute top-2 left-2">
          <ItemActionsMenu
            item={item}
            onEdit={onEdit}
            onDelete={onDelete}
            onMarkClaimed={onMarkClaimed}
          />
        </div>
      </div>
      <CardContent className="p-4 space-y-2">
        <h3 className="text-lg font-medium truncate" data-testid={`text-item-name-${item.id}`}>
          {item.name}
        </h3>
        {category && (
          <p className="text-xs text-muted-foreground">{category.name}</p>
        )}
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="w-3.5 h-3.5" />
          <span className="truncate">{item.location}</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Calendar className="w-3 h-3" />
          <span>
            Encontrado em {format(new Date(item.dateFound), "dd/MM/yyyy", { locale: ptBR })}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
