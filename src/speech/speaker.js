import say from 'say';

export function speak(text) {
  return new Promise((resolve, reject) => {
    say.speak(text, null, 1.0, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}