import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";

interface MockPlayerCardProps {
  name: string;
  imageUrl: string;
}

export function MockPlayerCard({ name, imageUrl }: MockPlayerCardProps) {
  return (
    <Card className="w-[8rem] transition-transform duration-200 hover:scale-105 hover:shadow-lg">
      <CardHeader className="py-1">
        <CardTitle className="text-xs text-center">{name}</CardTitle>
      </CardHeader>
      <CardContent className="p-1">
        <div className="h-[6rem] rounded overflow-hidden flex items-center justify-center">
          <img
            src={imageUrl}
            alt={name}
            className="object-contain max-w-full max-h-full"
          />
        </div>
      </CardContent>
    </Card>
  );
}
