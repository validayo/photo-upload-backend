import { createClient } from "@supabase/supabase-js";
import { Photo } from "../utils";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const uploadPhoto = async (file: File, category: string, title?: string, onProgress?: (progress: number) => void): Promise<Photo> => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("category", category);
    if (title) formData.append("title", title);

    const response = await fetch(`${supabaseUrl}/functions/v1/storage`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${supabaseAnonKey}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to upload photo");
    }

    return await response.json();
  } catch (error) {
    console.error("Error uploading photo:", error);
    throw error;
  }
};

export const getPhotos = async (category?: string) => {
  try {
    let query = supabase.from("photos").select("*").order("created_at", { ascending: false });

    if (category && category !== "ALL") {
      query = query.eq("category", category);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching photos:", error);
    return [];
  }
};
