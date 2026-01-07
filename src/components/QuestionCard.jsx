export default function QuestionCard({ question, options, onSelect }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h2 className="font-serif text-xl mb-4 text-clay-900">
        {question}
      </h2>

      <div className="space-y-3">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => onSelect(option)}
            className="w-full text-left px-4 py-3 rounded-xl border border-sage-300 hover:bg-sage-100 transition"
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
