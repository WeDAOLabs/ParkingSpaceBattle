export class StringUtil {
  static isEmpty(str: string | null | undefined) {
    return !str || str === "";
  }
}
