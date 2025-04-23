import { cn } from "@/lib/utils";
import { CSSProperties, PropsWithChildren } from "react";

export const Section = (props: PropsWithChildren<{ className?: string, style?: CSSProperties }>) => {
  return (
    <section className={cn("max-w-7xl m-auto", props.className)} style={props.style}>
      {props.children}
    </section>
  );
};
