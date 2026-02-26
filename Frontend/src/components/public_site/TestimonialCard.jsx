import Card from './Card';

const TestimonialCard = ({ name, role, content, image }) => {
  return (
    <Card className="h-full flex flex-col p-8 bg-gray-50 border-none shadow-none" hover>
      <p className="text-gray-700 flex-grow mb-8 text-lg md:text-xl font-medium leading-relaxed tracking-tight">
        "{content}"
      </p>

      <div className="flex items-center gap-4 mt-auto">
        <img
          src={image}
          alt={name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h4 className="font-bold text-gray-900">{name}</h4>
          <p className="text-sm text-gray-500 font-medium">{role}</p>
        </div>
      </div>
    </Card>
  );
};

export default TestimonialCard;