import { supabase } from "~/server/db";
import { Tables } from "~/types/supabase";

export const useEvents = {
  getAllEvents: async () => {
    try {
      const {
        data: Events,
        error,
        status: CodeStatus,
      } = await supabase.from("Event").select("*");

      if (error) {
        return {
          data: null,
          error: error.message,
          code: CodeStatus,
        };
      }
      return {
        data: Events,
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
  getEvent: async (id: string) => {
    try {
      const {
        data,
        error,
        status: CodeStatus,
      } = await supabase.from("Events").select("*").match({ id: id });

      if (error) {
        return {
          data: null,
          error: error.message,
          code: CodeStatus,
        };
      }
      return {
        data: data as Tables<"Events">[],
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
  createNew: async (newData: Tables<"Events">) => {
    try {
      const { error, status: CodeStatus } = await supabase
        .from("Events")
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
        .from("Events")
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
