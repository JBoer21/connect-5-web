import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";

interface PlayerCardProps {
  name: string;
  imageUrl: string;
}

export function PlayerCard({ name, imageUrl }: PlayerCardProps) {
  return (
    <div className="h-[40rem] w-full flex items-center justify-center">
      <Card className="w-[20rem]">
        <CardHeader className="pb-2">
          <center>
            <CardTitle className="text-base">{name}</CardTitle>
          </center>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="h-[12rem] rounded-lg overflow-hidden flex items-center justify-center">
            <img
              src={imageUrl}
              alt={`${name}'s`}
              className="object-contain max-w-full max-h-full"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
