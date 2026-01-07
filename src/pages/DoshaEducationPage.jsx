import DoshaCard from "../components/DoshaCard";
import Button from "../components/ui/Button";

export default function DoshaEducationPage() {
  return (
    <div className="min-h-screen bg-sage-100 px-4 py-10">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="font-serif text-3xl mb-3 text-clay-900">
          Understand Your Dosha
        </h1>

        <p className="text-sm text-clay-700 mb-10">
          Ayurveda teaches that everyone has a unique body constitution.
          Let’s explore the three doshas.
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          <DoshaCard
            title="Vata"
            description="Creative, energetic, and quick-thinking. Vata types benefit from warmth and routine."
          />
          <DoshaCard
            title="Pitta"
            description="Focused, intelligent, and driven. Pitta types thrive with cooling and balance."
          />
          <DoshaCard
            title="Kapha"
            description="Calm, grounded, and strong. Kapha types benefit from lightness and movement."
          />
        </div>

        <div className="mt-10">
          <Button>
            Find My Dosha
          </Button>
        </div>
      </div>
    </div>
  );
}
