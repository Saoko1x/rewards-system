import { supabase } from "~/server/db";
import { Tables } from "~/types/supabase";

export const usePromotions = {
  getAllPromotions: async () => {
    try {
      const {
        data: Promotions,
        error,
        status: CodeStatus,
      } = await supabase.from("Promotions").select("*");

      if (error) {
        return {
          data: null,
          error: error.message,
          code: CodeStatus,
        };
      }
      return {
        data: Promotions as Tables<"Promotions">[],
        error: null,
        code: CodeStatus,
      };
    } catch (error) {
      return {
        data: null,
        error: "Error with database connection",
        code: 500,
      };
    }
  },
  getPromotion: async (id: string) => {
    try {
      const {
        data,
        error,
        status: CodeStatus,
      } = await supabase.from("Promotions").select("*").match({ id: id });

      if (error) {
        return {
          data: null,
          error: error.message,
          code: CodeStatus,
        };
      }
      return {
        data: data as Tables<"Promotions">[],
        error: null,
        code: CodeStatus,
      };
    } catch (error) {
      return {
        data: null,
        error: "Error with database connection",
        code: 500,
      };
    }
  },
  createNew: async (newData: Tables<"Promotions">) => {
    try {
      const { error, status: CodeStatus } = await supabase
        .from("Promotions")
        .insert([newData]);

      if (error) {
        return {
          data: null,
          error: error.message,
          code: CodeStatus,
        };
      }
      return {
        data: newData,
        error: null,
        code: CodeStatus,
      };
    } catch (error) {
      return {
        data: null,
        error: "Error with database connection",
        code: 500,
      };
    }
  },
  deleteNew: async (id: string) => {
    try {
      const { error, status: CodeStatus } = await supabase
        .from("Promotions")
        .delete()
        .match({ id: id });

      if (error) {
        return {
          error: error.message,
          code: CodeStatus,
          result: null,
        };
      }
      return {
        error: null,
        code: CodeStatus,
        result: {
          deleted: true,
          id: id,
        },
      };
    } catch (error) {
      return {
        error: "Error with database connection",
        code: 500,
        result: null,
      };
    }
  },
};
