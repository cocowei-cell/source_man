//非空验证
export function noSpaceValidate(str) {
  if (str.trim().length === 0) {
    return true;
  }
  return false;
}
