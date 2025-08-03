import { describe, it, expect } from 'vitest';
import { deleteTags } from './deleteTags';

describe('deleteTags', () => {
  it('removes html tags from string', () => {
    expect(deleteTags('<b>text</b>')).toBe('text');
    expect(deleteTags('<div>hello</div>world')).toBe('helloworld');
    expect(deleteTags('no tags')).toBe('no tags');
  });

  it('returns empty string for undefined/null/empty', () => {
    expect(deleteTags(undefined)).toBe('');
    expect(deleteTags(null)).toBe('');
    expect(deleteTags('')).toBe('');
  });

  it('removes multiple tags', () => {
    expect(deleteTags('<a>1</a><b>2</b>')).toBe('12');
    expect(deleteTags('<span>3</span>4')).toBe('34');
  });
});
