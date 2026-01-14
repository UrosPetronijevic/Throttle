export default function Throttling(
  callback: (...args: any[]) => void,
  delay: number
) {
  let timeout: any = null;

  return () => {
    if (!timeout) {
      timeout = true;

      setTimeout(() => {
        timeout = false;

        callback();
      }, delay);
    }
  };
}
