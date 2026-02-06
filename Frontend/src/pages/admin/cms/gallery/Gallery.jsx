import { Link } from 'react-router-dom';

const images = [
  { id: 'g1', title: 'Campus lawn', date: 'Sept 5, 2025' },
  { id: 'g2', title: 'Computer lab', date: 'Sept 2, 2025' },
  { id: 'g3', title: 'Library hall', date: 'Aug 30, 2025' },
];

const Gallery = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">CMS • Gallery</p>
          <h1 className="text-2xl font-semibold text-gray-900">Manage gallery</h1>
        </div>
        <Link
          to="/admin/cms/gallery/upload"
          className="px-4 py-2 bg-purple-700 text-white rounded-lg text-sm font-semibold hover:bg-purple-800"
        >
          Upload Image
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {images.map((img) => (
          <div key={img.id} className="bg-white border rounded-2xl shadow-sm p-4 space-y-2">
            <div className="aspect-video bg-gray-100 rounded-lg" />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-900">{img.title}</p>
                <p className="text-xs text-gray-500">{img.date}</p>
              </div>
              <button className="text-rose-600 text-sm font-semibold hover:text-rose-700">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;

