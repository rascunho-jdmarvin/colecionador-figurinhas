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
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      album_players: {
        Row: {
          album_id: string
          club: string | null
          country: string
          created_at: string
          id: string
          image_url: string | null
          name: string
          nickname: string | null
          position: string
          rarity: Database["public"]["Enums"]["rarity_type"]
          rating: number
          sticker_number: number
        }
        Insert: {
          album_id: string
          club?: string | null
          country: string
          created_at?: string
          id?: string
          image_url?: string | null
          name: string
          nickname?: string | null
          position: string
          rarity?: Database["public"]["Enums"]["rarity_type"]
          rating?: number
          sticker_number: number
        }
        Update: {
          album_id?: string
          club?: string | null
          country?: string
          created_at?: string
          id?: string
          image_url?: string | null
          name?: string
          nickname?: string | null
          position?: string
          rarity?: Database["public"]["Enums"]["rarity_type"]
          rating?: number
          sticker_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "album_players_album_id_fkey"
            columns: ["album_id"]
            isOneToOne: false
            referencedRelation: "albums"
            referencedColumns: ["id"]
          },
        ]
      }
      albums: {
        Row: {
          cover_image_url: string | null
          created_at: string
          description: string | null
          id: string
          is_active: boolean
          name: string
          updated_at: string
        }
        Insert: {
          cover_image_url?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          name: string
          updated_at?: string
        }
        Update: {
          cover_image_url?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      daily_packs: {
        Row: {
          album_id: string
          cards_received: string[]
          created_at: string
          id: string
          opened_date: string
          user_id: string
        }
        Insert: {
          album_id: string
          cards_received?: string[]
          created_at?: string
          id?: string
          opened_date?: string
          user_id: string
        }
        Update: {
          album_id?: string
          cards_received?: string[]
          created_at?: string
          id?: string
          opened_date?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "daily_packs_album_id_fkey"
            columns: ["album_id"]
            isOneToOne: false
            referencedRelation: "albums"
            referencedColumns: ["id"]
          },
        ]
      }
      establishment_stickers: {
        Row: {
          album_id: string
          created_at: string
          description: string | null
          discount_text: string | null
          establishment_user_id: string
          id: string
          image_url: string | null
          is_active: boolean
          latitude: number
          longitude: number
          name: string
          nickname: string | null
          radius_meters: number
          updated_at: string
        }
        Insert: {
          album_id: string
          created_at?: string
          description?: string | null
          discount_text?: string | null
          establishment_user_id: string
          id?: string
          image_url?: string | null
          is_active?: boolean
          latitude: number
          longitude: number
          name: string
          nickname?: string | null
          radius_meters?: number
          updated_at?: string
        }
        Update: {
          album_id?: string
          created_at?: string
          description?: string | null
          discount_text?: string | null
          establishment_user_id?: string
          id?: string
          image_url?: string | null
          is_active?: boolean
          latitude?: number
          longitude?: number
          name?: string
          nickname?: string | null
          radius_meters?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "establishment_stickers_album_id_fkey"
            columns: ["album_id"]
            isOneToOne: false
            referencedRelation: "albums"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          display_name: string
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      quiz_attempts: {
        Row: {
          attempt_number: number
          created_at: string
          guessed_player_id: string | null
          id: string
          is_correct: boolean
          quiz_id: string
          user_id: string
        }
        Insert: {
          attempt_number?: number
          created_at?: string
          guessed_player_id?: string | null
          id?: string
          is_correct?: boolean
          quiz_id: string
          user_id: string
        }
        Update: {
          attempt_number?: number
          created_at?: string
          guessed_player_id?: string | null
          id?: string
          is_correct?: boolean
          quiz_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "quiz_attempts_guessed_player_id_fkey"
            columns: ["guessed_player_id"]
            isOneToOne: false
            referencedRelation: "album_players"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quiz_attempts_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "quiz_daily"
            referencedColumns: ["id"]
          },
        ]
      }
      quiz_daily: {
        Row: {
          album_player_id: string
          created_at: string
          hints: Json
          id: string
          quiz_date: string
        }
        Insert: {
          album_player_id: string
          created_at?: string
          hints?: Json
          id?: string
          quiz_date?: string
        }
        Update: {
          album_player_id?: string
          created_at?: string
          hints?: Json
          id?: string
          quiz_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "quiz_daily_album_player_id_fkey"
            columns: ["album_player_id"]
            isOneToOne: false
            referencedRelation: "album_players"
            referencedColumns: ["id"]
          },
        ]
      }
      trades: {
        Row: {
          created_at: string
          from_user_id: string
          id: string
          offered_player_id: string
          requested_player_id: string
          status: Database["public"]["Enums"]["trade_status"]
          to_user_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          from_user_id: string
          id?: string
          offered_player_id: string
          requested_player_id: string
          status?: Database["public"]["Enums"]["trade_status"]
          to_user_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          from_user_id?: string
          id?: string
          offered_player_id?: string
          requested_player_id?: string
          status?: Database["public"]["Enums"]["trade_status"]
          to_user_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "trades_offered_player_id_fkey"
            columns: ["offered_player_id"]
            isOneToOne: false
            referencedRelation: "album_players"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "trades_requested_player_id_fkey"
            columns: ["requested_player_id"]
            isOneToOne: false
            referencedRelation: "album_players"
            referencedColumns: ["id"]
          },
        ]
      }
      user_collections: {
        Row: {
          album_player_id: string
          collected_at: string
          id: string
          quantity: number
          user_id: string
        }
        Insert: {
          album_player_id: string
          collected_at?: string
          id?: string
          quantity?: number
          user_id: string
        }
        Update: {
          album_player_id?: string
          collected_at?: string
          id?: string
          quantity?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_collections_album_player_id_fkey"
            columns: ["album_player_id"]
            isOneToOne: false
            referencedRelation: "album_players"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "user" | "establishment" | "admin"
      rarity_type: "common" | "rare" | "legendary"
      trade_status: "pending" | "accepted" | "rejected" | "cancelled"
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
      app_role: ["user", "establishment", "admin"],
      rarity_type: ["common", "rare", "legendary"],
      trade_status: ["pending", "accepted", "rejected", "cancelled"],
    },
  },
} as const
