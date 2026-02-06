import { Quote } from 'lucide-react';
import Card from './Card';

const TestimonialCard = ({ name, role, content, image }) => {
  return (
    <Card className="h-full" hover>
      <div className="flex flex-col h-full">
        <Quote className="h-8 w-8 text-blue-600 mb-4" />
        <p className="text-gray-600 flex-grow mb-6">{content}</p>
        <div className="flex items-center">
          <img
            src={image}
            alt={name}
            className="w-12 h-12 rounded-full mr-4"
          />
          <div>
            <h4 className="font-bold">{name}</h4>
            <p className="text-sm text-gray-600">{role}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TestimonialCard;