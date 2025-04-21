import React, { useState } from "react";
import {
  Search,
  ShoppingCart as ShoppingCartIcon,
  User,
  Menu,
  X,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import ProductCatalog from "./ProductCatalog";
import ShoppingCart from "./ShoppingCart";
import AuthModal from "./AuthModal";

const HomePage = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleCart = () => setIsCartOpen(!isCartOpen);
  const toggleAuthModal = () => setIsAuthModalOpen(!isAuthModalOpen);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search functionality
    console.log("Searching for:", searchQuery);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle menu</span>
            </Button>
            <a href="/" className="flex items-center gap-2">
              <ShoppingCartIcon className="h-6 w-6" />
              <span className="font-bold text-xl">ShopEase</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="/" className="text-sm font-medium hover:underline">
              Home
            </a>
            <a href="/products" className="text-sm font-medium hover:underline">
              Products
            </a>
            <a
              href="/categories"
              className="text-sm font-medium hover:underline"
            >
              Categories
            </a>
            <a href="/deals" className="text-sm font-medium hover:underline">
              Deals
            </a>
            <a href="/about" className="text-sm font-medium hover:underline">
              About
            </a>
          </nav>

          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex items-center relative w-full max-w-sm mx-4"
          >
            <Input
              type="search"
              placeholder="Search products..."
              className="w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button
              type="submit"
              variant="ghost"
              size="icon"
              className="absolute right-0"
            >
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
          </form>

          {/* User Actions */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={toggleAuthModal}>
              <User className="h-5 w-5" />
              <span className="sr-only">Account</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleCart}
              className="relative"
            >
              <ShoppingCartIcon className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
              <span className="sr-only">Cart</span>
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t p-4 bg-background">
            <nav className="flex flex-col space-y-4">
              <a href="/" className="text-sm font-medium hover:underline">
                Home
              </a>
              <a
                href="/products"
                className="text-sm font-medium hover:underline"
              >
                Products
              </a>
              <a
                href="/categories"
                className="text-sm font-medium hover:underline"
              >
                Categories
              </a>
              <a href="/deals" className="text-sm font-medium hover:underline">
                Deals
              </a>
              <a href="/about" className="text-sm font-medium hover:underline">
                About
              </a>
            </nav>
            <form
              onSubmit={handleSearch}
              className="flex items-center relative mt-4"
            >
              <Input
                type="search"
                placeholder="Search products..."
                className="w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button
                type="submit"
                variant="ghost"
                size="icon"
                className="absolute right-0"
              >
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
              </Button>
            </form>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="py-12 px-4 md:px-6 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Shop the Latest Products
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover amazing deals on our wide range of high-quality products.
            Free shipping on orders over $50.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">Shop Now</Button>
            <Button size="lg" variant="outline">
              View Deals
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-12 px-4 md:px-6">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {["Electronics", "Clothing", "Home & Kitchen", "Beauty"].map(
              (category) => (
                <div
                  key={category}
                  className="group relative overflow-hidden rounded-lg bg-muted hover:shadow-md transition-all"
                >
                  <div className="aspect-square bg-muted">
                    <img
                      src={`https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&q=80`}
                      alt={category}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <h3 className="text-xl font-bold text-white">{category}</h3>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Product Catalog */}
      <section className="py-12 px-4 md:px-6 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            Featured Products
          </h2>
          <ProductCatalog />
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-12 px-4 md:px-6 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Stay updated with our latest products and exclusive offers.
          </p>
          <form className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-primary-foreground text-primary"
              required
            />
            <Button variant="secondary">Subscribe</Button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 md:px-6 bg-muted">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">ShopEase</h3>
              <p className="text-muted-foreground">
                Your one-stop shop for all your needs.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Shop</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/products"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    All Products
                  </a>
                </li>
                <li>
                  <a
                    href="/categories"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Categories
                  </a>
                </li>
                <li>
                  <a
                    href="/deals"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Deals & Offers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Support</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/contact"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    href="/faq"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    FAQs
                  </a>
                </li>
                <li>
                  <a
                    href="/shipping"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Shipping & Returns
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/about"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="/careers"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="/privacy"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>
              &copy; {new Date().getFullYear()} ShopEase. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Shopping Cart Slide-out */}
      <ShoppingCart isOpen={isCartOpen} onClose={toggleCart} />

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthModalOpen} onClose={toggleAuthModal} />
    </div>
  );
};

export default HomePage;
