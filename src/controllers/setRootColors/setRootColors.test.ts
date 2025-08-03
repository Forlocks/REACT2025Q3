import { describe, it, expect, vi, beforeEach } from 'vitest';
import { setRootColors } from './setRootColors';

describe('setRootColors', () => {
  let setPropertySpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    setPropertySpy = vi.fn();
    Object.defineProperty(document, 'documentElement', {
      value: {
        style: {
          setProperty: setPropertySpy,
        },
      },
      configurable: true,
    });
  });

  it('should apply light theme colors', () => {
    setRootColors('light');

    expect(setPropertySpy).toHaveBeenCalledTimes(3);
    expect(setPropertySpy).toHaveBeenCalledWith('--aqua-focus', '#032879');
    expect(setPropertySpy).toHaveBeenCalledWith('--gray', '#0b596d');
    expect(setPropertySpy).toHaveBeenCalledWith('--gray-focus', '#06313b');
  });

  it('should apply dark theme colors', () => {
    setRootColors('dark');

    expect(setPropertySpy).toHaveBeenCalledTimes(3);
    expect(setPropertySpy).toHaveBeenCalledWith('--aqua-focus', '#004747');
    expect(setPropertySpy).toHaveBeenCalledWith('--gray', '#414040');
    expect(setPropertySpy).toHaveBeenCalledWith('--gray-focus', '#272727');
  });

  it('should not apply colors if theme is invalid', () => {
    setRootColors('unknown');

    expect(setPropertySpy).not.toHaveBeenCalled();
  });
});
