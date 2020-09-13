export default function delay(time, callback) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      callback();
      resolve("回调已被执行");
    }, time);
  });
}
