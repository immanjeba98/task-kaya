interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    if (totalPages <= 1) return null;

    return (
        <div className="flex justify-center items-center mt-8 space-x-1">
            {/* Previous */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded ${
                    currentPage === 1
                        ? 'bg-gray-100 text-gray-400'
                        : 'bg-white border text-gray-700 hover:bg-gray-50'
                }`}
            >
                ← Prev
            </button>

            {/* Page Info */}
            <span className="px-4 py-2 text-gray-600">
                {currentPage} of {totalPages}
            </span>

            {/* Next */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded ${
                    currentPage === totalPages
                        ? 'bg-gray-100 text-gray-400'
                        : 'bg-white border text-gray-700 hover:bg-gray-50'
                }`}
            >
                Next →
            </button>
        </div>
    );
}