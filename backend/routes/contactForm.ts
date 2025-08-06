import express from "express";
import { supabase } from "../utils/supabaseServer.js";
import { sendContactEmail } from "../utils/email.js";

const router = express.Router();

// POST: Handle contact form submission
router.post("/", async (req, res) => {
  try {
    const formData = req.body;

    const { error } = await supabase.from("contact_submissions").insert([formData]);

    if (error) throw error;

    await sendContactEmail(formData);

    res.json({ message: "Form submitted successfully" });
  } catch (err: any) {
    console.error("❌ Error submitting form:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// ✅ NEW: GET /contacts for AdminPage
router.get("/contacts", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    res.json(data);
  } catch (err: any) {
    console.error("❌ Error fetching contacts:", err.message);
    res.status(500).json({ error: err.message });
  }
});

export default router;