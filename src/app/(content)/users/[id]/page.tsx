"use client";

import { useEffect, useState } from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { UserDocument } from "@/models/User";
import { getUser } from "@/actions/getUser";

const chartConfig = {
  progress: {
    label: "Progress",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function Page({ params }: { params: { id: string } }) {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<UserDocument | null | undefined>(null);

  useEffect(() => {
    const fetchUser = async () => {
      var user = await getUser(params.id);

      setUser(user);
    };

    fetchUser();
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-slate-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="w-full h-full grid place-content-center">
        <h1 className="text-2xl text-center">
          No user with id: <span className="font-bold">{params.id}</span> found.
        </h1>
      </div>
    );
  }

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const chartData = user.progress;

  if (chartData.length > months.length) {
    chartData.splice(0, chartData.length - months.length);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Progress of {user.username}</CardTitle>
        <CardDescription>Every month</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData.map((data, idx) => {
              return {
                month: months[idx],
                progress: data,
              };
            })}
            margin={{
              top: 24,
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="progress"
              type="natural"
              stroke="black"
              strokeWidth={2}
              dot={{
                fill: "var(--color-desktop)",
              }}
              activeDot={{
                r: 6,
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Test <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">Test123</div>
      </CardFooter> */}
    </Card>
  );
}
