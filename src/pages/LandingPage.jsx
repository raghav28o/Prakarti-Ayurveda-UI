import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-sage-100">
      <div className="max-w-md w-full relative">
        
        {/* 🌿 Prakarti Doodle Placeholder */}
        <div className="absolute -top-12 -right-6 text-sm text-clay-600">
          🌿 Prakarti
        </div>

        <Card>
          <h1 className="font-serif text-3xl mb-2 text-clay-900">
            Prakarti AyurVeda
          </h1>

          <p className="text-sm mb-4 text-clay-700">
            Discover your natural body constitution and receive a personalized
            Ayurvedic diet plan designed just for you.
          </p>

          <Button>
            Start Free Assessment
          </Button>
        </Card>
      </div>
    </div>
  );
}
