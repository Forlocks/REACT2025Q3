import { describe, it, expect } from 'vitest';
import { deleteTags } from './deleteTags';

describe('deleteTags function', () => {
  it('should remove simple HTML tags', () => {
    expect(deleteTags('<div>Hello</div>')).toBe('Hello');
    expect(deleteTags('<p>Text</p>')).toBe('Text');
  });

  it('should remove multiple tags', () => {
    expect(deleteTags('<div><span>Multi</span> tags</div>')).toBe('Multi tags');
  });

  it('should handle self-closing tags', () => {
    expect(deleteTags('Line<br/>break')).toBe('Linebreak');
    expect(deleteTags('Image<img src="test.jpg"/>here')).toBe('Imagehere');
  });

  it('should remove tags with attributes', () => {
    expect(deleteTags('<a href="test.com">Link</a>')).toBe('Link');
    expect(deleteTags('<input type="text" value="test">')).toBe('');
  });

  it('should return empty string if only tags present', () => {
    expect(deleteTags('<div></div>')).toBe('');
    expect(deleteTags('<br/><hr/>')).toBe('');
  });

  it('should return original string if no tags present', () => {
    expect(deleteTags('Plain text')).toBe('Plain text');
    expect(deleteTags('123')).toBe('123');
  });

  it('should handle empty string', () => {
    expect(deleteTags('')).toBe('');
  });

  it('should handle complex HTML', () => {
    const html = `<div class="container"><h1>Title</h1><p>Paragraph <span>with</span> text</p></div>`;
    expect(deleteTags(html)).toBe('TitleParagraph with text');
  });
});
