export function regExp(str: string, flags?: string | undefined): RegExp {
  return RegExp(str.replace(/[-[/\]{}()*+?.,\\^$|#\s]/g, '\\$&'), flags);
}

export const isValidFileFormat = (fileName: string, formats: string[]): boolean => {
  const format = fileName.split('.').reverse()[0];
  return formats.some((val) => val === format);
};
