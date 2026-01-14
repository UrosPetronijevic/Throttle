export default function Throttling(
  callback: (...args: any[]) => void,
  delay: number
) {
  let timeout: any = null;
  let latestArgs: any[] | null = null;

  return (...args: any[]) => {
    if (!timeout) {
      timeout = true;

      setTimeout(() => {
        timeout = false;

        if (latestArgs) {
          callback(...latestArgs);
          latestArgs = null;
        }
      }, delay);
    } else {
      latestArgs = args;
    }
  };
}
