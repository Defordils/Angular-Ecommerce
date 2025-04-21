import React, { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import ProductCard from "./ProductCard";
import { Search, SlidersHorizontal } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
  category: string;
  description: string;
}

interface ProductCatalogProps {
  products?: Product[];
  categories?: string[];
}

const ProductCatalog = ({
  products = [
    {
      id: "1",
      name: "Wireless Headphones",
      price: 129.99,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
      rating: 4.5,
      category: "Electronics",
      description: "Premium wireless headphones with noise cancellation.",
    },
    {
      id: "2",
      name: "Smart Watch",
      price: 199.99,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
      rating: 4.2,
      category: "Electronics",
      description: "Fitness tracker with heart rate monitor.",
    },
    {
      id: "3",
      name: "Running Shoes",
      price: 89.99,
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80",
      rating: 4.7,
      category: "Fashion",
      description: "Lightweight running shoes for maximum comfort.",
    },
    {
      id: "4",
      name: "Coffee Maker",
      price: 59.99,
      image:
        "https://images.unsplash.com/photo-1570486876385-42a3c9895cce?w=500&q=80",
      rating: 4.0,
      category: "Home",
      description: "Programmable coffee maker with timer.",
    },
    {
      id: "5",
      name: "Backpack",
      price: 49.99,
      image:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80",
      rating: 4.3,
      category: "Fashion",
      description: "Durable backpack with laptop compartment.",
    },
    {
      id: "6",
      name: "Bluetooth Speaker",
      price: 79.99,
      image:
        "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80",
      rating: 4.1,
      category: "Electronics",
      description: "Portable Bluetooth speaker with 20-hour battery life.",
    },
  ],
  categories = ["All", "Electronics", "Fashion", "Home", "Books", "Sports"],
}: ProductCatalogProps) => {
  const [priceRange, setPriceRange] = useState<number[]>([0, 200]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "All",
  ]);
  const [sortOption, setSortOption] = useState("featured");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const handleCategoryChange = (category: string) => {
    if (category === "All") {
      setSelectedCategories(["All"]);
      return;
    }

    const newSelectedCategories = selectedCategories.includes("All")
      ? [category]
      : selectedCategories.includes(category)
        ? selectedCategories.filter((c) => c !== category)
        : [...selectedCategories, category];

    if (newSelectedCategories.length === 0) {
      setSelectedCategories(["All"]);
    } else {
      setSelectedCategories(newSelectedCategories);
    }
  };

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
  };

  const handleSortChange = (value: string) => {
    setSortOption(value);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  // Filter and sort products
  const filteredProducts = products
    .filter((product) => {
      const matchesCategory =
        selectedCategories.includes("All") ||
        selectedCategories.includes(product.category);
      const matchesPrice =
        product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesSearch =
        searchQuery === "" ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesPrice && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortOption) {
        case "price-low-high":
          return a.price - b.price;
        case "price-high-low":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        default: // 'featured'
          return 0;
      }
    });

  return (
    <div className="w-full bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Search and Filter Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <form onSubmit={handleSearch} className="relative w-full md:w-96">
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10"
            />
            <Button
              type="submit"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0"
            >
              <Search className="h-4 w-4" />
            </Button>
          </form>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <Button
              variant="outline"
              onClick={toggleFilters}
              className="md:hidden flex items-center gap-2"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </Button>

            <div className="hidden md:block">
              <Select value={sortOption} onValueChange={handleSortChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low-high">
                    Price: Low to High
                  </SelectItem>
                  <SelectItem value="price-high-low">
                    Price: High to Low
                  </SelectItem>
                  <SelectItem value="rating">Top Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <div
            className={`${showFilters ? "block" : "hidden"} md:block w-full md:w-64 bg-card p-4 rounded-lg border`}
          >
            <h3 className="text-lg font-semibold mb-4">Filters</h3>

            <div className="mb-6">
              <h4 className="text-sm font-medium mb-2">Categories</h4>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={`category-${category}`}
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={() => handleCategoryChange(category)}
                    />
                    <label
                      htmlFor={`category-${category}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-sm font-medium mb-2">Price Range</h4>
              <div className="px-2">
                <Slider
                  defaultValue={[0, 200]}
                  max={500}
                  step={10}
                  value={priceRange}
                  onValueChange={handlePriceChange}
                  className="mb-2"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </div>

            <div className="md:hidden">
              <Select value={sortOption} onValueChange={handleSortChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low-high">
                    Price: Low to High
                  </SelectItem>
                  <SelectItem value="price-high-low">
                    Price: High to Low
                  </SelectItem>
                  <SelectItem value="rating">Top Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium">No products found</h3>
                <p className="text-muted-foreground mt-2">
                  Try adjusting your filters or search query
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    image={product.image}
                    rating={product.rating}
                    category={product.category}
                    description={product.description}
                  />
                ))}
              </div>
            )}

            {/* Pagination */}
            <Pagination className="mt-8">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCatalog;
