import { EnvType, envType, processOrNull, selfOrNull, windowOrNull, requireNodeModuleAtRuntime } from '../lib';

describe('Test Suite', () => {
    it('envType', () => {
        expect(envType).toBe(EnvType.WEB);
    });

    it('processOrNull', () => {
        expect(processOrNull).toBeNull();
    });

    it('selfOrNull', () => {
        expect(selfOrNull).toBeTruthy();
    });

    it('windowOrNull', () => {
        expect(windowOrNull).toBeTruthy();
    });

    it('requireNodeModuleAtRuntime', () => {
        expect(() => requireNodeModuleAtRuntime('worker_threads')).toThrow();
    });
});
