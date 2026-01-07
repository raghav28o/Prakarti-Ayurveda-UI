export default function DoshaCard({ title, description }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition">
      <h2 className="font-serif text-xl mb-2 text-clay-900">
        {title}
      </h2>
      <p className="text-sm text-clay-700">
        {description}
      </p>
    </div>
  );
}
