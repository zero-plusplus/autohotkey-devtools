import { TimesControllerState, type TimesController } from './times';

/**
 * Repeats the given async function a specified number of times, in sequence.
 * @param count
 * @param callback
 * @returns An array consisting of the result of the `callback`
 */
export async function timesAsync(count: number, callback: (index: number, controller: TimesController) => Promise<TimesControllerState | void>): Promise<void> {
  const controller: TimesController = {
    stop: () => TimesControllerState.Stop,
  };

  for (let i = 0; i < count; i++) {
    const state = await callback(i, controller);
    if (state === TimesControllerState.Stop) {
      break;
    }
    continue;
  }
}
