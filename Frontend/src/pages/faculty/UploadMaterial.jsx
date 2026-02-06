import MaterialUploadForm from '../../components/faculty/MaterialUploadForm';

const UploadMaterial = () => {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-gray-500">Course Materials</p>
        <h1 className="text-2xl font-semibold text-gray-900">Upload new material</h1>
      </div>

      <MaterialUploadForm onSubmit={() => alert('Material uploaded (mock)')} />
    </div>
  );
};

export default UploadMaterial;

