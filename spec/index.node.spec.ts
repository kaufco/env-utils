import { EnvType, envType, processOrNull, selfOrNull, windowOrNull, requireNodeModuleAtRuntime } from '../lib';

describe('Test Suite', () => {
    it('envType', () => {
        expect(envType).toBe(EnvType.NODE);
    });

    it('processOrNull', () => {
        expect(processOrNull).toBeTruthy();
    });

    it('selfOrNull', () => {
        expect(selfOrNull).toBeNull();
    });

    it('windowOrNull', () => {
        expect(windowOrNull).toBeNull();
    });

    it('requireNodeModuleAtRuntime', () => {
        expect(requireNodeModuleAtRuntime('worker_threads').Worker).toBeTruthy();
    });
});
