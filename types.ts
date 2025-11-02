
export interface MenuItem {
  name: string;
  price: string;
  image: string;
  bestseller?: boolean;
}

export interface Outlet {
  slug: string;
  category: string;
  name: string;
  description: string;
  heroImage: string;
  quote: string;
  menu: MenuItem[];
  address: string;
  hours: string;
  contact: string;
  mapEmbed: string;
}
