import { Quote, Star } from 'lucide-react';
import Card from './Card';
import { motion } from 'framer-motion';

const TestimonialCard = ({ name, role, content, image, rating = 5 }) => {
  return (
    <Card className="h-full relative overflow-hidden" hover>
      {/* Decorative gradient */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-100 to-transparent rounded-bl-full opacity-50" />

      <div className="flex flex-col h-full relative z-10">
        {/* Quote Icon */}
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-100">
            <Quote className="h-8 w-8 text-primary-600" />
          </div>
        </div>

        {/* Rating Stars */}
        {rating > 0 && (
          <div className="flex gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`}
              />
            ))}
          </div>
        )}

        {/* Content */}
        <p className="text-gray-600 flex-grow mb-6 leading-relaxed italic">
          "{content}"
        </p>

        {/* Author */}
        <div className="flex items-center pt-4 border-t border-gray-100">
          <div className="relative">
            <img
              src={image}
              alt={name}
              className="w-14 h-14 rounded-full object-cover ring-2 ring-primary-100"
            />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-cyan-500 rounded-full border-2 border-white flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <div className="ml-4">
            <h4 className="text-xl font-bold text-gray-900 mb-1">{name}</h4>
            <p className="text-sm text-gray-600 leading-relaxed">{role}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TestimonialCard;