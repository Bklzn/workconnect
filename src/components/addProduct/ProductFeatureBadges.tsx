import { Badge } from "@/components/ui/badge";
import { PRODUCT_FEATURES } from "@/data/productOptions";
import { cn } from "cn";

interface ProductFeatureBadgesProps {
  value: string[];
  onChange: (next: string[]) => void;
}

export function ProductFeatureBadges({
  value,
  onChange,
}: ProductFeatureBadgesProps) {
  const toggle = (feature: string) => {
    onChange(
      value.includes(feature)
        ? value.filter((f) => f !== feature)
        : [...value, feature],
    );
  };

  return (
    <div className="flex flex-wrap gap-2">
      {PRODUCT_FEATURES.map((feature) => {
        const selected = value.includes(feature);
        return (
          <Badge
            key={feature}
            render={<button type="button" aria-pressed={selected} />}
            variant="outline"
            className={cn(
              "cursor-pointer text-muted-foreground text-sm transition-colors hover:bg-muted",
              selected &&
                "border-transparent bg-blue-600 text-white hover:bg-blue-600",
            )}
            onClick={() => toggle(feature)}
          >
            {feature}
          </Badge>
        );
      })}
    </div>
  );
}
