import { type User, type InsertUser, type Category, type InsertCategory, type Item, type InsertItem } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getAllCategories(): Promise<Category[]>;
  getCategory(id: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  
  getAllItems(): Promise<Item[]>;
  getItem(id: string): Promise<Item | undefined>;
  createItem(item: InsertItem): Promise<Item>;
  updateItem(id: string, item: Partial<Item>): Promise<Item | undefined>;
  deleteItem(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private categories: Map<string, Category>;
  private items: Map<string, Item>;

  constructor() {
    this.users = new Map();
    this.categories = new Map();
    this.items = new Map();
    
    this.seedData();
  }

  private seedData() {
    const categories: InsertCategory[] = [
      { name: "Eletrônicos", description: "Celulares, tablets, notebooks, acessórios" },
      { name: "Documentos", description: "RG, CPF, CNH, carteiras" },
      { name: "Acessórios Pessoais", description: "Óculos, relógios, joias" },
      { name: "Vestuário", description: "Roupas, calçados, bolsas" },
      { name: "Chaves", description: "Chaves de casa, carro, etc" },
      { name: "Outros", description: "Demais itens" },
    ];

    categories.forEach(cat => {
      const id = randomUUID();
      this.categories.set(id, { ...cat, id });
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async getCategory(id: string): Promise<Category | undefined> {
    return this.categories.get(id);
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = randomUUID();
    const category: Category = { ...insertCategory, id };
    this.categories.set(id, category);
    return category;
  }

  async getAllItems(): Promise<Item[]> {
    return Array.from(this.items.values()).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async getItem(id: string): Promise<Item | undefined> {
    return this.items.get(id);
  }

  async createItem(insertItem: InsertItem): Promise<Item> {
    const id = randomUUID();
    const now = new Date();
    const item: Item = {
      ...insertItem,
      id,
      dateFound: new Date(insertItem.dateFound),
      claimedDate: insertItem.claimedDate ? new Date(insertItem.claimedDate) : null,
      createdAt: now,
    };
    this.items.set(id, item);
    return item;
  }

  async updateItem(id: string, updates: Partial<Item>): Promise<Item | undefined> {
    const item = this.items.get(id);
    if (!item) return undefined;

    const updatedItem: Item = { ...item, ...updates };
    this.items.set(id, updatedItem);
    return updatedItem;
  }

  async deleteItem(id: string): Promise<boolean> {
    return this.items.delete(id);
  }
}

export const storage = new MemStorage();
