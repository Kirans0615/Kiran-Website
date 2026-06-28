export type Category = "All" | "SaaS" | "Business" | "Nonprofit";

export interface Project {
  id: string;
  num: string;
  title: string;
  url: string;
  description: string;
  category: Exclude<Category, "All">;
  tags: string[];
}

export const PROJECTS: Project[] = [
  {
    id: "omalley",
    num: "01",
    title: "O'Malley Fabrics",
    url: "https://omalleyfabrics.com/",
    description: "DMV seamstress studio with live price estimator and booking system.",
    category: "Business",
    tags: ["Booking", "Price Estimator", "Local Business"],
  },
  {
    id: "empower",
    num: "02",
    title: "Empower Estates Network",
    url: "https://empowerestatesnetwork.com/",
    description: "Real estate investment brand with conversion-focused design.",
    category: "Business",
    tags: ["Real Estate", "Investment", "Brand"],
  },
  {
    id: "arvyx",
    num: "03",
    title: "ARVYX",
    url: "https://kirans0615.github.io/ARVYX-test/",
    description: "Real estate deal-intelligence SaaS platform with dashboard UI.",
    category: "SaaS",
    tags: ["SaaS", "Dashboard", "Real Estate Tech"],
  },
  {
    id: "freight",
    num: "04",
    title: "J&A Freight Logistics",
    url: "https://kirans0615.github.io/J-A-Freight-Logistics-Mock/",
    description: "Freight & logistics company with professional brand presence.",
    category: "Business",
    tags: ["Logistics", "Freight", "B2B"],
  },
  {
    id: "ctd",
    num: "05",
    title: "CTD Entertainment",
    url: "https://kirans0615.github.io/CTD-Entertainment-Management/",
    description: "Entertainment management company with bold creative direction.",
    category: "Business",
    tags: ["Entertainment", "Management", "Creative"],
  },
  {
    id: "iam",
    num: "06",
    title: "I Am Movement",
    url: "https://kirans0615.github.io/I-Am-Movement-Mockup/",
    description: "Inspiring movement campaign with emotional storytelling design.",
    category: "Nonprofit",
    tags: ["Campaign", "Movement", "Storytelling"],
  },
  {
    id: "vts",
    num: "07",
    title: "Vanishing Twin Foundation",
    url: "https://kirans0615.github.io/International-Vanishing-Twin-Syndrome-Foundation/",
    description: "International nonprofit raising awareness for Vanishing Twin Syndrome.",
    category: "Nonprofit",
    tags: ["Foundation", "Health", "Awareness"],
  },
  {
    id: "kenya",
    num: "08",
    title: "Early Childhood Center Kenya",
    url: "https://kirans0615.github.io/EARLY-CHILDHOOD-CTR-KENYA/",
    description: "Education nonprofit supporting early childhood development in Kenya.",
    category: "Nonprofit",
    tags: ["Education", "Africa", "Children"],
  },
];

export const CATEGORIES: Category[] = ["All", "SaaS", "Business", "Nonprofit"];
