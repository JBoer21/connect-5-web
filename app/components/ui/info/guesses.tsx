import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../table";

interface GuessesTableProps {
  guesses: string[];
}

export function GuessesTable({ guesses }: GuessesTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Guesses</TableHead>
          <TableHead>Name</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {guesses.map((name, index) => (
          <TableRow key={index} className="bg-red-100">
            <TableCell className="font-medium">{index + 1}</TableCell>
            <TableCell>{name}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
