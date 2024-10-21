import { supabase } from "~/server/db";
import { useQuery, useMutation } from "@tanstack/react-query";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { Tables, TablesUpdate } from "~/types/supabase";
import { TablesInsert } from "~/types/supabase";

//? Mostrar tareas
export const useTaskList = () => {
  return useQuery({
    queryKey: ["Talks"],
    queryFn: async () => {
      const res = await supabase.from("Talks").select("*");
      if (res.error) {
        return {
          data: null,
          error: res.error.message,
          code: 400,
        };
      }
      return {
        data: res.data as Tables<"Talks">[],
        error: null,
        code: 200,
      };
    },
  });
};

//? Mostrar por ID
export const useTask = (id: number) => {
  return useQuery({
    queryKey: ["Talks", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("Talks")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};

//? Crear tarea
//! Crear función para obtener el URI de la imagen con supabase.storage
export const useInsertTask = () => {
  return useMutation({
    async mutationFn({ data }: { data: TablesInsert<"Talks"> }) {
      // Luego insertamos los datos en la tabla "Talks"
      const res: PostgrestSingleResponse<{
        error: any;
        data: Tables<"Talks">;
      }> = await supabase
        .from("Talks")
        .insert({
          title: data.title,
          description: data.description,
          date: data.date,
          img_title: data.img_title,
          img_description: data.img_description,
          img_date: data.img_date,
        })
        .single();

      if (res.error) {
        return {
          error: res.error.message,
          code: 400,
          response: null,
        };
      }

      return {
        error: null,
        code: 200,
        response: res.data,
      };
    },
  });
};

//? Actualizar
export const useUpdateTask = () => {
  return useMutation({
    async mutationFn({
      data,
    }: {
      data: TablesUpdate<"Talks"> & { id: number };
    }) {
      const res: PostgrestSingleResponse<{
        error: any;
        data: Tables<"Talks">;
      }> = await supabase
        .from("Talks")
        .update({
          title: data.title,
          description: data.description,
          date: data.date,
          img_title: data.img_title,
          img_description: data.img_description,
          img_date: data.img_date,
        })
        .eq("id", data.id)
        .select()
        .single();
      if (res.error) {
        return {
          error: res.error.message,
          code: 400,
          response: null,
        };
      }

      return {
        error: null,
        code: 200,
        response: res.data,
      };
    },
  });
};

//? Eliminar
export const useDeleteTask = () => {
  return useMutation({
    async mutationFn(id: number) {
      const { error } = await supabase.from("Talks").delete().eq("id", id);

      if (error) {
        throw new Error(error.message);
      }
    },
  });
};
