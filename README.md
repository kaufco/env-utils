# @kobayami/env-utils

## Installation

```sh
npm install --save @kobayami/env-utils
```

## Version and License

- Latest version: 1.0.0
- License: [MIT](https://kobayami.github.io/env-utils/LICENSE.md)
- [Changes](https://kobayami.github.io/env-utils/CHANGES.md)

## Summary

Utilities for multi-platform code that runs in Web and NodeJS environments:

- Check for environment type (_NodeJS_ or _Web_)
- Enable dynamic NodeJS module loading during runtime (i.e., not via static `import` statements)
- WebPack compatibility

## Usage Example

Dynamically loads a NodeJS module during runtime.
Throws an exception if the code is not running in a NodeJS environment.
This can also be safely embedded into code running in a Web environment like this:

```ts
if (envType === EnvType.NODE) {
    const leModule = requireNodeModuleAtRuntime('leModule');
    leModule.foo();
    ...
}
```

This is a practical example from `@kobayami/threads`:

```ts
const WorkerClass = envType === EnvType.NODE?
    requireNodeModuleAtRuntime('worker_threads').Worker: Worker
```

For multi platform code, this approach is sometimes necessary,
because NodeJS specific modules must only be loaded after we have confirmed
that we are not running in a Web environment.
A simple `import` at the beginning of a file would therefore not work,
browsers would raise a 404 error.

Module loading via this function is also compatible with WebPack, which is
the actual reason why we need it as a wrapper for the NodeJS `require` function.
When your code is being bundled and packaged by WebPack, dynamic module loading
via this approach does not confuse WebPack. No additional configuration is necessary.

## See Also

- [API Documentation](https://kobayami.github.io/env-utils/docs/modules.html)
- [Project Homepage](https://kobayami.github.io/env-utils)
- [Project on GitHub](https://github.com/kobayami/env-utils)
- [Issues](https://github.com/kobayami/env-utils/issues)
