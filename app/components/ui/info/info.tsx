import { Button } from "../button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../dialog";

export function InfoHelp() {
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
              d="M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82707 7.49972C1.82707 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82707 10.6327 1.82707 7.49972ZM8.24992 4.49999C8.24992 4.9142 7.91413 5.24999 7.49992 5.24999C7.08571 5.24999 6.74992 4.9142 6.74992 4.49999C6.74992 4.08577 7.08571 3.74999 7.49992 3.74999C7.91413 3.74999 8.24992 4.08577 8.24992 4.49999ZM6.00003 5.99999H6.50003H7.50003C7.77618 5.99999 8.00003 6.22384 8.00003 6.49999V9.99999H8.50003H9.00003V11H8.50003H7.50003H6.50003H6.00003V9.99999H6.50003H7.00003V6.99999H6.50003H6.00003V5.99999Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Game Dev Information</DialogTitle>
          <DialogDescription>
            This game uses local storage to save your progress and game state.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <p>To ensure the best experience and to save your progress:</p>
          <ul className="pl-5 mt-2 list-disc">
            <li>Use a modern web browser that supports local storage</li>
            <li>Enable cookies and local storage in your browser settings</li>
            <li>
              Avoid using private/incognito mode, which may limit local storage
            </li>
          </ul>
          <p className="mt-2">
            Your game data is stored locally on your device and is not sent to
            any server.
          </p>
          <div className="mt-4">
            <h3 className="font-semibold">
              Why might my progress not be saving?
            </h3>
            <p>There could be several reasons:</p>
            <ul className="pl-5 mt-2 list-disc">
              <li>Your browser&apos;s local storage is full</li>
              <li>You&apos;ve cleared your browser data recently</li>
              <li>You&apos;re using a different browser or device</li>
              <li>Your browser settings are blocking local storage</li>
              <li>You&apos;re using an outdated browser version</li>
            </ul>
            <p className="mt-2">
              If you&apos;re experiencing issues, try clearing your browser
              cache and refreshing the page. If problems persist, please check
              your browser settings or try a different browser.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
