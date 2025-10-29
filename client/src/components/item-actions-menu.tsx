import { MoreVertical, Edit, Trash2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import type { Item } from "@shared/schema";

interface ItemActionsMenuProps {
  item: Item;
  onEdit: () => void;
  onDelete: () => void;
  onMarkClaimed: () => void;
}

export function ItemActionsMenu({ item, onEdit, onDelete, onMarkClaimed }: ItemActionsMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => e.stopPropagation()}
          data-testid={`button-actions-${item.id}`}
        >
          <MoreVertical className="w-4 h-4" />
          <span className="sr-only">Ações</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onEdit(); }} data-testid="menu-edit">
          <Edit className="w-4 h-4 mr-2" />
          Editar
        </DropdownMenuItem>
        {item.status === "available" && (
          <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onMarkClaimed(); }} data-testid="menu-claim">
            <Check className="w-4 h-4 mr-2" />
            Marcar como Recuperado
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={(e) => { e.stopPropagation(); onDelete(); }}
          className="text-destructive focus:text-destructive"
          data-testid="menu-delete"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Excluir
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
