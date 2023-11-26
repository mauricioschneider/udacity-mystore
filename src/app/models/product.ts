export class Product {
  id: number;
  name: string;
  url: string;
  description: string;
  price: number;

  constructor(id: number, name: string, url: string, description: string, price: number) {
    this.id = id;
    this.name = name;
    this.url = url;
    this.description = description;
    this.price = price;
  }
}
