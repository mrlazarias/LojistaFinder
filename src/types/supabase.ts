export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      lojistas: {
        Row: {
          id: string;
          nome_loja: string;
          link: string;
          plataforma: string;
          categoria: string;
          data_extracao: string;
        };
        Insert: {
          id?: string;
          nome_loja: string;
          link: string;
          plataforma: string;
          categoria: string;
          data_extracao: string;
        };
        Update: {
          id?: string;
          nome_loja?: string;
          link?: string;
          plataforma?: string;
          categoria?: string;
          data_extracao?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
