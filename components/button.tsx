import { memo } from 'react';

const SubmitButton = memo(({ onClick, isLoading, isEditMode }: { onClick: () => void, isLoading: boolean, isEditMode: boolean }) => {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 disabled:opacity-50"
    >
      {isLoading ? (isEditMode ? "Saving..." : "Creating...") : isEditMode ? "Update Resume" : "Create Resume"}
    </button>
  );
});

SubmitButton.displayName = "SubmitButton";

export default SubmitButton;
