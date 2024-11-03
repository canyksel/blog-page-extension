export function calculateReadingTime(textLength: number) {
    //Average reading speed (words per minute)
    const wordsPerSecond = 3.96;
    //Calculate reading time as minute
    const totalReadingTime = Math.ceil(textLength / wordsPerSecond);
  
    const readingMinute = (totalReadingTime - (totalReadingTime % 60)) / 60;
    const readingSecond = totalReadingTime % 60;
  
    return `${readingMinute} min ${readingSecond} sec read`;
  }