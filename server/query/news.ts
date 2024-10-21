import { supabase } from "~/server/db";
import { Tables } from "~/types/supabase";

export const useNews = {
  getAllNews: async () => {
    try {
      const {
        data: News,
        error,
        status: CodeStatus,
      } = await supabase.from("News").select("*");

      if (error) {
        return {
          data: null,
          error: error.message,
          code: CodeStatus,
        };
      }
      return {
        data: News as Tables<"News">[],
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
  getNew: async (id: string) => {
    try {
      const {
        data,
        error,
        status: CodeStatus,
      } = await supabase.from("News").select("*").match({ id: id });

      if (error) {
        return {
          data: null,
          error: error.message,
          code: CodeStatus,
        };
      }
      return {
        data: data as Tables<"News">[],
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
  createNew: async (newData: Tables<"News">) => {
    try {
      const { error, status: CodeStatus } = await supabase
        .from("News")
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
        .from("News")
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
