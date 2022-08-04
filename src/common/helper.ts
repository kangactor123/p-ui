export function regExp(str: string, flags?: string | undefined): RegExp {
  return RegExp(str.replace(/[-[/\]{}()*+?.,\\^$|#\s]/g, "\\$&"), flags);
}
