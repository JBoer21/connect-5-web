import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";

interface PlayerCardProps {
  name: string;
  imageUrl: string;
  show: boolean;
}

export function PlayerCard({ name, imageUrl, show = false }: PlayerCardProps) {
  return (
    <Card className="w-[12rem]">
      <CardHeader className="py-2">
        <CardTitle className="text-sm text-center">
          {show ? name : " "}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-2">
        <div className="h-[9rem] rounded overflow-hidden flex items-center justify-center">
          <img
            src={
              show
                ? imageUrl
                : "https://www.fifacm.com/content/media/imgs/fc24/players/notfound_0.png"
            }
            alt={`${name}'s ${show ? "image" : "hidden image"}`}
            className="object-contain max-w-full max-h-full"
          />
        </div>
      </CardContent>
    </Card>
  );
}
