export class TryCatch {
  public static validator(fn: (...args: any[]) => void) {
    const ref = this;

    return function (...args: any[]) {
      try {
        fn.apply(ref, args);

        return {
          error: '',
          isValid: true,
        };
      } catch (error) {
        return {
          error: (error as any).message as string,
          isValid: false,
        };
      }
    };
  }
}
