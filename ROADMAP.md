# CRM Nucleo Garbatella — Roadmap & Decisioni di Progetto

Documento di lavoro per tracciare decisioni architetturali, modello dati e prossimi step di sviluppo. Aggiornare a ogni sessione.

## Stato corrente (12 maggio 2026, ore 22)

### Già fatto
- Backend Supabase completo: schema, RLS, audit log, viste (Blocchi 1-4)
- Auth: magic link Supabase, RLS-aware, sidebar utente con logout
- Pagina `/contatti`: lista con ricerca, filtri (municipio/fonte/categoria), paginazione, tabella stile editoriale
- Pagina `/contatti/[id]`: dettaglio scheda con info anagrafica, residenza, schede, consensi GDPR
- Deploy Vercel: app live su https://gn-garba-crm.vercel.app
- Estensione schema (Blocco 5): campi `referente_id`, `referente_nome_originale`, indirizzo tesseramento separato in `schede_iscritto_gn`
- Sidebar: voce "Militanti" rinominata in "Elettori" con icona urna (route /elettori)

### Da fare nelle prossime sessioni

#### Priorita' 1 — Import 437 iscritti GN
- File xlsx da OneDrive (in attesa permessi download corretti)
- Strumento: Claude Code locale, dati restano sul Mac
- Logica:
  - Tutti import come `iscritto_gn`
  - Consenso privacy = false (Da regolarizzare)
  - Fonte = import_storico
  - Detectare "Via Guendalina Borghese 8" come tesseramento fittizio (indirizzo sede sezione)
  - Popolare `referente_nome_originale` dalla colonna B (militante che ha portato)
  - Stato tessera = "da_verificare"
- Mappa CAP IX/X ancora da popolare (Edoardo deve chiedere lista ufficiale al referente nucleo)

#### Priorita' 2 — Modello tag (DECISIONE PRESA, da implementare)
Sistema di tag manuali (NON dedotti automaticamente). Ogni contatto puo' avere:
- Tag `elettori` -> finisce in pagina /elettori
- Tag `iscritto_gn` -> finisce in pagina /iscritti

I due tag sono mutuamente esclusivi. Un contatto non puo' avere entrambi:
- Se un elettore diventa iscritto GN, perde tag elettori e acquisisce iscritto_gn
- Esistenza del tag iscritto_gn implica anche la creazione della scheda_iscritto_gn

Eliminare dallo schema le categorie esistenti inutili:
- simpatizzante_fdi, simpatizzante_gn (non piu' necessarie nel modello semplificato)
- richiesta_iscrizione_gn (gestita diversamente)
- iscritto_fdi, militante, dirigente_gn (DA DISCUTERE: mantenere o no?)

#### Priorita' 3 — Pagina /elettori
Filtri pagina:
- Tag elettori (implicito, sempre presente)
- Municipio: default VIII/IX/X, espandibile
- Eta': input data riferimento + toggle Tutti/Maggiorenni/Minorenni
- Fonte di acquisizione

Filtro municipio applicato come AND con tag (interpretazione Q): anche se per errore taggi un fuori-zona come elettore, NON appare in /elettori senza municipio territoriale.

#### Priorita' 4 — Sistema verifica indirizzi (modello "ibrido pragmatico")
Problema: i CAP a Roma non corrispondono ai municipi (confini di municipio passano a meta' via).

Soluzione:
- Inserimenti automatici (form pubblici) -> CAP usato come best guess + flag `municipio_da_verificare=true` per casi ambigui (CAP a confine noti)
- In `/contatti` aggiungere sezione "Da verificare" che mostra solo i flaggati
- Coordinatore controlla 1-by-1, click su nome -> apre Google Maps della via+civico -> conferma o corregge
- In futuro (5k+ contatti) passare a PostGIS + GeoJSON Roma Capitale

#### Priorita' 5 — Form pubblici
Due form distinti:
1. G-form campagna specifica: Google Forms con webhook che invia dati a Supabase. Tag applicato in base al form (es. campagna "vieni alla festa" -> tag elettori). Da configurare per ogni campagna.
2. Banchetto digitale: PWA proprietaria offline-first per tablet/telefono in piazza. Form veloce 6-8 campi, sincronizza quando torna online. Tag elettori applicato automaticamente.

#### Priorita' 6 — Pagina /iscritti
Lista pre-filtrata con tag iscritto_gn, scheda iscritto completa, gestione stato tessera (attiva/scaduta/da_rinnovare).

#### Priorita' 7 — Pagina Nuovi Iscritti GN
Vista filtrata su /iscritti: solo iscritti negli ultimi 30 giorni, per attenzione operativa (chiamata di benvenuto, integrazione nelle attivita').

## Decisioni architetturali aperte (DA DISCUTERE)

### D1 — Tag automatici vs manuali
DECISIONE: manuali. I tag elettori/iscritto_gn si applicano via UI, non sono dedotti dal sistema.

### D2 — Categorie residue
Mantenere `militante`, `dirigente_gn` per uso futuro? O eliminare tutto e lasciare solo elettori + iscritto_gn?
PROPENSIONE: vedere se serviranno in futuro per gestire la struttura interna del nucleo (chi e' coordinatore, chi e' responsabile area, ecc.)

### D3 — Confini di municipio
Stasera: CAP + flag manuale (ibrido pragmatico)
Futuro: PostGIS + dati Roma Capitale quando contatti > 3000

### D4 — Form proprietario o G-form
Per la fase MVP, G-form via webhook e' piu' veloce da implementare (1 ora di setup vs 4-6 ore form proprietario). Decidere caso per caso.

## Note operative

- Repo: https://github.com/edomenegazzo/gn-garba-crm
- Prod: https://gn-garba-crm.vercel.app
- Supabase project: jzqnmppgmfmobegltsbh (region Frankfurt)
- Stack: Next.js 16, Supabase, Tailwind 4, Vercel
- Dev locale: porta 3100

## Cronologia sessioni

### 12 maggio 2026 — Sessione 4
- Pagine contatti (lista + dettaglio) operative
- Deploy Vercel produzione
- Discussione modello tag elettori/iscritti
- Decisione: fermarsi per ripensare bene il modello dati
- Sidebar: Militanti -> Elettori (rinomina cosmetica, pagina /elettori ancora da costruire)

