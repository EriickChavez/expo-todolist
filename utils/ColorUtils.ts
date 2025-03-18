const hexToRgba = (hex: string, alpha: number): string => {
  hex = hex.replace("#", "");

  if (!/^[0-9A-F]{6}$/i.test(hex)) {
    return "rgba(0, 0, 0, 1)";
  }

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  if (alpha < 0 || alpha > 1) {
    return `rgba(${r}, ${g}, ${b}, 1)`;
  }

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export { hexToRgba };
