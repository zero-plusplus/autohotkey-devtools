export enum TimesControllerState {
  Stop,
}
export interface TimesController {
  stop: () => TimesControllerState.Stop;
}
/**
 * Repeats the given function a specified number of times, in sequence.
 * @param count
 * @param callback
 * @returns An array consisting of the result of the `callback`
 */
export function times(count: number, callback: (index: number, controller: TimesController) => TimesControllerState | void): void {
  const controller: TimesController = {
    stop: () => TimesControllerState.Stop,
  };

  for (let i = 0; i < count; i++) {
    const state = callback(i, controller);
    if (state === TimesControllerState.Stop) {
      break;
    }
    continue;
  }
}
