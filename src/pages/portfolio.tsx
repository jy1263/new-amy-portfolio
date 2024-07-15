import * as React from "react";
import type { ProjectCardData } from "~/types";
import Link from "next/link";
import projectCards from "~/cfg/projectCards";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { cn } from "~/lib/utils";
import { useScroll } from "~/contexts/ScrollProvider";

const ProjectCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & ProjectCardData & {
    mousePos?: [number, number];
  }
>(({ title,
  actions,
  description,
  mousePos, className, ...props }, ref) => {
  const [x, y] = mousePos ?? [-999999, -999999];
  const cardRef = React.useRef<HTMLDivElement>(null);
  const rect = cardRef.current?.getBoundingClientRect();
    
  React.useImperativeHandle(ref, () => (cardRef.current!));
    
  return <Card
    ref={cardRef}
    className={cn(`
          h-72 flex flex-col hover:shadow-xl transition-all relative overflow-hidden z-10
          after:content-[''] after:absolute
          after:transition-[height,width] after:duration-700 after:ease-out
          after:bg-[radial-gradient(hsl(var(--primary)/10%),#3984ff00_70%)]
          dark:after:bg-[radial-gradient(hsl(var(--primary)/30%),#3984ff00_70%)]
          after:left-[var(--x)] after:top-[var(--y)] after:-translate-x-1/2 after:-translate-y-1/2 after:w-[100rem] after:h-[100rem] after:-z-10
        `, x < 0 && y < 0 && "after:h-0 after:w-0", className)}
    style={{
      ...props.style,
      '--x': `${x - (rect?.left ?? 0)}px`,
      '--y': `${y - (rect?.top ?? 0)}px`
    } as Record<string, string>}
    {...props}
  >
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent className="flex-1 overflow-y-auto z-20">
      {description}
    </CardContent>
    <CardFooter className="flex justify-end gap-3 z-20">
      {
        actions.map((action, i) =>
          <Button key={i} asChild>
            <Link href={action.href}>
              <action.icon className="mr-1" />
              {action.text}
            </Link>
          </Button>
        )
      }
    </CardFooter>
  </Card>
})
ProjectCard.displayName = "ProjectCard"

function Portfolio() {
  const [mousePos, setMousePos] = React.useState<[number, number]>([-999999, -999999]);
  // for some reason this gets rid of issues with scrolling
  useScroll();
  
  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos([e.clientX, e.clientY]);
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  return <main className="auto-limit-w grid grid-cols-1 md:grid-cols-2 gap-3 py-3">
    {
      projectCards.map((card, i) =>
        <ProjectCard key={i} mousePos={mousePos} {...card} />
      )
    }
  </main>;
}

export default Portfolio;