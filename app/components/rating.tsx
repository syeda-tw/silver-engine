import Image from "next/image";
import RatingStarIcon from "@/public/icons/ratingStar.svg";

interface RatingProps {
  rating: number;
}

const Rating = ({ rating }: RatingProps) => {
  // Clamp rating between 0 and 5
  const clampedRating = Math.max(0, Math.min(5, rating));
  
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }, (_, index) => (
        <Image 
          src={RatingStarIcon}
          alt="rating star"
          key={index}
          className={`w-4 h-4 ${
            index < clampedRating 
              ? 'opacity-100' 
              : 'opacity-20'
          } transition-opacity`}
        />
      ))}
    </div>
  );
};

export default Rating;
