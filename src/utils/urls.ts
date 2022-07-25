import axios from "axios";
import { DownloadItem } from "../apis/uploadFile";

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
      .catch((e) => {
         let error = new Error("");
         error.name = e.toJSON().code;
         return Promise.reject(error);
      });
}
