import { invalidState } from '@kobayami/guards';

/**
 * The global scope object, if the code is running in a Web environment, or `null` otherwise.
 * If the code is running in the main thread, this is the `window` object.
 * Otherwise, it is the global scope of the worker thread in which the code runs.
 */
export const selfOrNull: WindowOrWorkerGlobalScope | null = typeof self !== 'undefined' ? self : null;

/**
 * The `window` object, if the code is running in the main thread of a Web environment, or `null` otherwise.
 */
export const windowOrNull: Window | null = typeof window !== 'undefined' && window === selfOrNull ? window : null;

/**
 * The `process` object, if the code is running in a NodeJS environment, or `null` otherwise.
 */
export const processOrNull: NodeJS.Process | null = typeof process !== 'undefined' && !selfOrNull ? process : null;

/**
 * Environment types.
 */
export enum EnvType {
    /**
     * Code is running in a Web environment, i.e., a browser or web container.
     */
    WEB,

    /**
     * Code is running in a NodeJS environment.
     */
    NODE,
}

/**
 * Environment type under which the code is running.
 */
export const envType = selfOrNull ? EnvType.WEB : EnvType.NODE;

/**
 * Dynamically loads a NodeJS module during runtime.
 * Throws an exception if the code is not running in a NodeJS environment.
 * This can also be safely embedded into code running in a Web environment like this:
 *
 * ```
 * if (envType === EnvType.NODE) {
 *     const leModule = requireNodeModuleAtRuntime('leModule');
 *     leModule.foo();
 *     ...
 * }
 * ```
 *
 * This is a practical example from `@kobayami/threads`:
 *
 * ```
 *  const WorkerClass = envType === EnvType.NODE?
 *      requireNodeModuleAtRuntime('worker_threads').Worker: Worker
 * ```
 *
 * For multi platform code, this approach is sometimes necessary,
 * because NodeJS specific modules must only be loaded after we have confirmed
 * that we are not running in a Web environment.
 * A simple `import` at the beginning of a file would therefore not work,
 * browsers would raise a 404 error.
 *
 * Module loading via this function is also compatible with WebPack, which is
 * the actual reason why we need it as a wrapper for the NodeJS `require` function.
 * When your code is being bundled and packaged by WebPack, dynamic module loading
 * via this approach does not confuse WebPack. No additional configuration is necessary.
 *
 * @param id id for the module to load.
 */
export function requireNodeModuleAtRuntime(id: string): any {
    // How it works:
    // 1. Use require in a way that the expression cannot be statically resolved by WebPack
    // 2. However, WebPack will still produce a warning due to the fact that it recognizes
    //    `require`, but cannot statically resolve it. Using `module.require` will then
    //    hide it from WebPack entirely.
    if (envType !== EnvType.NODE) throw invalidState();
    return (() => module.require)()(id);
}
