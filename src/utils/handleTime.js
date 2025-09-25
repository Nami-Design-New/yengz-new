import { formatDistanceToNow } from "date-fns";
import { ar } from "date-fns/locale";

export function handleTime(dateString) {
  return formatDistanceToNow(new Date(dateString), {
    addSuffix: true,
    locale: ar,
  });
}
