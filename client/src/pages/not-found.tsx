import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6 px-4">
        <h1 className="text-6xl font-semibold text-primary">404</h1>
        <h2 className="text-2xl font-semibold">Página não encontrada</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          A página que você está procurando não existe ou foi movida.
        </p>
        <Link href="/">
          <Button data-testid="button-home">
            <Home className="w-4 h-4 mr-2" />
            Voltar para o Início
          </Button>
        </Link>
      </div>
    </div>
  );
}
