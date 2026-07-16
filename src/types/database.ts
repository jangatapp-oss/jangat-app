export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];
export type Database = {
  public: {
    Tables: {
      profiles: { Row: { id:string;first_name:string;email:string;professional_goal:string|null;declared_level:string|null;daily_minutes:number;voice_enabled:boolean;speech_rate:number;theme:string;onboarding_completed:boolean }; Insert: Record<string,unknown>; Update: Record<string,unknown> };
      enrollments: { Row: {id:string;user_id:string;course_id:string}; Insert: Record<string,unknown>; Update:Record<string,unknown> };
      diagnostic_results: { Row: {id:string;user_id:string;global_score:number;domain_scores:Json}; Insert:Record<string,unknown>; Update:Record<string,unknown> };
      lesson_attempts: { Row: {id:string;user_id:string;lesson_id:string;status:string;current_step:number;xp_awarded:number}; Insert:Record<string,unknown>; Update:Record<string,unknown> };
      user_gamification: { Row: {user_id:string;xp:number;current_streak:number;best_streak:number;hearts:number;last_active_date:string|null}; Insert:Record<string,unknown>; Update:Record<string,unknown> };
      user_unit_progress: { Row:{id:string;user_id:string;unit_id:string;status:string;progress:number}; Insert:Record<string,unknown>; Update:Record<string,unknown> };
      open_responses: { Row:{id:string;user_id:string;step_id:string;first_version:string;revised_version:string|null;status:string;idempotency_key:string|null}; Insert:Record<string,unknown>; Update:Record<string,unknown> };
    };
    Views: Record<string,never>;
    Functions: {
      ensure_jangat_profile: { Args: Record<string,never>; Returns: Json };
      finalize_diagnostic: { Args:{p_answers:Json}; Returns:Json };
      record_step_attempt: { Args:{p_lesson_id:string;p_step_key:string;p_answer:Json;p_idempotency_key:string}; Returns:Json };
      complete_lesson: { Args:{p_lesson_id:string;p_idempotency_key:string}; Returns:Json };
      recover_heart_from_review: { Args:{p_idempotency_key:string}; Returns:Json };
    };
    Enums: Record<string,never>;
    CompositeTypes: Record<string,never>;
  };
};
