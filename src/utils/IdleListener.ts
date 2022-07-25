// when this.hit() is not called within some time
// it will hit the callback provided
export default class IdleListener {
   interval: NodeJS.Timer;
   isRunning: boolean;
   isHit: boolean;
   private _onIdle: () => void;

   constructor(time: number) {
      this.isRunning = true;
      this.isHit = false;
      this.interval = setInterval(() => {
         if (this.isHit) {
            this.isHit = false;
            return;
         }

         this._onIdle();
         this.clear();
      }, time);

      this._onIdle = () => {};
   }

   hit() {
      this.isHit = true;
   }

   clear() {
      if (!this.isRunning) return;
      clearInterval(this.interval);
      this.isRunning = false;
   }

   onIdle(onIdle: () => void) {
      this._onIdle = onIdle;
   }
}
