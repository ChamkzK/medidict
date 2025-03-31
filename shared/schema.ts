import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Medical Term Table
export const medicalTerms = pgTable("medical_terms", {
  id: serial("id").primaryKey(),
  term: text("term").notNull().unique(),
  definition: text("definition").notNull(),
  pronunciation: text("pronunciation"),
  type: text("type"),
  symptoms: text("symptoms").array(),
  relatedTerms: text("related_terms").array(),
});

// Search History Table for analytics (optional)
export const searchHistory = pgTable("search_history", {
  id: serial("id").primaryKey(),
  searchTerm: text("search_term").notNull(),
  timestamp: text("timestamp").notNull(),
  resultCount: integer("result_count").notNull(),
  ipAddress: text("ip_address"),
});

// Schema for inserting and updating terms
export const insertMedicalTermSchema = createInsertSchema(medicalTerms).omit({
  id: true,
});

export const insertSearchHistorySchema = createInsertSchema(searchHistory).omit({
  id: true,
});

// Types for use in application
export type MedicalTerm = typeof medicalTerms.$inferSelect;
export type InsertMedicalTerm = z.infer<typeof insertMedicalTermSchema>;
export type SearchHistory = typeof searchHistory.$inferSelect;
export type InsertSearchHistory = z.infer<typeof insertSearchHistorySchema>;

// Additional validation schemas
export const searchTermSchema = z.object({
  term: z.string().min(1, "Search term is required"),
});

// API response types
export type SearchResponse = {
  results: MedicalTerm[];
};

export type SuggestionResponse = {
  suggestions: string[];
};
