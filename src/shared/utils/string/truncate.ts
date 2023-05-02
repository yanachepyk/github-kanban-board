const WHITE_SPACES = [
  ' ',
  '\n',
  '\r',
  '\t',
  '\f',
  '\v',
  '\u00A0',
  '\u1680',
  '\u180E',
  '\u2000',
  '\u2001',
  '\u2002',
  '\u2003',
  '\u2004',
  '\u2005',
  '\u2006',
  '\u2007',
  '\u2008',
  '\u2009',
  '\u200A',
  '\u2028',
  '\u2029',
  '\u202F',
  '\u205F',
  '\u3000',
];

/**
 * Limit number of chars.
 */
export function truncate(
  str: string,
  maxChars: number,
  onlyFullWords: boolean = true,
  append?: string
): string {
  if (!str || !maxChars) {
    return '';
  }

  append = append ?? '...';
  maxChars = onlyFullWords ? maxChars + 1 : maxChars;

  str = trim(str);
  if (str.length <= maxChars) {
    return str;
  }
  str = str.substr(0, maxChars - append.length);
  //crop at last space or remove trailing whitespace
  str = onlyFullWords ? str.substr(0, str.lastIndexOf(' ')) : trim(str);
  return str + append;
}

/**
 * Remove white-spaces from beginning and end of string.
 */
function trim(str: string, chars?: string[]): string {
  chars = chars || WHITE_SPACES;

  return ltrim(rtrim(str, chars), chars);
}

/**
 * Remove chars from beginning of string.
 */
function ltrim(str: string, chars: string[]): string {
  chars = chars || WHITE_SPACES;

  var start = 0,
    len = str.length,
    charLen = chars.length,
    found = true,
    i,
    c;

  while (found && start < len) {
    found = false;
    i = -1;
    c = str.charAt(start);

    while (++i < charLen) {
      if (c === chars[i]) {
        found = true;
        start++;
        break;
      }
    }
  }

  return start >= len ? '' : str.substr(start, len);
}

/**
 * Remove chars from end of string.
 */
function rtrim(str: string, chars: string[]): string {
  chars = chars || WHITE_SPACES;

  var end = str.length - 1,
    charLen = chars.length,
    found = true,
    i,
    c;

  while (found && end >= 0) {
    found = false;
    i = -1;
    c = str.charAt(end);

    while (++i < charLen) {
      if (c === chars[i]) {
        found = true;
        end--;
        break;
      }
    }
  }

  return end >= 0 ? str.substring(0, end + 1) : '';
}
