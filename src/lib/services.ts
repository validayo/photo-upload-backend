import { supabase } from "./supabase";
import { Photo, ContactFormData } from "../utils";

let photoCache: Photo[] = [];
let listeners: ((photos: Photo[]) => void)[] = [];

export const subscribeToPhotos = (callback: (photos: Photo[]) => void) => {
  listeners.push(callback);
  callback(photoCache);

  if (listeners.length === 1) {
    // Subscribe to realtime changes
    const subscription = supabase
      .channel("photos_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "photos",
        },
        async () => {
          const { data } = await supabase.from("photos").select("*").order("created_at", { ascending: false });

          if (data) {
            photoCache = data;
            listeners.forEach((listener) => listener(photoCache));
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
      listeners = listeners.filter((l) => l !== callback);
    };
  }

  return () => {
    listeners = listeners.filter((l) => l !== callback);
  };
};

export const fetchPhotos = async (category?: string): Promise<Photo[]> => {
  try {
    let query = supabase.from("photos").select("*").order("created_at", { ascending: false });

    if (category && category !== "ALL") {
      query = query.eq("category", category);
    }

    const { data, error } = await query;
    if (error) throw error;

    photoCache = data;
    return data;
  } catch (error) {
    console.error("Error fetching photos:", error);
    return [];
  }
};

export const submitContactForm = async (formData: ContactFormData): Promise<void> => {
  try {
    const { error } = await supabase.from("contact_submissions").insert([
      {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        service: formData.service,
        occasion: formData.occasion,
        pinterestInspo: formData.pinterestInspo,
        add_ons: formData.add_ons,
        date: formData.date,
        time: formData.time,
        instagram: formData.instagram,
        location: formData.location,
        referralSource: formData.referralSource,
        questions: formData.questions,
      },
    ]);

    if (error) throw error;

    // Trigger email notification via Edge Function
    await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/email-notifications`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "contact",
        data: formData,
      }),
    });
  } catch (error) {
    console.error("Error submitting contact form:", error);
    throw error;
  }
};

export const subscribeToNewsletter = async (email: string): Promise<void> => {
  try {
    const { error } = await supabase.from("newsletter_subscribers").insert([{ email }]);

    if (error) throw error;

    // Trigger email notification
    await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/email-notifications`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "newsletter",
        data: { email },
      }),
    });
  } catch (error) {
    console.error("Error subscribing to newsletter:", error);
    throw error;
  }
};

export const adminLogin = async ({ email, password }: { email: string; password: string }) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

export const adminLogout = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    console.error("Error during logout:", error);
    throw error;
  }
};
