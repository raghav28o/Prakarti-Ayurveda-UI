export default function PrakartiGuide({ message }) {
  return (
    <div className="fixed bottom-6 right-6 bg-white rounded-xl shadow-md px-4 py-3 max-w-xs">
      <p className="text-sm text-clay-700">
        🌿 Prakarti: {message}
      </p>
    </div>
  );
}
