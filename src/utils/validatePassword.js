// utils/validatePassword.js

export const getPasswordStrength = (password) => {
  if (password.length < 8) return "Password must be at least 8 characters long.";
  if (!/[A-Z]/.test(password)) return "Password must include at least one uppercase letter.";
  if (!/[0-9]/.test(password)) return "Password must include at least one number.";
  return "Strong password";
};

export const isPasswordValid = (password, confirmPassword) => {
  if (password !== confirmPassword) return "Passwords do not match.";
  const strength = getPasswordStrength(password);
  return strength === "Strong password" ? null : strength;
};
