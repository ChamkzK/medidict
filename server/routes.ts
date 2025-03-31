import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { searchTermSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // API Routes (prefix with /api)
  
  // Search for medical terms
  app.get("/api/search", async (req: Request, res: Response) => {
    try {
      const { term } = req.query;
      
      // Validate the search term
      const result = searchTermSchema.safeParse({ term });
      
      if (!result.success) {
        const validationError = fromZodError(result.error);
        return res.status(400).json({ 
          message: validationError.message,
          error: "VALIDATION_ERROR" 
        });
      }
      
      const searchTerm = term as string;
      const results = await storage.searchMedicalTerms(searchTerm);
      
      // Record the search for analytics (optional)
      const timestamp = new Date().toISOString();
      await storage.recordSearch({
        searchTerm,
        timestamp,
        resultCount: results.length,
        ipAddress: req.ip
      });
      
      return res.json({ results });
    } catch (error) {
      console.error("Search error:", error);
      return res.status(500).json({ 
        message: "An error occurred while searching for medical terms",
        error: "SERVER_ERROR"
      });
    }
  });

  // Get search suggestions
  app.get("/api/suggestions", async (req: Request, res: Response) => {
    try {
      const { term, limit } = req.query;
      
      if (!term || typeof term !== "string") {
        return res.status(400).json({ 
          message: "Search term is required",
          error: "VALIDATION_ERROR" 
        });
      }
      
      const limitNum = limit ? parseInt(limit as string, 10) : 5;
      const suggestions = await storage.getSuggestions(term, limitNum);
      
      return res.json({ suggestions });
    } catch (error) {
      console.error("Suggestions error:", error);
      return res.status(500).json({ 
        message: "An error occurred while fetching suggestions",
        error: "SERVER_ERROR"
      });
    }
  });

  // Get specific term by name
  app.get("/api/term", async (req: Request, res: Response) => {
    try {
      const { name } = req.query;
      
      if (!name || typeof name !== "string") {
        return res.status(400).json({ 
          message: "Term name is required",
          error: "VALIDATION_ERROR" 
        });
      }
      
      const term = await storage.getMedicalTermByName(name);
      
      if (!term) {
        return res.status(404).json({ 
          message: "Term not found",
          error: "NOT_FOUND" 
        });
      }
      
      return res.json(term);
    } catch (error) {
      console.error("Get term error:", error);
      return res.status(500).json({ 
        message: "An error occurred while retrieving the term",
        error: "SERVER_ERROR"
      });
    }
  });

  // Word of the Day (random term)
  app.get("/api/word-of-day", async (_req: Request, res: Response) => {
    try {
      const randomTerm = await storage.getRandomTerm();
      
      if (!randomTerm) {
        return res.status(404).json({ 
          message: "No terms available",
          error: "NOT_FOUND" 
        });
      }
      
      return res.json(randomTerm);
    } catch (error) {
      console.error("Word of the day error:", error);
      return res.status(500).json({ 
        message: "An error occurred while retrieving word of the day",
        error: "SERVER_ERROR"
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
