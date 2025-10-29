import { Button } from "@/components/ui/button";
import emptyStateImg from "@assets/generated_images/Empty_state_illustration_6678d013.png";

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center" data-testid="empty-state">
      <img src={emptyStateImg} alt="" className="w-32 h-32 mb-6 opacity-40" />
      <h3 className="text-lg font-medium mt-4">{title}</h3>
      <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button onClick={onAction} className="mt-6" data-testid="button-empty-action">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
