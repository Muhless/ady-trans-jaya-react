type Props = {
  loading: boolean;
  error?: string;
  skeletonCount?: number;
};

const LoadingOrErrorWithSkeleton = ({
  loading,
  error,
  skeletonCount = 3,
}: Props) => {
  if (loading) {
    return (
      <div className="space-y-4 p-4">
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <div
            key={i}
            className="animate-pulse bg-gray-200 rounded-lg h-24 w-full"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return null;
};

export default LoadingOrErrorWithSkeleton;
