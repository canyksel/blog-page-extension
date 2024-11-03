export function calculateReadingTime(textLength: number) {
  //Average reading speed (words per minute)
  const wordsPerSecond = 3.96;
  //Calculate total reading time
  const totalReadingTime = Math.ceil(textLength / wordsPerSecond);
  //Calculate reading time as minute
  const readingMinute = (totalReadingTime - (totalReadingTime % 60)) / 60;
  //Calculate reading time as second
  const readingSecond = totalReadingTime % 60;

  return `${readingMinute} min ${readingSecond} sec read`;
}
