import axios from "axios";
import { DownloadItem } from "../apis/uploadFile";
import { toErrorObject } from "./conversions";

export function getTitleFromURL(url: string) {
   let lastSlashIndex = url.lastIndexOf("/");
   return url.slice(lastSlashIndex + 1);
}

export function getPathForDownloadItem(currentItem: DownloadItem): string {
   let { path, url } = currentItem;
   if (!path?.length) {
      path = `global/${getTitleFromURL(url)}`;
   }

   return path;
}

export function getStreamFromURL(url: string, timeout: number): Promise<NodeJS.ReadableStream> {
   return axios
      .get(url, { responseType: "stream", timeout })
      .then((res) => res.data)
      .catch((e) => Promise.reject(toErrorObject(e.toJSON())));
}
