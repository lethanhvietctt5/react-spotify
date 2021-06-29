export function msToTime(duration: number) {
  let milliseconds = Math.floor((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  let h: string;
  if (hours == 0) {
    h = "";
  } else if (hours < 10) {
    h = "0" + hours.toString();
  } else h = hours.toString();

  let m: string;
  if (minutes < 10) {
    m = "0" + minutes.toString();
  } else m = minutes.toString();

  let s: string;
  if (seconds < 10) {
    s = "0" + seconds.toString();
  } else s = seconds.toString();

  if (h.length > 0) {
    return h + ":" + m + ":" + s;
  } else return m + ":" + s;
}