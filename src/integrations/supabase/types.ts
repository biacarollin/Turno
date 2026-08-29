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
      cargos: {
        Row: {
          cor: string
          created_at: string
          filial_id: string | null
          id: string
          nome: string
          updated_at: string
          user_id: string
        }
        Insert: {
          cor?: string
          created_at?: string
          filial_id?: string | null
          id?: string
          nome: string
          updated_at?: string
          user_id: string
        }
        Update: {
          cor?: string
          created_at?: string
          filial_id?: string | null
          id?: string
          nome?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cargos_filial_id_fkey"
            columns: ["filial_id"]
            isOneToOne: false
            referencedRelation: "filiais"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cargos_filial_id_fkey"
            columns: ["filial_id"]
            isOneToOne: false
            referencedRelation: "minhas_filiais"
            referencedColumns: ["id"]
          },
        ]
      }
      configuracoes_filial: {
        Row: {
          alerta_turno_nao_assumido: number
          antecedencia_minutos: number
          assinatura_obrigatoria: boolean
          conclusao_manual_gestor: boolean
          created_at: string
          email_diario: boolean
          filial_id: string
          fuso_horario: string
          herdar_pendencias: boolean
          id: string
          pos_limite_minutos: number
          push_app: boolean
          resumo_turno_ia: boolean
          sugestao_urgencia_ia: boolean
          updated_at: string
        }
        Insert: {
          alerta_turno_nao_assumido?: number
          antecedencia_minutos?: number
          assinatura_obrigatoria?: boolean
          conclusao_manual_gestor?: boolean
          created_at?: string
          email_diario?: boolean
          filial_id: string
          fuso_horario?: string
          herdar_pendencias?: boolean
          id?: string
          pos_limite_minutos?: number
          push_app?: boolean
          resumo_turno_ia?: boolean
          sugestao_urgencia_ia?: boolean
          updated_at?: string
        }
        Update: {
          alerta_turno_nao_assumido?: number
          antecedencia_minutos?: number
          assinatura_obrigatoria?: boolean
          conclusao_manual_gestor?: boolean
          created_at?: string
          email_diario?: boolean
          filial_id?: string
          fuso_horario?: string
          herdar_pendencias?: boolean
          id?: string
          pos_limite_minutos?: number
          push_app?: boolean
          resumo_turno_ia?: boolean
          sugestao_urgencia_ia?: boolean
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "configuracoes_filial_filial_id_fkey"
            columns: ["filial_id"]
            isOneToOne: true
            referencedRelation: "filiais"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "configuracoes_filial_filial_id_fkey"
            columns: ["filial_id"]
            isOneToOne: true
            referencedRelation: "minhas_filiais"
            referencedColumns: ["id"]
          },
        ]
      }
      equipes: {
        Row: {
          created_at: string
          filial_id: string
          id: string
          nome: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          filial_id: string
          id?: string
          nome: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          filial_id?: string
          id?: string
          nome?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "equipes_filial_id_fkey"
            columns: ["filial_id"]
            isOneToOne: false
            referencedRelation: "filiais"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "equipes_filial_id_fkey"
            columns: ["filial_id"]
            isOneToOne: false
            referencedRelation: "minhas_filiais"
            referencedColumns: ["id"]
          },
        ]
      }
      filiais: {
        Row: {
          codigo: string
          created_at: string
          id: string
          nome: string
          org_id: string
          segmento: string | null
          segmento_custom_nome: string | null
          segmento_topo: string | null
          updated_at: string
        }
        Insert: {
          codigo: string
          created_at?: string
          id?: string
          nome: string
          org_id: string
          segmento?: string | null
          segmento_custom_nome?: string | null
          segmento_topo?: string | null
          updated_at?: string
        }
        Update: {
          codigo?: string
          created_at?: string
          id?: string
          nome?: string
          org_id?: string
          segmento?: string | null
          segmento_custom_nome?: string | null
          segmento_topo?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "filiais_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "minha_sessao"
            referencedColumns: ["org_id"]
          },
          {
            foreignKeyName: "filiais_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizacoes"
            referencedColumns: ["id"]
          },
        ]
      }
      folgas: {
        Row: {
          created_at: string
          data_fim: string
          data_inicio: string
          filial_id: string | null
          id: string
          membro_id: string | null
          motivo: string | null
          status: string
          user_id: string
        }
        Insert: {
          created_at?: string
          data_fim: string
          data_inicio: string
          filial_id?: string | null
          id?: string
          membro_id?: string | null
          motivo?: string | null
          status?: string
          user_id: string
        }
        Update: {
          created_at?: string
          data_fim?: string
          data_inicio?: string
          filial_id?: string | null
          id?: string
          membro_id?: string | null
          motivo?: string | null
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "folgas_filial_id_fkey"
            columns: ["filial_id"]
            isOneToOne: false
            referencedRelation: "filiais"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "folgas_filial_id_fkey"
            columns: ["filial_id"]
            isOneToOne: false
            referencedRelation: "minhas_filiais"
            referencedColumns: ["id"]
          },
        ]
      }
      membros_equipe: {
        Row: {
          cargo_id: string | null
          created_at: string
          dispositivo: string
          equipe_id: string
          id: string
          turno_nome: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          cargo_id?: string | null
          created_at?: string
          dispositivo?: string
          equipe_id: string
          id?: string
          turno_nome?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          cargo_id?: string | null
          created_at?: string
          dispositivo?: string
          equipe_id?: string
          id?: string
          turno_nome?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "membros_equipe_equipe_id_fkey"
            columns: ["equipe_id"]
            isOneToOne: false
            referencedRelation: "equipes"
            referencedColumns: ["id"]
          },
        ]
      }
      membros_filial: {
        Row: {
          ativo: boolean
          created_at: string
          filial_id: string
          id: string
          papel: string
          user_id: string
        }
        Insert: {
          ativo?: boolean
          created_at?: string
          filial_id: string
          id?: string
          papel: string
          user_id: string
        }
        Update: {
          ativo?: boolean
          created_at?: string
          filial_id?: string
          id?: string
          papel?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "membros_filial_filial_id_fkey"
            columns: ["filial_id"]
            isOneToOne: false
            referencedRelation: "filiais"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "membros_filial_filial_id_fkey"
            columns: ["filial_id"]
            isOneToOne: false
            referencedRelation: "minhas_filiais"
            referencedColumns: ["id"]
          },
        ]
      }
      notas: {
        Row: {
          conteudo: string | null
          created_at: string
          destinatario_user_id: string | null
          filial_id: string | null
          id: string
          titulo: string
          updated_at: string
          user_id: string
        }
        Insert: {
          conteudo?: string | null
          created_at?: string
          destinatario_user_id?: string | null
          filial_id?: string | null
          id?: string
          titulo: string
          updated_at?: string
          user_id: string
        }
        Update: {
          conteudo?: string | null
          created_at?: string
          destinatario_user_id?: string | null
          filial_id?: string | null
          id?: string
          titulo?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notas_filial_id_fkey"
            columns: ["filial_id"]
            isOneToOne: false
            referencedRelation: "filiais"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notas_filial_id_fkey"
            columns: ["filial_id"]
            isOneToOne: false
            referencedRelation: "minhas_filiais"
            referencedColumns: ["id"]
          },
        ]
      }
      ocorrencias: {
        Row: {
          created_at: string
          criado_por: string | null
          descricao: string | null
          equipe_id: string | null
          gravidade: string
          id: string
          local: string | null
          status: string
          tipo: string | null
          titulo: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          criado_por?: string | null
          descricao?: string | null
          equipe_id?: string | null
          gravidade?: string
          id?: string
          local?: string | null
          status?: string
          tipo?: string | null
          titulo: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          criado_por?: string | null
          descricao?: string | null
          equipe_id?: string | null
          gravidade?: string
          id?: string
          local?: string | null
          status?: string
          tipo?: string | null
          titulo?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ocorrencias_equipe_id_fkey"
            columns: ["equipe_id"]
            isOneToOne: false
            referencedRelation: "equipes"
            referencedColumns: ["id"]
          },
        ]
      }
      organizacoes: {
        Row: {
          created_at: string
          id: string
          nome: string
        }
        Insert: {
          created_at?: string
          id?: string
          nome: string
        }
        Update: {
          created_at?: string
          id?: string
          nome?: string
        }
        Relationships: []
      }
      passagens_turno: {
        Row: {
          assinado_em: string | null
          assinado_por: string | null
          created_at: string
          data: string
          device_assinatura: string | null
          equipe_id: string | null
          hash_assinatura: string | null
          id: string
          ip_assinatura: string | null
          resumo: string | null
          turno_id: string | null
          user_id: string
        }
        Insert: {
          assinado_em?: string | null
          assinado_por?: string | null
          created_at?: string
          data: string
          device_assinatura?: string | null
          equipe_id?: string | null
          hash_assinatura?: string | null
          id?: string
          ip_assinatura?: string | null
          resumo?: string | null
          turno_id?: string | null
          user_id: string
        }
        Update: {
          assinado_em?: string | null
          assinado_por?: string | null
          created_at?: string
          data?: string
          device_assinatura?: string | null
          equipe_id?: string | null
          hash_assinatura?: string | null
          id?: string
          ip_assinatura?: string | null
          resumo?: string | null
          turno_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "passagens_turno_equipe_id_fkey"
            columns: ["equipe_id"]
            isOneToOne: false
            referencedRelation: "equipes"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          celular: string | null
          created_at: string
          email: string | null
          empresa_nome: string | null
          filial_ativa_id: string | null
          id: string
          nome_completo: string | null
          segmento: string | null
          segmento_custom_nome: string | null
          segmento_topo: string | null
          updated_at: string
          user_id: string
          username: string | null
        }
        Insert: {
          celular?: string | null
          created_at?: string
          email?: string | null
          empresa_nome?: string | null
          filial_ativa_id?: string | null
          id?: string
          nome_completo?: string | null
          segmento?: string | null
          segmento_custom_nome?: string | null
          segmento_topo?: string | null
          updated_at?: string
          user_id: string
          username?: string | null
        }
        Update: {
          celular?: string | null
          created_at?: string
          email?: string | null
          empresa_nome?: string | null
          filial_ativa_id?: string | null
          id?: string
          nome_completo?: string | null
          segmento?: string | null
          segmento_custom_nome?: string | null
          segmento_topo?: string | null
          updated_at?: string
          user_id?: string
          username?: string | null
        }
        Relationships: []
      }
      tipos_ocorrencia: {
        Row: {
          created_at: string
          filial_id: string | null
          gravidade_default: string
          id: string
          nome: string
          user_id: string
        }
        Insert: {
          created_at?: string
          filial_id?: string | null
          gravidade_default?: string
          id?: string
          nome: string
          user_id: string
        }
        Update: {
          created_at?: string
          filial_id?: string | null
          gravidade_default?: string
          id?: string
          nome?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tipos_ocorrencia_filial_id_fkey"
            columns: ["filial_id"]
            isOneToOne: false
            referencedRelation: "filiais"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tipos_ocorrencia_filial_id_fkey"
            columns: ["filial_id"]
            isOneToOne: false
            referencedRelation: "minhas_filiais"
            referencedColumns: ["id"]
          },
        ]
      }
      turnos: {
        Row: {
          antecedencia: number
          ativo: boolean
          cargos: string[]
          created_at: string
          equipe_id: string | null
          fim: string
          id: string
          inicio: string
          nome: string
          pos_limite: number
          updated_at: string
          user_id: string
        }
        Insert: {
          antecedencia?: number
          ativo?: boolean
          cargos?: string[]
          created_at?: string
          equipe_id?: string | null
          fim: string
          id?: string
          inicio: string
          nome: string
          pos_limite?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          antecedencia?: number
          ativo?: boolean
          cargos?: string[]
          created_at?: string
          equipe_id?: string | null
          fim?: string
          id?: string
          inicio?: string
          nome?: string
          pos_limite?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "turnos_equipe_id_fkey"
            columns: ["equipe_id"]
            isOneToOne: false
            referencedRelation: "equipes"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      minha_sessao: {
        Row: {
          email: string | null
          filial_ativa_id: string | null
          filial_codigo: string | null
          filial_nome: string | null
          meu_papel: string | null
          nome_completo: string | null
          org_id: string | null
          org_nome: string | null
          segmento: string | null
          segmento_topo: string | null
          user_id: string | null
          username: string | null
        }
        Relationships: []
      }
      minhas_filiais: {
        Row: {
          codigo: string | null
          id: string | null
          nome: string | null
          org_nome: string | null
          papel: string | null
          segmento_topo: string | null
        }
        Relationships: []
      }
      profiles_public: {
        Row: {
          nome_completo: string | null
          user_id: string | null
          username: string | null
        }
        Insert: {
          nome_completo?: string | null
          user_id?: string | null
          username?: string | null
        }
        Update: {
          nome_completo?: string | null
          user_id?: string | null
          username?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      criar_organizacao_filial: {
        Args: {
          p_empresa_nome: string
          p_segmento: string
          p_segmento_custom?: string
          p_segmento_topo: string
        }
        Returns: Json
      }
      filial_da_equipe: { Args: { p_equipe_id: string }; Returns: string }
      is_admin_filial: { Args: { p_filial_id: string }; Returns: boolean }
      is_gestor_ou_admin_filial: {
        Args: { p_filial_id: string }
        Returns: boolean
      }
      is_membro_equipe: { Args: { p_equipe_id: string }; Returns: boolean }
      trocar_filial: { Args: { p_filial_id: string }; Returns: undefined }
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
