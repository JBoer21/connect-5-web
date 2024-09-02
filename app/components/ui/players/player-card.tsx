import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";

interface PlayerCardProps {
  name: string;
  imageUrl: string;
  show: boolean;
}

export function PlayerCard({ name, imageUrl, show = false }: PlayerCardProps) {
  return (
    <Card
      className={
        show
          ? "w-[12rem] transition-transform duration-200 hover:scale-105 hover:shadow-lg"
          : "w-[12rem]"
      }
    >
      <CardHeader className="py-2">
        <CardTitle className="text-sm text-center">
          {show ? <h2>{name}</h2> : <span aria-hidden="true">&nbsp;</span>}
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
            alt={show ? `Football player ${name}` : "Hidden player card"}
            className="object-contain max-w-full max-h-full"
            loading="lazy"
          />
        </div>
      </CardContent>
    </Card>
  );
}
