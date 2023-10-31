/* The `PathToRegexp` class provides methods to convert a path string into a regular expression and add
a prefix to an existing regular expression. */
class PathToRegexp {
  /**
   * The function converts a given path string into a regular expression pattern.
   * @param path - The `path` parameter is a string representing a URL path.
   * @returns The code is returning a regular expression object.
   */
  static convert(path) {
    let regex = '^';

    const matches = path.matchAll(/\/(?<section>[\w-_+:]*)/g);
    for (const match of matches) {
      if (match.groups?.section[0] === ':') {
        regex += String.raw`\/(?<${match.groups.section.substring(
          1,
        )}>[\w-_+:]+)`;
      } else {
        regex += String.raw`\/${match.groups.section}`;
      }
    }

    regex += '$';

    return new RegExp(regex);
  }

  /**
   * The function adds a prefix to a regular expression.
   * @param regex - The `regex` parameter is a regular expression object. It represents a pattern that
   * is used to match strings.
   * @param prefix - The prefix parameter is a string that represents the prefix that will be added to
   * the regular expression.
   * @returns The function `addPrefix` returns a regular expression with a modified prefix.
   */
  static addPrefix(regex, prefix) {
    if (regex.source === '^\\/$') {
      return new RegExp(`^${prefix}$`);
    } else {
      return new RegExp(`^${prefix}${regex.source.substring(1)}`);
    }
  }
}

module.exports = PathToRegexp;
