import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { MapPin, Calendar, User, Package } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { Item, Category } from "@shared/schema";

interface ItemDetailDialogProps {
  item: Item | null;
  category?: Category;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ItemDetailDialog({
  item,
  category,
  open,
  onOpenChange,
}: ItemDetailDialogProps) {
  if (!item) return null;

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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" data-testid="dialog-item-detail">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">{item.name}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
          <div className="space-y-4">
            {item.imageUrl ? (
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full rounded-lg object-cover aspect-video"
              />
            ) : (
              <div className="w-full aspect-video bg-muted rounded-lg flex items-center justify-center">
                <Package className="w-20 h-20 text-muted-foreground/40" />
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <Badge className={statusColors[item.status as keyof typeof statusColors]}>
                {statusLabels[item.status as keyof typeof statusLabels]}
              </Badge>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Descrição</h3>
              <p className="text-base">{item.description}</p>
            </div>

            <Separator />

            <div className="space-y-3">
              {category && (
                <div className="flex items-start gap-3">
                  <Package className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Categoria</p>
                    <p className="text-sm text-muted-foreground">{category.name}</p>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Local Encontrado</p>
                  <p className="text-sm text-muted-foreground">{item.location}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Data Encontrado</p>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(item.dateFound), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                  </p>
                </div>
              </div>

              {item.claimedBy && item.claimedDate && (
                <>
                  <Separator />
                  <div className="flex items-start gap-3">
                    <User className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Recuperado por</p>
                      <p className="text-sm text-muted-foreground">{item.claimedBy}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {format(new Date(item.claimedDate), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
