export class SplitByCommaHelper {
  public static split(values: (string | undefined)[]): string {
    const emptyStr = '';
    if (!values) {
      return emptyStr;
    }

    const comma = ', ';
    const joinWith = values?.length > 1 ? comma : emptyStr;

    return values
      .map((x) => (x ? x.trim() : x))
      .filter((x) => x)
      .join(joinWith);
  }
}
