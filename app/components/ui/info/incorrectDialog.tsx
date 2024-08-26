import React, { useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "~/components/ui/dialog";
import { TrendingDown } from "lucide-react";
import { Label, Pie, PieChart, Bar, BarChart, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "~/components/ui/chart";

interface IncorrectDialogProps {
  isOpen: boolean;
  onClose: () => void;
  attempts: number;
  teamName: string;
  teamLogo: string;
  daysInARow: number;
  correctStreak: number;
  incorrectDays: number;
  notPlayedDays: number;
  attemptsDistribution: { [key: number]: number };
}

const chartConfig = {
  days: {
    label: "Days",
  },
  correct: {
    label: "Correct",
    color: "hsl(142, 76%, 36%)",
  },
  incorrect: {
    label: "Incorrect",
    color: "hsl(0, 84%, 60%)", // Red color for incorrect
  },
  notPlayed: {
    label: "Not Played",
    color: "hsl(var(--chart-3))",
  },
  attempts: {
    label: "Attempts",
    color: "hsl(0, 84%, 60%)", // Red color for attempts
  },
} satisfies ChartConfig;

export const IncorrectDialog: React.FC<IncorrectDialogProps> = ({
  isOpen,
  onClose,
  attempts,
  teamName,
  teamLogo,
  daysInARow,
  correctStreak,
  incorrectDays,
  notPlayedDays,
  attemptsDistribution,
}) => {
  const pieChartData = useMemo(() => {
    return [
      { type: "correct", days: correctStreak, fill: "hsl(142, 76%, 36%)" },
      { type: "incorrect", days: incorrectDays, fill: "hsl(0, 84%, 60%)" },
      { type: "notPlayed", days: notPlayedDays, fill: "hsl(var(--chart-3))" },
    ];
  }, [correctStreak, incorrectDays, notPlayedDays]);

  const barChartData = useMemo(() => {
    return [1, 2, 3, 4, 5].map((attempt) => ({
      attempt,
      count: attemptsDistribution[attempt] || 0,
    }));
  }, [attemptsDistribution]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Better luck next time!</DialogTitle>
          <DialogDescription>
            You were unable to guess the correct team in {attempts}{" "}
            {attempts === 1 ? "try" : "tries"}.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center mt-4">
          <img
            src={teamLogo}
            alt={`${teamName} logo`}
            width={100}
            height={100}
          />
          <p className="mt-2 text-lg font-semibold">
            The correct team was: {teamName}
          </p>
          <Card className="w-full mt-4">
            <CardHeader className="items-center pb-0">
              <CardTitle>Your Stats</CardTitle>
              <CardDescription>
                Last {daysInARow} Day{daysInARow !== 1 ? "s" : ""}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
              <div className="mt-4 mb-4 text-center">
                <p className="font-semibold">Days in a Row: {daysInARow}</p>
                <p className="font-semibold">
                  Current Correct Streak: {correctStreak}
                </p>
              </div>
              <ChartContainer
                config={chartConfig}
                className="mx-auto aspect-square max-h-[250px]"
              >
                <PieChart>
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent />}
                  />
                  <Pie
                    data={pieChartData}
                    dataKey="days"
                    nameKey="type"
                    innerRadius={60}
                    strokeWidth={5}
                  >
                    <Label
                      content={({ viewBox }) => {
                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                          return (
                            <text
                              x={viewBox.cx}
                              y={viewBox.cy}
                              textAnchor="middle"
                              dominantBaseline="middle"
                            >
                              <tspan
                                x={viewBox.cx}
                                y={viewBox.cy}
                                className="text-3xl font-bold fill-foreground"
                              >
                                {daysInARow}
                              </tspan>
                              <tspan
                                x={viewBox.cx}
                                y={(viewBox.cy || 0) + 24}
                                className="fill-muted-foreground"
                              >
                                Days in a Row
                              </tspan>
                            </text>
                          );
                        }
                      }}
                    />
                  </Pie>
                </PieChart>
              </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
              <div className="flex items-center gap-2 font-medium leading-none">
                Current streak: {correctStreak}{" "}
                <TrendingDown className="w-4 h-4" />
              </div>
              <div className="leading-none text-muted-foreground">
                Keep playing daily to improve your streak!
              </div>
            </CardFooter>
          </Card>
          <Card className="w-full mt-4">
            <CardHeader>
              <CardTitle>Guess Distribution</CardTitle>
              <CardDescription>
                Number of attempts for all guesses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig}>
                <BarChart
                  data={barChartData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <XAxis dataKey="attempt" />
                  <YAxis />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent />}
                  />
                  <Bar dataKey="count" fill="var(--color-attempts)" />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};
