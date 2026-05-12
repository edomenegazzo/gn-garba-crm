import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function AuthCodeError() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <div className="font-display font-black text-4xl text-red mb-4">
          Errore di accesso
        </div>
        <p className="text-ink-soft mb-8 leading-relaxed">
          Il link di accesso non è valido o è scaduto. I link hanno validità
          limitata per motivi di sicurezza. Richiedi un nuovo link dalla
          pagina di login.
        </p>
        <Link href="/login">
          <Button variant="primary" size="md">
            Torna al login
          </Button>
        </Link>
      </div>
    </div>
  );
}
