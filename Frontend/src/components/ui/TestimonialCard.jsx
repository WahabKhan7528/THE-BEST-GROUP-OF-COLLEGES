import { Quote, Star } from 'lucide-react';
import Card from './Card';

const TestimonialCard = ({ name, role, content, image, rating = 5 }) => {
  return (
    <Card className="h-full relative overflow-hidden border border-border" hover>
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary-50 rounded-bl-full opacity-50" />

      <div className="flex flex-col h-full relative z-10">
        {/* Quote Icon */}
        <div className="mb-2 md:mb-6 p-2 md:p-6 pb-0">
          <div className="inline-flex items-center justify-center w-8 h-8 md:w-16 md:h-16 rounded-lg md:rounded-2xl bg-primary-100 text-primary-600">
            <Quote className="h-4 w-4 md:h-8 md:w-8" />
          </div>
        </div>

        {/* Rating Stars */}
        {rating > 0 && (
          <div className="flex gap-1 mb-2 md:mb-4 px-3 md:px-6">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 md:h-4 md:w-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`}
              />
            ))}
          </div>
        )}

        {/* Content */}
        <div className="px-3 md:px-6">
          <p className="text-text-secondary flex-grow mb-2 md:mb-6 leading-snug md:leading-relaxed italic text-xs md:text-base">
            "{content}"
          </p>
        </div>

        {/* Author */}
        <div className="flex items-center pt-2 pb-3 px-3 md:pt-4 md:pb-6 md:px-6 border-t border-border mt-auto">
          <div className="relative">
            <img
              src={image}
              alt={name}
              className="w-8 h-8 md:w-14 md:h-14 rounded-full object-cover ring-2 ring-primary-100"
            />
            <div className="absolute -bottom-0.5 -right-0.5 md:-bottom-1 md:-right-1 w-3 h-3 md:w-5 md:h-5 bg-primary-500 rounded-full border-2 border-white flex items-center justify-center">
              <svg className="w-2 h-2 md:w-3 md:h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <div className="ml-2 md:ml-4">
            <h4 className="text-sm md:text-xl font-bold text-primary-900 mb-0 md:mb-1">{name}</h4>
            <p className="text-xs md:text-sm text-text-secondary leading-tight md:leading-relaxed">{role}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TestimonialCard;