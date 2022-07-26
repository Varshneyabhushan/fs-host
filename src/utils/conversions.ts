import { AddressInfo } from "node:net";

export function toNumber(numberString: string): number | null {
   let anticipation = +numberString;
   if (Number.isNaN(anticipation)) return null;
   return anticipation;
}

export function getAddressInfo(address: string | AddressInfo | null): string {
   if (!address) return "";
   if (typeof address === "string") return address;
   let { family, address: addressString, port } = address;
   return `${family}:${addressString}:${port}`;
}

export function toErrorObject(e: any) {
   let { name, message, stack, code } = e;
   return { name, message, stack, code };
}
