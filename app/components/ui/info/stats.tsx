import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../card";

interface StatCardProps {
  title: string;
  value: string;
  textColor?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  textColor = "inherit",
}) => {
  return (
    <Card className="flex flex-col justify-between aspect-square">
      <CardHeader>
        <CardTitle className="text-base font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center flex-grow">
        <div className={`text-4xl font-bold`} style={{ color: textColor }}>
          {value}
        </div>
      </CardContent>
    </Card>
  );
};
