export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      audit_log: {
        Row: {
          campi_modificati: string[] | null
          dati_nuovi: Json | null
          dati_vecchi: Json | null
          eseguito_at: string
          eseguito_da: string | null
          id: number
          ip_address: unknown
          operazione: string
          record_id: string | null
          ruolo_eseguito: Database["public"]["Enums"]["ruolo_app_t"] | null
          tabella: string
          user_agent: string | null
        }
        Insert: {
          campi_modificati?: string[] | null
          dati_nuovi?: Json | null
          dati_vecchi?: Json | null
          eseguito_at?: string
          eseguito_da?: string | null
          id?: number
          ip_address?: unknown
          operazione: string
          record_id?: string | null
          ruolo_eseguito?: Database["public"]["Enums"]["ruolo_app_t"] | null
          tabella: string
          user_agent?: string | null
        }
        Update: {
          campi_modificati?: string[] | null
          dati_nuovi?: Json | null
          dati_vecchi?: Json | null
          eseguito_at?: string
          eseguito_da?: string | null
          id?: number
          ip_address?: unknown
          operazione?: string
          record_id?: string | null
          ruolo_eseguito?: Database["public"]["Enums"]["ruolo_app_t"] | null
          tabella?: string
          user_agent?: string | null
        }
        Relationships: []
      }
      categorie_contatto: {
        Row: {
          attiva: boolean
          categoria: Database["public"]["Enums"]["categoria_t"]
          contatto_id: string
          created_at: string
          created_by: string | null
          data_fine: string | null
          data_inizio: string
          id: string
          note: string | null
        }
        Insert: {
          attiva?: boolean
          categoria: Database["public"]["Enums"]["categoria_t"]
          contatto_id: string
          created_at?: string
          created_by?: string | null
          data_fine?: string | null
          data_inizio?: string
          id?: string
          note?: string | null
        }
        Update: {
          attiva?: boolean
          categoria?: Database["public"]["Enums"]["categoria_t"]
          contatto_id?: string
          created_at?: string
          created_by?: string | null
          data_fine?: string | null
          data_inizio?: string
          id?: string
          note?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "categorie_contatto_contatto_id_fkey"
            columns: ["contatto_id"]
            isOneToOne: false
            referencedRelation: "contatti"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "categorie_contatto_contatto_id_fkey"
            columns: ["contatto_id"]
            isOneToOne: false
            referencedRelation: "vw_contatti_completi"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "categorie_contatto_contatto_id_fkey"
            columns: ["contatto_id"]
            isOneToOne: false
            referencedRelation: "vw_da_richiamare"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "categorie_contatto_contatto_id_fkey"
            columns: ["contatto_id"]
            isOneToOne: false
            referencedRelation: "vw_documenti_in_scadenza"
            referencedColumns: ["contatto_id"]
          },
          {
            foreignKeyName: "categorie_contatto_contatto_id_fkey"
            columns: ["contatto_id"]
            isOneToOne: false
            referencedRelation: "vw_iscritti"
            referencedColumns: ["contatto_id"]
          },
          {
            foreignKeyName: "categorie_contatto_contatto_id_fkey"
            columns: ["contatto_id"]
            isOneToOne: false
            referencedRelation: "vw_militanti"
            referencedColumns: ["contatto_id"]
          },
          {
            foreignKeyName: "categorie_contatto_contatto_id_fkey"
            columns: ["contatto_id"]
            isOneToOne: false
            referencedRelation: "vw_richieste_tesseramento_aperte"
            referencedColumns: ["contatto_id"]
          },
        ]
      }
      contatti: {
        Row: {
          cap: string
          citta: string
          cognome: string
          consenso_comunicazioni: boolean
          consenso_comunicazioni_at: string | null
          consenso_privacy: boolean
          consenso_privacy_at: string | null
          created_at: string
          created_by: string | null
          data_acquisizione: string
          data_nascita: string
          email: string
          fonte: Database["public"]["Enums"]["fonte_contatto_t"]
          fonte_dettaglio: string | null
          id: string
          indirizzo_civico: string
          indirizzo_via: string
          municipio: Database["public"]["Enums"]["municipio_t"]
          municipio_override: boolean
          nome: string
          note: string | null
          provincia: string
          sesso: Database["public"]["Enums"]["sesso_t"] | null
          telefono: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          cap: string
          citta?: string
          cognome: string
          consenso_comunicazioni?: boolean
          consenso_comunicazioni_at?: string | null
          consenso_privacy?: boolean
          consenso_privacy_at?: string | null
          created_at?: string
          created_by?: string | null
          data_acquisizione?: string
          data_nascita: string
          email: string
          fonte: Database["public"]["Enums"]["fonte_contatto_t"]
          fonte_dettaglio?: string | null
          id?: string
          indirizzo_civico: string
          indirizzo_via: string
          municipio?: Database["public"]["Enums"]["municipio_t"]
          municipio_override?: boolean
          nome: string
          note?: string | null
          provincia?: string
          sesso?: Database["public"]["Enums"]["sesso_t"] | null
          telefono: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          cap?: string
          citta?: string
          cognome?: string
          consenso_comunicazioni?: boolean
          consenso_comunicazioni_at?: string | null
          consenso_privacy?: boolean
          consenso_privacy_at?: string | null
          created_at?: string
          created_by?: string | null
          data_acquisizione?: string
          data_nascita?: string
          email?: string
          fonte?: Database["public"]["Enums"]["fonte_contatto_t"]
          fonte_dettaglio?: string | null
          id?: string
          indirizzo_civico?: string
          indirizzo_via?: string
          municipio?: Database["public"]["Enums"]["municipio_t"]
          municipio_override?: boolean
          nome?: string
          note?: string | null
          provincia?: string
          sesso?: Database["public"]["Enums"]["sesso_t"] | null
          telefono?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      documenti_identita: {
        Row: {
          contatto_id: string
          created_at: string
          created_by: string | null
          data_rilascio: string | null
          data_scadenza: string
          ente_rilascio: string | null
          id: string
          note: string | null
          numero: string
          tipo: Database["public"]["Enums"]["tipo_documento_t"]
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          contatto_id: string
          created_at?: string
          created_by?: string | null
          data_rilascio?: string | null
          data_scadenza: string
          ente_rilascio?: string | null
          id?: string
          note?: string | null
          numero: string
          tipo: Database["public"]["Enums"]["tipo_documento_t"]
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          contatto_id?: string
          created_at?: string
          created_by?: string | null
          data_rilascio?: string | null
          data_scadenza?: string
          ente_rilascio?: string | null
          id?: string
          note?: string | null
          numero?: string
          tipo?: Database["public"]["Enums"]["tipo_documento_t"]
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "documenti_identita_contatto_id_fkey"
            columns: ["contatto_id"]
            isOneToOne: true
            referencedRelation: "contatti"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documenti_identita_contatto_id_fkey"
            columns: ["contatto_id"]
            isOneToOne: true
            referencedRelation: "vw_contatti_completi"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documenti_identita_contatto_id_fkey"
            columns: ["contatto_id"]
            isOneToOne: true
            referencedRelation: "vw_da_richiamare"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documenti_identita_contatto_id_fkey"
            columns: ["contatto_id"]
            isOneToOne: true
            referencedRelation: "vw_documenti_in_scadenza"
            referencedColumns: ["contatto_id"]
          },
          {
            foreignKeyName: "documenti_identita_contatto_id_fkey"
            columns: ["contatto_id"]
            isOneToOne: true
            referencedRelation: "vw_iscritti"
            referencedColumns: ["contatto_id"]
          },
          {
            foreignKeyName: "documenti_identita_contatto_id_fkey"
            columns: ["contatto_id"]
            isOneToOne: true
            referencedRelation: "vw_militanti"
            referencedColumns: ["contatto_id"]
          },
          {
            foreignKeyName: "documenti_identita_contatto_id_fkey"
            columns: ["contatto_id"]
            isOneToOne: true
            referencedRelation: "vw_richieste_tesseramento_aperte"
            referencedColumns: ["contatto_id"]
          },
        ]
      }
      interazioni: {
        Row: {
          contatto_id: string
          created_at: string
          created_by: string | null
          data: string
          esito: string | null
          id: string
          note: string | null
          oggetto: string | null
          tipo: Database["public"]["Enums"]["tipo_interazione_t"]
        }
        Insert: {
          contatto_id: string
          created_at?: string
          created_by?: string | null
          data?: string
          esito?: string | null
          id?: string
          note?: string | null
          oggetto?: string | null
          tipo: Database["public"]["Enums"]["tipo_interazione_t"]
        }
        Update: {
          contatto_id?: string
          created_at?: string
          created_by?: string | null
          data?: string
          esito?: string | null
          id?: string
          note?: string | null
          oggetto?: string | null
          tipo?: Database["public"]["Enums"]["tipo_interazione_t"]
        }
        Relationships: [
          {
            foreignKeyName: "interazioni_contatto_id_fkey"
            columns: ["contatto_id"]
            isOneToOne: false
            referencedRelation: "contatti"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "interazioni_contatto_id_fkey"
            columns: ["contatto_id"]
            isOneToOne: false
            referencedRelation: "vw_contatti_completi"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "interazioni_contatto_id_fkey"
            columns: ["contatto_id"]
            isOneToOne: false
            referencedRelation: "vw_da_richiamare"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "interazioni_contatto_id_fkey"
            columns: ["contatto_id"]
            isOneToOne: false
            referencedRelation: "vw_documenti_in_scadenza"
            referencedColumns: ["contatto_id"]
          },
          {
            foreignKeyName: "interazioni_contatto_id_fkey"
            columns: ["contatto_id"]
            isOneToOne: false
            referencedRelation: "vw_iscritti"
            referencedColumns: ["contatto_id"]
          },
          {
            foreignKeyName: "interazioni_contatto_id_fkey"
            columns: ["contatto_id"]
            isOneToOne: false
            referencedRelation: "vw_militanti"
            referencedColumns: ["contatto_id"]
          },
          {
            foreignKeyName: "interazioni_contatto_id_fkey"
            columns: ["contatto_id"]
            isOneToOne: false
            referencedRelation: "vw_richieste_tesseramento_aperte"
            referencedColumns: ["contatto_id"]
          },
        ]
      }
      mappa_cap_municipio: {
        Row: {
          ambiguo: boolean
          cap: string
          created_at: string
          municipio: Database["public"]["Enums"]["municipio_t"]
          note: string | null
          updated_at: string
          verificato_at: string | null
          verificato_da: string | null
          verificato_da_referente: boolean
          zone_principali: string | null
        }
        Insert: {
          ambiguo?: boolean
          cap: string
          created_at?: string
          municipio: Database["public"]["Enums"]["municipio_t"]
          note?: string | null
          updated_at?: string
          verificato_at?: string | null
          verificato_da?: string | null
          verificato_da_referente?: boolean
          zone_principali?: string | null
        }
        Update: {
          ambiguo?: boolean
          cap?: string
          created_at?: string
          municipio?: Database["public"]["Enums"]["municipio_t"]
          note?: string | null
          updated_at?: string
          verificato_at?: string | null
          verificato_da?: string | null
          verificato_da_referente?: boolean
          zone_principali?: string | null
        }
        Relationships: []
      }
      profili_utenti: {
        Row: {
          attivo: boolean
          created_at: string
          id: string
          nome_visualizzato: string | null
          ruolo: Database["public"]["Enums"]["ruolo_app_t"]
          updated_at: string
        }
        Insert: {
          attivo?: boolean
          created_at?: string
          id: string
          nome_visualizzato?: string | null
          ruolo?: Database["public"]["Enums"]["ruolo_app_t"]
          updated_at?: string
        }
        Update: {
          attivo?: boolean
          created_at?: string
          id?: string
          nome_visualizzato?: string | null
          ruolo?: Database["public"]["Enums"]["ruolo_app_t"]
          updated_at?: string
        }
        Relationships: []
      }
      schede_iscritto_gn: {
        Row: {
          anno_tesseramento: number | null
          ateneo: string | null
          contatto_id: string
          created_at: string
          created_by: string | null
          data_invio_nazionale: string | null
          data_iscrizione: string | null
          data_scadenza: string | null
          dati_inviati_nazionale: Json | null
          id: string
          note: string | null
          numero_tessera: string | null
          scuola: string | null
          stato_richiesta: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          anno_tesseramento?: number | null
          ateneo?: string | null
          contatto_id: string
          created_at?: string
          created_by?: string | null
          data_invio_nazionale?: string | null
          data_iscrizione?: string | null
          data_scadenza?: string | null
          dati_inviati_nazionale?: Json | null
          id?: string
          note?: string | null
          numero_tessera?: string | null
          scuola?: string | null
          stato_richiesta?: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          anno_tesseramento?: number | null
          ateneo?: string | null
          contatto_id?: string
          created_at?: string
          created_by?: string | null
          data_invio_nazionale?: string | null
          data_iscrizione?: string | null
          data_scadenza?: string | null
          dati_inviati_nazionale?: Json | null
          id?: string
          note?: string | null
          numero_tessera?: string | null
          scuola?: string | null
          stato_richiesta?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "schede_iscritto_gn_contatto_id_fkey"
            columns: ["contatto_id"]
            isOneToOne: true
            referencedRelation: "contatti"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "schede_iscritto_gn_contatto_id_fkey"
            columns: ["contatto_id"]
            isOneToOne: true
            referencedRelation: "vw_contatti_completi"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "schede_iscritto_gn_contatto_id_fkey"
            columns: ["contatto_id"]
            isOneToOne: true
            referencedRelation: "vw_da_richiamare"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "schede_iscritto_gn_contatto_id_fkey"
            columns: ["contatto_id"]
            isOneToOne: true
            referencedRelation: "vw_documenti_in_scadenza"
            referencedColumns: ["contatto_id"]
          },
          {
            foreignKeyName: "schede_iscritto_gn_contatto_id_fkey"
            columns: ["contatto_id"]
            isOneToOne: true
            referencedRelation: "vw_iscritti"
            referencedColumns: ["contatto_id"]
          },
          {
            foreignKeyName: "schede_iscritto_gn_contatto_id_fkey"
            columns: ["contatto_id"]
            isOneToOne: true
            referencedRelation: "vw_militanti"
            referencedColumns: ["contatto_id"]
          },
          {
            foreignKeyName: "schede_iscritto_gn_contatto_id_fkey"
            columns: ["contatto_id"]
            isOneToOne: true
            referencedRelation: "vw_richieste_tesseramento_aperte"
            referencedColumns: ["contatto_id"]
          },
        ]
      }
      schede_militante: {
        Row: {
          area_competenza: string | null
          attivo: boolean
          contatto_id: string
          created_at: string
          created_by: string | null
          data_ingresso: string
          disponibile_banchetti: boolean
          disponibile_eventi: boolean
          disponibile_seggi: boolean
          disponibile_volantinaggio: boolean
          formazione_fatta: string[] | null
          id: string
          note: string | null
          ruolo_interno: string | null
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          area_competenza?: string | null
          attivo?: boolean
          contatto_id: string
          created_at?: string
          created_by?: string | null
          data_ingresso?: string
          disponibile_banchetti?: boolean
          disponibile_eventi?: boolean
          disponibile_seggi?: boolean
          disponibile_volantinaggio?: boolean
          formazione_fatta?: string[] | null
          id?: string
          note?: string | null
          ruolo_interno?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          area_competenza?: string | null
          attivo?: boolean
          contatto_id?: string
          created_at?: string
          created_by?: string | null
          data_ingresso?: string
          disponibile_banchetti?: boolean
          disponibile_eventi?: boolean
          disponibile_seggi?: boolean
          disponibile_volantinaggio?: boolean
          formazione_fatta?: string[] | null
          id?: string
          note?: string | null
          ruolo_interno?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "schede_militante_contatto_id_fkey"
            columns: ["contatto_id"]
            isOneToOne: true
            referencedRelation: "contatti"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "schede_militante_contatto_id_fkey"
            columns: ["contatto_id"]
            isOneToOne: true
            referencedRelation: "vw_contatti_completi"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "schede_militante_contatto_id_fkey"
            columns: ["contatto_id"]
            isOneToOne: true
            referencedRelation: "vw_da_richiamare"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "schede_militante_contatto_id_fkey"
            columns: ["contatto_id"]
            isOneToOne: true
            referencedRelation: "vw_documenti_in_scadenza"
            referencedColumns: ["contatto_id"]
          },
          {
            foreignKeyName: "schede_militante_contatto_id_fkey"
            columns: ["contatto_id"]
            isOneToOne: true
            referencedRelation: "vw_iscritti"
            referencedColumns: ["contatto_id"]
          },
          {
            foreignKeyName: "schede_militante_contatto_id_fkey"
            columns: ["contatto_id"]
            isOneToOne: true
            referencedRelation: "vw_militanti"
            referencedColumns: ["contatto_id"]
          },
          {
            foreignKeyName: "schede_militante_contatto_id_fkey"
            columns: ["contatto_id"]
            isOneToOne: true
            referencedRelation: "vw_richieste_tesseramento_aperte"
            referencedColumns: ["contatto_id"]
          },
        ]
      }
    }
    Views: {
      vw_audit_recente: {
        Row: {
          campi_modificati: string[] | null
          dati_nuovi: Json | null
          dati_vecchi: Json | null
          eseguito_at: string | null
          eseguito_da: string | null
          eseguito_da_nome: string | null
          id: number | null
          operazione: string | null
          record_id: string | null
          ruolo_eseguito: Database["public"]["Enums"]["ruolo_app_t"] | null
          tabella: string | null
        }
        Relationships: []
      }
      vw_contatti_completi: {
        Row: {
          cap: string | null
          categorie_attive: Database["public"]["Enums"]["categoria_t"][] | null
          citta: string | null
          cognome: string | null
          consenso_comunicazioni: boolean | null
          consenso_comunicazioni_at: string | null
          consenso_privacy: boolean | null
          consenso_privacy_at: string | null
          created_at: string | null
          created_by: string | null
          data_acquisizione: string | null
          data_nascita: string | null
          email: string | null
          fonte: Database["public"]["Enums"]["fonte_contatto_t"] | null
          fonte_dettaglio: string | null
          ha_documento: boolean | null
          ha_scheda_iscritto: boolean | null
          ha_scheda_militante: boolean | null
          id: string | null
          indirizzo_civico: string | null
          indirizzo_via: string | null
          municipio: Database["public"]["Enums"]["municipio_t"] | null
          municipio_override: boolean | null
          nome: string | null
          note: string | null
          numero_interazioni: number | null
          provincia: string | null
          sesso: Database["public"]["Enums"]["sesso_t"] | null
          telefono: string | null
          ultima_interazione_at: string | null
          ultima_interazione_tipo:
            | Database["public"]["Enums"]["tipo_interazione_t"]
            | null
          updated_at: string | null
          updated_by: string | null
        }
        Relationships: []
      }
      vw_da_richiamare: {
        Row: {
          categorie: Database["public"]["Enums"]["categoria_t"][] | null
          cognome: string | null
          data_acquisizione: string | null
          email: string | null
          fonte: Database["public"]["Enums"]["fonte_contatto_t"] | null
          giorni_inattivita: number | null
          id: string | null
          municipio: Database["public"]["Enums"]["municipio_t"] | null
          nome: string | null
          telefono: string | null
          ultima_interazione: string | null
        }
        Relationships: []
      }
      vw_documenti_in_scadenza: {
        Row: {
          cognome: string | null
          contatto_id: string | null
          data_scadenza: string | null
          email: string | null
          giorni_alla_scadenza: number | null
          nome: string | null
          numero: string | null
          stato_alert: string | null
          telefono: string | null
          tipo_documento: Database["public"]["Enums"]["tipo_documento_t"] | null
        }
        Relationships: []
      }
      vw_iscritti: {
        Row: {
          anno_tesseramento: number | null
          ateneo: string | null
          cap: string | null
          cognome: string | null
          contatto_id: string | null
          data_invio_nazionale: string | null
          data_iscrizione: string | null
          data_nascita: string | null
          data_scadenza: string | null
          email: string | null
          iscritto_creato_at: string | null
          municipio: Database["public"]["Enums"]["municipio_t"] | null
          nome: string | null
          note_iscritto: string | null
          numero_tessera: string | null
          scheda_id: string | null
          scuola: string | null
          sesso: Database["public"]["Enums"]["sesso_t"] | null
          stato_richiesta: string | null
          telefono: string | null
        }
        Relationships: []
      }
      vw_militanti: {
        Row: {
          area_competenza: string | null
          cognome: string | null
          contatto_id: string | null
          data_ingresso: string | null
          disponibile_banchetti: boolean | null
          disponibile_eventi: boolean | null
          disponibile_seggi: boolean | null
          disponibile_volantinaggio: boolean | null
          email: string | null
          formazione_fatta: string[] | null
          giorni_da_ingresso: number | null
          municipio: Database["public"]["Enums"]["municipio_t"] | null
          nome: string | null
          note_militante: string | null
          ruolo_interno: string | null
          scheda_id: string | null
          telefono: string | null
        }
        Relationships: []
      }
      vw_richieste_tesseramento_aperte: {
        Row: {
          ateneo: string | null
          cognome: string | null
          contatto_id: string | null
          data_invio_nazionale: string | null
          data_nascita: string | null
          email: string | null
          giorni_in_attesa: number | null
          municipio: Database["public"]["Enums"]["municipio_t"] | null
          nome: string | null
          richiesta_creata_at: string | null
          scheda_id: string | null
          scuola: string | null
          stato_richiesta: string | null
          telefono: string | null
        }
        Relationships: []
      }
      vw_stats_fonte: {
        Row: {
          fonte: Database["public"]["Enums"]["fonte_contatto_t"] | null
          totale: number | null
          ultimi_30_giorni: number | null
          ultimi_7_giorni: number | null
          ultimi_90_giorni: number | null
        }
        Relationships: []
      }
      vw_stats_mensili: {
        Row: {
          da_banchetto: number | null
          da_evento: number | null
          da_form_online: number | null
          da_sito: number | null
          mese: string | null
          municipio_ix: number | null
          municipio_viii: number | null
          municipio_x: number | null
          nuovi_contatti: number | null
        }
        Relationships: []
      }
      vw_stats_municipio: {
        Row: {
          con_consenso_comunicazioni: number | null
          iscritti_gn: number | null
          militanti: number | null
          municipio: Database["public"]["Enums"]["municipio_t"] | null
          nuovi_ultimi_30gg: number | null
          simpatizzanti_fdi: number | null
          simpatizzanti_gn: number | null
          totale_contatti: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      cap_to_municipio: {
        Args: { p_cap: string }
        Returns: Database["public"]["Enums"]["municipio_t"]
      }
      is_admin: { Args: never; Returns: boolean }
      is_coordinamento_or_above: { Args: never; Returns: boolean }
      is_user_or_above: { Args: never; Returns: boolean }
      my_ruolo: {
        Args: never
        Returns: Database["public"]["Enums"]["ruolo_app_t"]
      }
    }
    Enums: {
      categoria_t:
        | "simpatizzante_fdi"
        | "simpatizzante_gn"
        | "richiesta_iscrizione_gn"
        | "iscritto_gn"
        | "militante"
        | "dirigente_gn"
        | "iscritto_fdi"
      fonte_contatto_t:
        | "banchetto"
        | "form_online"
        | "sito_web"
        | "evento"
        | "social"
        | "passaparola"
        | "contatto_diretto"
        | "import_storico"
        | "altro"
      municipio_t:
        | "VIII"
        | "IX"
        | "X"
        | "altro_roma"
        | "fuori_roma"
        | "da_classificare"
      ruolo_app_t: "banchetto" | "user" | "coordinamento" | "admin"
      sesso_t: "M" | "F"
      tipo_documento_t: "carta_identita" | "patente" | "passaporto"
      tipo_interazione_t:
        | "telefonata"
        | "email"
        | "whatsapp"
        | "incontro"
        | "evento_partecipato"
        | "banchetto_incontrato"
        | "volantinaggio"
        | "comunicazione_inviata"
        | "altro"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      categoria_t: [
        "simpatizzante_fdi",
        "simpatizzante_gn",
        "richiesta_iscrizione_gn",
        "iscritto_gn",
        "militante",
        "dirigente_gn",
        "iscritto_fdi",
      ],
      fonte_contatto_t: [
        "banchetto",
        "form_online",
        "sito_web",
        "evento",
        "social",
        "passaparola",
        "contatto_diretto",
        "import_storico",
        "altro",
      ],
      municipio_t: [
        "VIII",
        "IX",
        "X",
        "altro_roma",
        "fuori_roma",
        "da_classificare",
      ],
      ruolo_app_t: ["banchetto", "user", "coordinamento", "admin"],
      sesso_t: ["M", "F"],
      tipo_documento_t: ["carta_identita", "patente", "passaporto"],
      tipo_interazione_t: [
        "telefonata",
        "email",
        "whatsapp",
        "incontro",
        "evento_partecipato",
        "banchetto_incontrato",
        "volantinaggio",
        "comunicazione_inviata",
        "altro",
      ],
    },
  },
} as const
