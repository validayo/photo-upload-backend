// Define Photo interface based on Firestore data model
export interface Photo {
  id: string;
  category: "PORTRAITS" | "EVENTS" | "WEDDINGS" | "EXTRAS";
  thumbUrl: string; // URL to thumbnail in Storage
  fullUrl: string;  // URL to full-size image in Storage
  uploadedAt: any; // FirebaseFirestore.Timestamp
  title?: string; // optional caption
}

// Define form data interface for contact form
export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  service: string;
  occasion: string;
  pinterestInspo?: string;
  add_ons: string[];
  date: string;
  time: string;
  timeframe?: string;
  instagram?: string;
  location?: string;
  referralSource?: string;
  questions?: string;
}

// Service options for the dropdown
export const serviceOptions = [
  "Wedding Photography",
  "Event Photography",
  "Portrait Session",
  "Corporate Event",
  "Family Session",
  "Engagement Session",
  "Other"
];

// Referral source options
export const referralOptions = [
  "Instagram",
  "Facebook",
  "Word of mouth",
  "Google",
  "Other"
];

// Admin credentials interface
export interface AdminCredentials {
  email: string;
  password: string;
}