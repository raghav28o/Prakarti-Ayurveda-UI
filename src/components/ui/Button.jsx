export default function Button({ children, onClick, variant = "primary" }) {
  const base =
    "px-6 py-3 rounded-xl font-medium transition-all duration-200";

  const variants = {
    primary: "bg-leaf text-white hover:opacity-90",
    secondary: "bg-sage-300 text-clay hover:bg-sage-400",
  };

  return (
    <button onClick={onClick} className={`${base} ${variants[variant]}`}>
      {children}
    </button>
  );
}
