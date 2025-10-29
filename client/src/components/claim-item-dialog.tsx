import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ClaimItemDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (claimedBy: string) => void;
  itemName: string;
  isPending: boolean;
}

const formSchema = z.object({
  claimedBy: z.string().min(1, "Nome é obrigatório"),
});

export function ClaimItemDialog({
  open,
  onOpenChange,
  onConfirm,
  itemName,
  isPending,
}: ClaimItemDialogProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      claimedBy: "",
    },
  });

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    onConfirm(data.claimedBy);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent data-testid="dialog-claim-item">
        <DialogHeader>
          <DialogTitle>Marcar como Recuperado</DialogTitle>
          <DialogDescription>
            Registre quem está recuperando o item <strong>{itemName}</strong>.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 mt-4">
            <FormField
              control={form.control}
              name="claimedBy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Responsável *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: João Silva"
                      {...field}
                      data-testid="input-claimed-by"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isPending}
                data-testid="button-cancel-claim"
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isPending} data-testid="button-confirm-claim">
                {isPending ? "Salvando..." : "Confirmar Recuperação"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
