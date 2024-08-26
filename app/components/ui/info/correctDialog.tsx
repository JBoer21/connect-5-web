import React, { useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "~/components/ui/dialog";
import { TrendingUp } from "lucide-react";
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

interface CorrectDialogProps {
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
    color: "hsl(142, 76%, 36%)", // Green color
  },
  incorrect: {
    label: "Incorrect",
    color: "hsl(var(--chart-2))",
  },
  notPlayed: {
    label: "Not Played",
    color: "hsl(var(--chart-3))",
  },
  attempts: {
    label: "Attempts",
    color: "hsl(142, 76%, 36%)",
  },
} satisfies ChartConfig;

export const CorrectDialog: React.FC<CorrectDialogProps> = ({
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
      { type: "correct", days: correctStreak, fill: "hsl(142, 76%, 36%)" }, // Green color
      { type: "incorrect", days: incorrectDays, fill: "hsl(var(--chart-2))" },
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
          <DialogTitle>Congratulations!</DialogTitle>
          <DialogDescription>
            You guessed the correct team in {attempts}{" "}
            {attempts === 1 ? "try" : "tries"}!
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center mt-4">
          <img
            src={teamLogo}
            alt={`${teamName} logo`}
            width={100}
            height={100}
          />
          <p className="mt-2 text-lg font-semibold">{teamName}</p>
          <Card className="w-full mt-4">
            <CardHeader className="items-center pb-0">
              <CardTitle>Your Streak</CardTitle>
              <CardDescription>
                Last {daysInARow} Day{daysInARow !== 1 ? "s" : ""}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
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
                <TrendingUp className="w-4 h-4" />
              </div>
              <div className="leading-none text-muted-foreground">
                Keep playing daily to improve your streak!
              </div>
            </CardFooter>
          </Card>
          <Card className="w-full mt-4">
            <CardHeader>
              <CardTitle>Correct Guess Distribution</CardTitle>
              <CardDescription>
                Number of attempts for correct guesses
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
