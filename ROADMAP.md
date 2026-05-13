# CRM Nucleo Garbatella — Roadmap

## Stato al 13 maggio 2026 (notte)

### ✅ Completato

**Database**
- Schema GDPR-aware con RLS
- 2 categorie mutually exclusive: `elettori`, `iscritto_gn`
- Trigger auto-tag elettori su INSERT/UPDATE contatto (CAP → municipio territoriale)
- Trigger mutex tra elettori e iscritto_gn
- Seed CAP municipi VIII, IX, X (best-guess)

**Frontend**
- Auth magic link (Supabase + SMTP custom Resend)
- Lista /contatti con filtri/ricerca/paginazione + dettaglio
- Pagina /elettori con stats età-variabili e filtri territoriali
- Layout coerente con design system (Tailwind 4 + CSS inline per dettaglio)

**Infrastruttura**
- Deploy produzione Vercel
- SMTP custom via Resend su crm.nucleogarbatella.it
- Repository GitHub privato

### 🔜 Prossimi passi

**Priorità 1 — Endpoint pubblici di raccolta contatti**
- `/api/public/contatti` per form banchetto (nucleogarbatella.it/banchetto)
- `/api/public/campagne/colombo` per campagna "BASTA MORTI Colombo"
- Rate limiting + honeypot server-side
- Validazione GDPR su consenso

**Priorità 2 — Form pubblici sul sito Nucleo Garbatella**
- Form generico /banchetto (HTML pronto, costruito separatamente)
- Form campagna /campagne/colombo (HTML pronto, costruito separatamente)
- Collegamento al sito via dominio nucleogarbatella.it (migrazione da Vercel preview a dominio finale)

**Priorità 3 — Pagina /campagne nel CRM**
- Visualizzare risposte raccolte da campagne (Colombo per ora)
- Decisione: tabella dedicata `risposte_campagna` vs campo `note` JSON

**Priorità 4 — Pagina /iscritti GN**
- Clone di /elettori con filtro iscritto_gn
- Necessaria dopo import storico

**Priorità 5 — Import storico 600+ iscritti GN**
- Dato interno, migrabile in qualunque momento
- File xlsx da OneDrive
- Strumento: Claude Code locale + SERVICE_ROLE key

**Priorità 6 — Geocoding PostGIS (futuro)**
- Sostituire mappa CAP con confini reali dei municipi
- Necessario per volumi 5k+ contatti
- Sessione dedicata 2-3 ore

### 🗒️ Decisioni operative consolidate

- **Tag elettori** = auto via CAP territoriale (VIII/IX/X), non manuale
- **Tag iscritto_gn** = manuale, applicato al momento del tesseramento confermato
- **Promozione elettore → iscritto** = automatica (trigger mutex chiude elettori)
- **Degradazione iscritto → elettore** = manuale (caso raro, valutazione coordinatore)
- **Elettori contattati** via comunicazioni di massa (newsletter, eventi)
- **Iscritti GN contattati** via canali interni (WhatsApp gruppi, contatto diretto referente)

### 🚫 Trappole documentate

- Tailwind 4 fa i capricci con classi responsive avanzate (`sm:`, `lg:`, `divide-y`, `col-span-2`) → fallback CSS inline accettato
- CAP a Roma non corrispondono a municipi reali (confini passano a metà via) → trade-off temporaneo, geocoding PostGIS futuro
- Aruba "sottodomini": NON usare la sezione apposita, usare DNS records direttamente
- Aruba "Sostituisci Record MX" è pericoloso → usare "Aggiungi su sottodominio"
