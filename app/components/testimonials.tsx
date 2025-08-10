import React, { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import Avatar from "./avatar";
import Rating from "./rating";

type Ttestimonial = {
  id: string;
  name: string;
  occupation: string;
  city: string;
  rating: number;
  text: string;
  date: string;
};

const TestimonalCard = (testimonial: Ttestimonial) => {
  const formattedDate = formatDistanceToNow(new Date(testimonial.date), {
    addSuffix: true,
  });

  return (
    <div className="p-2 rounded-md bg-background/60">
      <div className="flex flex-row gap-2 items-center mb-4">
        <Avatar name={testimonial.name} />
        <div className="flex flex-col justify-start">
          <div className="text-16px font-bold">{testimonial.name}</div>
          <div className="text-12px text-text-light">
            <span>{testimonial.occupation}</span>
            <span> • {testimonial.city}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between mb-4">
        <Rating rating={testimonial.rating} />
        <p className="text-12px text-text-light">{formattedDate}</p>
      </div>
      <p className="text-14px line-height-20px mr-4">{testimonial.text}</p>
    </div>
  );
};

const testimonialsData: Ttestimonial[] = [
  {
    id: "testimonial-1",
    name: "Nick P.",
    occupation: "Software Engineer",
    city: "Seattle",
    rating: 5,
    date: "2025-07-15",
    text: "Woke up with severe stomach flu and needed documentation for work. The doctor was thorough, professional, and I had my note in minutes.",
  },
  {
    id: "testimonial-2",
    name: "June R.",
    occupation: "Marketing Manager",
    city: "Austin",
    rating: 5,
    date: "2025-06-10",
    text: "The service was fast and easy to use. The doctor was kind, understanding, and provided the documentation I needed without any hassle.",
  },
  {
    id: "testimonial-3",
    name: "Mark T.",
    occupation: "Project Coordinator",
    city: "Chicago",
    rating: 5,
    date: "2025-08-01",
    text: "Excellent experience! The doctor was attentive and gave me exactly what I needed quickly. Highly recommend for anyone needing urgent medical notes.",
  },
];

const NavigationDots = ({ 
  total, 
  current, 
  onDotClick 
}: { 
  total: number; 
  current: number; 
  onDotClick: (index: number) => void; 
}) => {
  return (
    <div className="flex justify-start gap-2 my-2">
      {Array.from({ length: total }).map((_, index) => (
        <button
          key={index}
          onClick={() => onDotClick(index)}
          className={`w-[10px] h-[10px] rounded-full transition-all duration-200 ${
            index === current 
              ? 'bg-primary' 
              : 'bg-gray-300 hover:bg-gray-400'
          }`}
          aria-label={`Go to testimonial ${index + 1}`}
        />
      ))}
    </div>
  );
};

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="my-2">
      <TestimonalCard key={testimonialsData[currentIndex].id} {...testimonialsData[currentIndex]} />
      <NavigationDots 
        total={testimonialsData.length}
        current={currentIndex}
        onDotClick={handleDotClick}
      />
    </div>
  );
};

export default Testimonials;
