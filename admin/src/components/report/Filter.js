import { Toggle, ToggleItem } from "@tremor/react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export default function Filter() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const type = searchParams.get("type");
  function toggleType(value) {
    const params = new URLSearchParams(window.location.search);
    params.set("type", value);
    replace(`${pathname}?${params.toString()}`);
  }
  return (
    <Toggle
      value={type || "recipe"}
      onValueChange={(value) => toggleType(value)}
    >
      <ToggleItem value="recipe" text="레시피" />
      <ToggleItem value="post" text="커뮤니티" />
    </Toggle>
  );
}
