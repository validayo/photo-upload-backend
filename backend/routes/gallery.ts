import express from 'express';
import { createClient } from '@supabase/supabase-js';

const router = express.Router();
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase.from('photos').select('*');
    if (error) throw error;

    const images = data.map((img) => {
      const thumb = supabase.storage.from('photos').getPublicUrl(`thumbnails/${img.category}/${img.thumb_url.split('/').pop()}`).data.publicUrl;
      const full = supabase.storage.from('photos').getPublicUrl(`fullsize/${img.category}/${img.full_url.split('/').pop()}`).data.publicUrl;
      return { thumb, full, category: img.category, title: img.title };
    });

    res.json(images);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;