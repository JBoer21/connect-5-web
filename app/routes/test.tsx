import { Button } from "~/components/ui/button";
import { Link } from "@remix-run/react";
import { Command } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { ThemeToggle } from "./resources.theme-toggle";
import { Hero3DCard } from "~/components/hero-3d-card";
import { TextRevealCardPreview } from "~/components/text-reveal-preview";
import { AnimatedTooltipPreview } from "~/components/animated-preview";
import { HeroParallaxDemo } from "~/components/parallax-preview";
import { AnimatedPinDemo } from "~/components/animated-3d-pin";

export default function Test() {
  return (
    <section className="flex flex-col w-full min-h-screen">
      <nav className="flex items-center justify-between w-full p-4">
        <Link to="/" className="flex items-center space-x-2">
          <Command className="w-8 h-8" />
          <h1 className="text-xl font-semibold">Remix + Shadcn</h1>
        </Link>
        <ThemeToggle />
      </nav>
      <div className="container flex justify-center flex-1 px-4 py-8 overflow-x-hidden md:px-6">
        <div className="flex flex-col items-center p-4 space-y-4 text-center md:w-1/2">
          <h1 className="text-3xl font-bold tracking-tighter md:text-4xl">
            A{" "}
            <span className="font-extrabold bg-gradient-to-r from-orange-700 via-blue-500 to-green-400 text-transparent bg-clip-text bg-300% animate-gradient">
              Simple Starter
            </span>{" "}
            For Remix, Shadcn-ui and{" "}
            <Link
              to="https://ui.aceternity.com"
              className="hover:text-blue-500"
            >
              Aceternity-ui
            </Link>
          </h1>

          <p className="mt-2 font-bold text-muted-foreground">
            With optimistic dark-mode.
          </p>
          <p className="mt-2 text-muted-foreground">
            (On mobile, tap for animations.)
          </p>

          <Card className="relative overflow-hidden rounded-lg group">
            <CardContent className="p-1 bg-gradient-to-r from-orange-700 via-blue-500 to-green-400 bg-300% animate-gradient">
              <Button asChild>
                <Link to="https://github.com/rajeshdavidbabu/remix-shadcn-starter">
                  Star on Github
                </Link>
              </Button>
            </CardContent>
          </Card>

          <div className="px-4">
            <AnimatedTooltipPreview />
            <AnimatedPinDemo />
            <Hero3DCard />
          </div>

          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Create project</CardTitle>
              <CardDescription>
                Deploy your new project in one-click.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid items-center w-full gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Name of your project" />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="framework">Framework</Label>
                    <Select>
                      <SelectTrigger id="framework">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="next">Next.js</SelectItem>
                        <SelectItem value="sveltekit">SvelteKit</SelectItem>
                        <SelectItem value="astro">Astro</SelectItem>
                        <SelectItem value="nuxt">Nuxt.js</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button>Deploy</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}
