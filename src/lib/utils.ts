import { clsx, type ClassValue } from "clsx"
import get from "lodash/get";
import { twMerge } from "tailwind-merge"
import type { Resource } from "./shared";
import intersection from "lodash/intersection";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const ensureArray = (obj: any) => {
  if (Array.isArray(obj)) return obj;
  else return [obj];
}

export function isValidHttpUrl(str: string) {
  let url;

  try {
    url = new URL(str);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
}

export function isValidDate(str: string) {
  const parsedDate = new Date(str);
  return !isNaN(parsedDate.getTime());
}


export function getField(resource: Resource, field: any) {
  if (typeof field === "string") {
    return get(resource, field, null);
  }
  else if (field.key in resource) {
    const object = get(resource, field.key, null);
    const result = [];
    if (object && Array.isArray(object)) {
      for (const item of object) {
        const a = intersection(get(item, field.path), field.possibleValues)
        if (a.length) {
          result.push({ key: a[0], value: get(item, field.property) })
        }
      }
      return result
    }
  }
  return null;
}

export function bytesToMB(bytes: number) {
  const MB = 1024 * 1024;  // 1 MB = 1024 * 1024 bytes
  return (bytes / MB).toFixed(2);  // Convert to MB and round to 2 decimal places
}

