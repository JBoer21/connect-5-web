import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";

interface PlayerCardProps {
  name: string;
  imageUrl: string;
}

export function PlayerCard({ name, imageUrl }: PlayerCardProps) {
  return (
    <Card className="w-[12rem]">
      <CardHeader className="py-2">
        <CardTitle className="text-sm text-center">{name}</CardTitle>
      </CardHeader>
      <CardContent className="p-2">
        <div className="h-[9rem] rounded overflow-hidden flex items-center justify-center">
          <img
            src={imageUrl}
            alt={`${name}'s`}
            className="object-contain max-w-full max-h-full"
          />
        </div>
      </CardContent>
    </Card>
  );
}
