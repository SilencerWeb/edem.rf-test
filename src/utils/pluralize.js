// This function is taken from https://gist.github.com/znechai/1b25d0ee9a92e5b879175ab4f040dbbc
export function pluralize(count, words) {
  const cases = [2, 0, 1, 1, 1, 2];
  const word =
    words[
      count % 100 > 4 && count % 100 < 20 ? 2 : cases[Math.min(count % 10, 5)]
    ];

  return `${count} ${word}`;
}
