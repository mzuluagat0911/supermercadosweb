import type { Store } from "@/generated/prisma/client";
import { ExternalLink, MapPin } from "lucide-react";

type StoreAddressLinkProps = {
  store: Store;
  className?: string;
  iconClassName?: string;
};

export function StoreAddressLink({
  store,
  className = "flex items-start gap-2 text-sm text-muted transition hover:text-ahorro",
  iconClassName = "mt-0.5 h-4 w-4 shrink-0",
}: StoreAddressLinkProps) {
  if (store.mapsUrl) {
    return (
      <a
        href={store.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        <MapPin className={iconClassName} />
        <span>
          {store.address}
          <ExternalLink className="ml-1 inline h-3 w-3 opacity-60" />
        </span>
      </a>
    );
  }

  return (
    <p className={className}>
      <MapPin className={iconClassName} />
      {store.address}
    </p>
  );
}
