import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  id?: string;
  title?: string;
  price?: number;
  image?: string;
  rating?: number;
  discount?: number;
  isNew?: boolean;
  onAddToCart?: (id: string) => void;
  onViewDetails?: (id: string) => void;
}

const ProductCard = ({
  id = "1",
  title = "Premium Wireless Headphones",
  price = 129.99,
  image = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
  rating = 4.5,
  discount = 0,
  isNew = false,
  onAddToCart = () => {},
  onViewDetails = () => {},
}: ProductCardProps) => {
  const discountedPrice =
    discount > 0 ? price - (price * discount) / 100 : price;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(id);
  };

  const handleCardClick = () => {
    onViewDetails(id);
  };

  return (
    <Card
      className="w-[280px] h-[380px] overflow-hidden transition-all duration-300 hover:shadow-lg bg-white"
      onClick={handleCardClick}
    >
      <div className="relative h-[200px] overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        {isNew && (
          <Badge className="absolute top-2 left-2 bg-blue-500 hover:bg-blue-600">
            New
          </Badge>
        )}
        {discount > 0 && (
          <Badge className="absolute top-2 right-2 bg-red-500 hover:bg-red-600">
            {discount}% OFF
          </Badge>
        )}
      </div>

      <CardContent className="p-4">
        <h3 className="font-medium text-lg line-clamp-2 mb-2">{title}</h3>
        <div className="flex items-center mb-2">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <Star
                key={i}
                size={16}
                className={
                  i < Math.floor(rating)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }
              />
            ))}
          <span className="text-sm text-gray-600 ml-1">{rating}</span>
        </div>
        <div className="flex items-center">
          {discount > 0 && (
            <span className="text-gray-400 line-through mr-2">
              ${price.toFixed(2)}
            </span>
          )}
          <span className="text-lg font-bold text-primary">
            ${discountedPrice.toFixed(2)}
          </span>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button className="w-full" onClick={handleAddToCart}>
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
