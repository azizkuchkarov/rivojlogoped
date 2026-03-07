import path from "path";
import { promises as fs } from "fs";

export interface NewsItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image?: string;
  date: string;
  published: boolean;
  createdAt: string;
}

export const NEWS_FILE = "data/news.json";

export async function getPublishedNews(): Promise<NewsItem[]> {
  try {
    const filePath = path.join(process.cwd(), NEWS_FILE);
    const data = await fs.readFile(filePath, "utf-8");
    const items: NewsItem[] = JSON.parse(data);
    return items
      .filter((n) => n.published)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch {
    return [];
  }
}
