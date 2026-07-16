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
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      course_sections: {
        Row: {
          content_hash: string
          content_revision: number
          course_id: string
          display_order: number
          id: string
          publication_status: Database["public"]["Enums"]["publication_status"]
          title: string
          updated_at: string
        }
        Insert: {
          content_hash: string
          content_revision?: number
          course_id: string
          display_order: number
          id: string
          publication_status?: Database["public"]["Enums"]["publication_status"]
          title: string
          updated_at?: string
        }
        Update: {
          content_hash?: string
          content_revision?: number
          course_id?: string
          display_order?: number
          id?: string
          publication_status?: Database["public"]["Enums"]["publication_status"]
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_sections_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      course_units: {
        Row: {
          content_hash: string
          content_revision: number
          description: string | null
          display_order: number
          id: string
          publication_status: Database["public"]["Enums"]["publication_status"]
          section_id: string
          title: string
          updated_at: string
        }
        Insert: {
          content_hash: string
          content_revision?: number
          description?: string | null
          display_order: number
          id: string
          publication_status?: Database["public"]["Enums"]["publication_status"]
          section_id: string
          title: string
          updated_at?: string
        }
        Update: {
          content_hash?: string
          content_revision?: number
          description?: string | null
          display_order?: number
          id?: string
          publication_status?: Database["public"]["Enums"]["publication_status"]
          section_id?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_units_section_id_fkey"
            columns: ["section_id"]
            isOneToOne: false
            referencedRelation: "course_sections"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          content_hash: string
          content_revision: number
          deprecated_at: string | null
          description: string | null
          id: string
          publication_status: Database["public"]["Enums"]["publication_status"]
          title: string
          updated_at: string
        }
        Insert: {
          content_hash: string
          content_revision?: number
          deprecated_at?: string | null
          description?: string | null
          id: string
          publication_status?: Database["public"]["Enums"]["publication_status"]
          title: string
          updated_at?: string
        }
        Update: {
          content_hash?: string
          content_revision?: number
          deprecated_at?: string | null
          description?: string | null
          id?: string
          publication_status?: Database["public"]["Enums"]["publication_status"]
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      diagnostic_results: {
        Row: {
          created_at: string
          domain_scores: Json
          global_score: number
          id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          domain_scores: Json
          global_score: number
          id?: string
          user_id: string
        }
        Update: {
          created_at?: string
          domain_scores?: Json
          global_score?: number
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      enrollments: {
        Row: {
          course_id: string
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          course_id: string
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          course_id?: string
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "enrollments_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      lesson_attempts: {
        Row: {
          completion_key: string | null
          current_step: number
          id: string
          lesson_id: string
          score: number | null
          status: string
          updated_at: string
          user_id: string
          xp_awarded: number
        }
        Insert: {
          completion_key?: string | null
          current_step?: number
          id?: string
          lesson_id: string
          score?: number | null
          status?: string
          updated_at?: string
          user_id: string
          xp_awarded?: number
        }
        Update: {
          completion_key?: string | null
          current_step?: number
          id?: string
          lesson_id?: string
          score?: number | null
          status?: string
          updated_at?: string
          user_id?: string
          xp_awarded?: number
        }
        Relationships: [
          {
            foreignKeyName: "lesson_attempts_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      lesson_steps: {
        Row: {
          content: Json
          content_hash: string
          content_revision: number
          display_order: number
          id: string
          lesson_id: string
          publication_status: Database["public"]["Enums"]["publication_status"]
          step_key: string
          step_type: string
          updated_at: string
        }
        Insert: {
          content?: Json
          content_hash: string
          content_revision?: number
          display_order: number
          id: string
          lesson_id: string
          publication_status?: Database["public"]["Enums"]["publication_status"]
          step_key: string
          step_type: string
          updated_at?: string
        }
        Update: {
          content?: Json
          content_hash?: string
          content_revision?: number
          display_order?: number
          id?: string
          lesson_id?: string
          publication_status?: Database["public"]["Enums"]["publication_status"]
          step_key?: string
          step_type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "lesson_steps_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      lessons: {
        Row: {
          app_id: string
          content_hash: string
          content_revision: number
          display_order: number
          duration_minutes: number
          id: string
          objective: string | null
          publication_status: Database["public"]["Enums"]["publication_status"]
          title: string
          unit_id: string
          updated_at: string
        }
        Insert: {
          app_id: string
          content_hash: string
          content_revision?: number
          display_order: number
          duration_minutes?: number
          id: string
          objective?: string | null
          publication_status?: Database["public"]["Enums"]["publication_status"]
          title: string
          unit_id: string
          updated_at?: string
        }
        Update: {
          app_id?: string
          content_hash?: string
          content_revision?: number
          display_order?: number
          duration_minutes?: number
          id?: string
          objective?: string | null
          publication_status?: Database["public"]["Enums"]["publication_status"]
          title?: string
          unit_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "lessons_unit_id_fkey"
            columns: ["unit_id"]
            isOneToOne: false
            referencedRelation: "course_units"
            referencedColumns: ["id"]
          },
        ]
      }
      open_responses: {
        Row: {
          first_version: string
          id: string
          idempotency_key: string | null
          revised_version: string | null
          status: Database["public"]["Enums"]["open_response_status"]
          step_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          first_version?: string
          id?: string
          idempotency_key?: string | null
          revised_version?: string | null
          status?: Database["public"]["Enums"]["open_response_status"]
          step_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          first_version?: string
          id?: string
          idempotency_key?: string | null
          revised_version?: string | null
          status?: Database["public"]["Enums"]["open_response_status"]
          step_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "open_responses_step_id_fkey"
            columns: ["step_id"]
            isOneToOne: false
            referencedRelation: "lesson_steps"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          available_days: string[]
          created_at: string
          current_job: string | null
          daily_minutes: number
          declared_level: string | null
          email: string
          first_name: string
          id: string
          last_name: string
          onboarding_completed: boolean
          professional_goal: string | null
          speech_rate: number
          theme: string
          updated_at: string
          voice_enabled: boolean
        }
        Insert: {
          available_days?: string[]
          created_at?: string
          current_job?: string | null
          daily_minutes?: number
          declared_level?: string | null
          email: string
          first_name?: string
          id: string
          last_name?: string
          onboarding_completed?: boolean
          professional_goal?: string | null
          speech_rate?: number
          theme?: string
          updated_at?: string
          voice_enabled?: boolean
        }
        Update: {
          available_days?: string[]
          created_at?: string
          current_job?: string | null
          daily_minutes?: number
          declared_level?: string | null
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          onboarding_completed?: boolean
          professional_goal?: string | null
          speech_rate?: number
          theme?: string
          updated_at?: string
          voice_enabled?: boolean
        }
        Relationships: []
      }
      question_choices: {
        Row: {
          display_order: number
          id: string
          label: string
          publication_status: Database["public"]["Enums"]["publication_status"]
          question_id: string
          value: string
        }
        Insert: {
          display_order: number
          id: string
          label: string
          publication_status?: Database["public"]["Enums"]["publication_status"]
          question_id: string
          value: string
        }
        Update: {
          display_order?: number
          id?: string
          label?: string
          publication_status?: Database["public"]["Enums"]["publication_status"]
          question_id?: string
          value?: string
        }
        Relationships: [
          {
            foreignKeyName: "question_choices_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
        ]
      }
      questions: {
        Row: {
          app_id: string | null
          correct_answer: Json | null
          domain: string | null
          feedback_correct: string | null
          feedback_incorrect: string | null
          id: string
          lesson_step_id: string | null
          prompt: string
          publication_status: Database["public"]["Enums"]["publication_status"]
          question_type: string
          updated_at: string
        }
        Insert: {
          app_id?: string | null
          correct_answer?: Json | null
          domain?: string | null
          feedback_correct?: string | null
          feedback_incorrect?: string | null
          id: string
          lesson_step_id?: string | null
          prompt: string
          publication_status?: Database["public"]["Enums"]["publication_status"]
          question_type: string
          updated_at?: string
        }
        Update: {
          app_id?: string | null
          correct_answer?: Json | null
          domain?: string | null
          feedback_correct?: string | null
          feedback_incorrect?: string | null
          id?: string
          lesson_step_id?: string | null
          prompt?: string
          publication_status?: Database["public"]["Enums"]["publication_status"]
          question_type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "questions_lesson_step_id_fkey"
            columns: ["lesson_step_id"]
            isOneToOne: false
            referencedRelation: "lesson_steps"
            referencedColumns: ["id"]
          },
        ]
      }
      rpc_idempotency: {
        Row: {
          created_at: string
          idempotency_key: string
          operation: string
          user_id: string
        }
        Insert: {
          created_at?: string
          idempotency_key: string
          operation: string
          user_id: string
        }
        Update: {
          created_at?: string
          idempotency_key?: string
          operation?: string
          user_id?: string
        }
        Relationships: []
      }
      self_assessments: {
        Row: {
          created_at: string
          criteria: Json
          id: string
          open_response_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          criteria: Json
          id?: string
          open_response_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          criteria?: Json
          id?: string
          open_response_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "self_assessments_open_response_id_fkey"
            columns: ["open_response_id"]
            isOneToOne: false
            referencedRelation: "open_responses"
            referencedColumns: ["id"]
          },
        ]
      }
      step_attempts: {
        Row: {
          answer: Json | null
          created_at: string
          id: string
          idempotency_key: string
          is_correct: boolean | null
          lesson_attempt_id: string
          step_id: string
          user_id: string
        }
        Insert: {
          answer?: Json | null
          created_at?: string
          id?: string
          idempotency_key: string
          is_correct?: boolean | null
          lesson_attempt_id: string
          step_id: string
          user_id: string
        }
        Update: {
          answer?: Json | null
          created_at?: string
          id?: string
          idempotency_key?: string
          is_correct?: boolean | null
          lesson_attempt_id?: string
          step_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "step_attempts_lesson_attempt_id_fkey"
            columns: ["lesson_attempt_id"]
            isOneToOne: false
            referencedRelation: "lesson_attempts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "step_attempts_step_id_fkey"
            columns: ["step_id"]
            isOneToOne: false
            referencedRelation: "lesson_steps"
            referencedColumns: ["id"]
          },
        ]
      }
      user_daily_activity: {
        Row: {
          activity_date: string
          id: string
          minutes: number
          user_id: string
          xp: number
        }
        Insert: {
          activity_date?: string
          id?: string
          minutes?: number
          user_id: string
          xp?: number
        }
        Update: {
          activity_date?: string
          id?: string
          minutes?: number
          user_id?: string
          xp?: number
        }
        Relationships: []
      }
      user_gamification: {
        Row: {
          best_streak: number
          current_streak: number
          hearts: number
          last_active_date: string | null
          updated_at: string
          user_id: string
          xp: number
        }
        Insert: {
          best_streak?: number
          current_streak?: number
          hearts?: number
          last_active_date?: string | null
          updated_at?: string
          user_id: string
          xp?: number
        }
        Update: {
          best_streak?: number
          current_streak?: number
          hearts?: number
          last_active_date?: string | null
          updated_at?: string
          user_id?: string
          xp?: number
        }
        Relationships: []
      }
      user_unit_progress: {
        Row: {
          id: string
          progress: number
          status: string
          unit_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          id?: string
          progress?: number
          status?: string
          unit_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          id?: string
          progress?: number
          status?: string
          unit_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_unit_progress_unit_id_fkey"
            columns: ["unit_id"]
            isOneToOne: false
            referencedRelation: "course_units"
            referencedColumns: ["id"]
          },
        ]
      }
      user_vocabulary_progress: {
        Row: {
          id: string
          last_reviewed_at: string | null
          level: number
          term_id: string
          user_id: string
        }
        Insert: {
          id?: string
          last_reviewed_at?: string | null
          level?: number
          term_id: string
          user_id: string
        }
        Update: {
          id?: string
          last_reviewed_at?: string | null
          level?: number
          term_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_vocabulary_progress_term_id_fkey"
            columns: ["term_id"]
            isOneToOne: false
            referencedRelation: "vocabulary_terms"
            referencedColumns: ["id"]
          },
        ]
      }
      vocabulary_terms: {
        Row: {
          definition: string | null
          example: string | null
          id: string
          language: string
          pronunciation: string | null
          publication_status: Database["public"]["Enums"]["publication_status"]
          term: string
          translation: string
          updated_at: string
        }
        Insert: {
          definition?: string | null
          example?: string | null
          id: string
          language: string
          pronunciation?: string | null
          publication_status?: Database["public"]["Enums"]["publication_status"]
          term: string
          translation: string
          updated_at?: string
        }
        Update: {
          definition?: string | null
          example?: string | null
          id?: string
          language?: string
          pronunciation?: string | null
          publication_status?: Database["public"]["Enums"]["publication_status"]
          term?: string
          translation?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      complete_lesson: {
        Args: { p_idempotency_key: string; p_lesson_id: string }
        Returns: Json
      }
      ensure_jangat_profile: { Args: never; Returns: Json }
      finalize_diagnostic: { Args: { p_answers: Json }; Returns: Json }
      record_step_attempt: {
        Args: {
          p_answer: Json
          p_idempotency_key: string
          p_lesson_id: string
          p_step_key: string
        }
        Returns: Json
      }
      recover_heart_from_review: {
        Args: { p_idempotency_key: string }
        Returns: Json
      }
      unlock_next_unit: {
        Args: { p_completed_lesson_id: string }
        Returns: Json
      }
      update_daily_activity: {
        Args: { p_minutes?: number; p_xp?: number }
        Returns: {
          best_streak: number
          current_streak: number
          hearts: number
          last_active_date: string | null
          updated_at: string
          user_id: string
          xp: number
        }
        SetofOptions: {
          from: "*"
          to: "user_gamification"
          isOneToOne: true
          isSetofReturn: false
        }
      }
    }
    Enums: {
      open_response_status: "draft" | "submitted" | "self_reviewed" | "revised"
      publication_status: "draft" | "published" | "deprecated"
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
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      open_response_status: ["draft", "submitted", "self_reviewed", "revised"],
      publication_status: ["draft", "published", "deprecated"],
    },
  },
} as const
