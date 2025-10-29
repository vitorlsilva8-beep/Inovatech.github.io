import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCategorySchema, insertItemSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/categories", async (req, res) => {
    try {
      const categories = await storage.getAllCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar categorias" });
    }
  });

  app.post("/api/categories", async (req, res) => {
    try {
      const data = insertCategorySchema.parse(req.body);
      const category = await storage.createCategory(data);
      res.status(201).json(category);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Dados inválidos", errors: error.errors });
      } else {
        res.status(500).json({ message: "Erro ao criar categoria" });
      }
    }
  });

  app.get("/api/items", async (req, res) => {
    try {
      const items = await storage.getAllItems();
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar itens" });
    }
  });

  app.get("/api/items/:id", async (req, res) => {
    try {
      const item = await storage.getItem(req.params.id);
      if (!item) {
        res.status(404).json({ message: "Item não encontrado" });
        return;
      }
      res.json(item);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar item" });
    }
  });

  app.post("/api/items", async (req, res) => {
    try {
      const data = insertItemSchema.parse(req.body);
      const item = await storage.createItem(data);
      res.status(201).json(item);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Dados inválidos", errors: error.errors });
      } else {
        res.status(500).json({ message: "Erro ao criar item" });
      }
    }
  });

  app.patch("/api/items/:id", async (req, res) => {
    try {
      const updateSchema = z.object({
        name: z.string().min(1).optional(),
        description: z.string().min(1).optional(),
        categoryId: z.string().optional(),
        location: z.string().min(1).optional(),
        status: z.enum(["available", "claimed", "pending"]).optional(),
        imageUrl: z.string().optional(),
        claimedBy: z.string().optional(),
        dateFound: z.string().refine((val) => !isNaN(Date.parse(val)), {
          message: "Data inválida",
        }).optional(),
        claimedDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
          message: "Data inválida",
        }).optional(),
      });
      
      const data = updateSchema.parse(req.body);
      
      const updates: any = {};
      if (data.name !== undefined) updates.name = data.name;
      if (data.description !== undefined) updates.description = data.description;
      if (data.categoryId !== undefined) updates.categoryId = data.categoryId;
      if (data.location !== undefined) updates.location = data.location;
      if (data.status !== undefined) updates.status = data.status;
      if (data.imageUrl !== undefined) {
        updates.imageUrl = data.imageUrl === "" ? null : data.imageUrl;
      }
      if (data.claimedBy !== undefined) {
        updates.claimedBy = data.claimedBy === "" ? null : data.claimedBy;
      }
      if (data.dateFound !== undefined) {
        const parsedDate = new Date(data.dateFound);
        if (isNaN(parsedDate.getTime())) {
          res.status(400).json({ message: "Data encontrada inválida" });
          return;
        }
        updates.dateFound = parsedDate;
      }
      if (data.claimedDate !== undefined) {
        const parsedDate = new Date(data.claimedDate);
        if (isNaN(parsedDate.getTime())) {
          res.status(400).json({ message: "Data de recuperação inválida" });
          return;
        }
        updates.claimedDate = parsedDate;
      }

      const item = await storage.updateItem(req.params.id, updates);
      if (!item) {
        res.status(404).json({ message: "Item não encontrado" });
        return;
      }
      res.json(item);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Dados inválidos", errors: error.errors });
      } else {
        res.status(500).json({ message: "Erro ao atualizar item" });
      }
    }
  });

  app.delete("/api/items/:id", async (req, res) => {
    try {
      const success = await storage.deleteItem(req.params.id);
      if (!success) {
        res.status(404).json({ message: "Item não encontrado" });
        return;
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Erro ao deletar item" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
