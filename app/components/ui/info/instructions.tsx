import { Button } from "../button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../dialog";
import { MockPlayerBand } from "../players/mock-player-band";

export function InstructionsDialog() {
  const examplePlayers = [
    {
      name: "K. Walker",
      imageUrl: "https://cdn.sofifa.net/players/188/377/22_120.png",
    },
    {
      name: "P. Foden",
      imageUrl: "https://cdn.sofifa.net/players/237/692/22_120.png",
    },
    {
      name: "J. Stones",
      imageUrl: "https://cdn.sofifa.net/players/203/574/22_120.png",
    },
    {
      name: "K. De Bruyne",
      imageUrl: "https://cdn.sofifa.net/players/192/985/22_120.png",
    },
    {
      name: "R. Sterling",
      imageUrl: "https://cdn.sofifa.net/players/202/652/22_120.png",
    },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              width: "15px",
              height: "15px",
              color: "#4a4a4a",
            }}
          >
            <path
              d="M5.07505 4.10001C5.07505 2.91103 6.25727 1.92502 7.50005 1.92502C8.74283 1.92502 9.92505 2.91103 9.92505 4.10001C9.92505 5.19861 9.36782 5.71436 8.61854 6.37884L8.58757 6.4063C7.84481 7.06467 6.92505 7.87995 6.92505 9.5C6.92505 9.81757 7.18248 10.075 7.50005 10.075C7.81761 10.075 8.07505 9.81757 8.07505 9.5C8.07505 8.41517 8.62945 7.90623 9.38156 7.23925L9.40238 7.22079C10.1496 6.55829 11.075 5.73775 11.075 4.10001C11.075 2.12757 9.21869 0.775024 7.50005 0.775024C5.7814 0.775024 3.92505 2.12757 3.92505 4.10001C3.92505 4.41758 4.18249 4.67501 4.50005 4.67501C4.81761 4.67501 5.07505 4.41758 5.07505 4.10001ZM7.50005 13.3575C7.9833 13.3575 8.37505 12.9657 8.37505 12.4825C8.37505 11.9992 7.9833 11.6075 7.50005 11.6075C7.0168 11.6075 6.62505 11.9992 6.62505 12.4825C6.62505 12.9657 7.0168 13.3575 7.50005 13.3575Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[90vw] max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl">How to Play</DialogTitle>
          <DialogDescription className="text-sm sm:text-base">
            All 5 of these players have played for the same club - the more
            guesses you get wrong, the easier it gets.
          </DialogDescription>
          <DialogDescription className="text-sm sm:text-base">
            A new game is released every day at midnight local time. Some games
            are easier than others!
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <h3 className="mb-2 text-sm font-semibold sm:text-base">Example:</h3>
          <div className="w-full overflow-x-auto">
            <MockPlayerBand players={examplePlayers} />
          </div>
          <p className="mt-2 text-xs sm:text-sm">
            In this example, all players have played for Manchester City.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
