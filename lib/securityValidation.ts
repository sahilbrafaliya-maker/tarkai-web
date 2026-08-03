// Shared lead security validation helper for TARK AI EdTech

const DISPOSABLE_EMAIL_DOMAINS = new Set([
  'test.com', 'testing.com', 'example.com', 'asdf.com', 'qwerty.com', 'abc.com', 'xyz.com',
  'fake.com', 'fakemail.com', 'random.com', 'dummy.com', 'sample.com', 'temp.com', 'nomail.com',
  'foo.com', 'bar.com', 'invalid.com', 'tempmail.com', 'temp-mail.org', 'dispostable.com',
  'mailinator.com', '10minutemail.com', 'trashmail.com', 'guerrillamail.com', 'yopmail.com',
  'sharklasers.com', 'gmx.com', 'qq.com', '163.com', 'fakeinbox.com', 'getairmail.com',
  'throwawaymail.com', 'maildrop.cc', 'mailnesia.com', 'mohmal.com', 'inboxkitten.com',
  'nada.ltd', 'crazymailing.com', 'dropmail.me', 'binkmail.com', 'bobmail.info', 'spam4.me'
]);

const DUMMY_EMAIL_LOCALS = new Set([
  'test', 'testing', 'asdf', 'asdfg', 'qwerty', 'abc', 'abcd', 'xyz', 'admin', 'user',
  'sample', 'temp', 'fake', 'demo', 'dummy', 'noemail', 'nomail', 'aaa', 'bbb', 'xxx',
  'yyyy', '123', '1234', '12345', '123456', 'guest', 'info', 'support', 'hello', 'mail'
]);

const DUMMY_PHONE_NUMBERS = new Set([
  '0000000000', '1111111111', '2222222222', '3333333333', '4444444444',
  '5555555555', '6666666666', '7777777777', '8888888888', '9999999999',
  '1234567890', '0123456789', '9876543210', '9876543211', '1234567891',
  '9999900000', '8888800000', '7777700000', '6666600000', '9898989898',
  '9191919191', '9090909090', '9988776655', '6543210987', '8901234567'
]);

const DUMMY_NAMES = new Set([
  'asdf', 'qwerty', 'test', 'testing', 'admin', 'user', 'abcd', 'xyz',
  'aaaa', 'bbbb', '1234', 'dummy', 'sample', 'fake', 'null', 'undefined'
]);

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export function validateFullName(name: string): ValidationResult {
  const trimmed = name.trim();
  if (!trimmed) {
    return { isValid: false, error: 'Name is required' };
  }
  if (trimmed.length < 2) {
    return { isValid: false, error: 'Name must be at least 2 characters long' };
  }
  if (trimmed.length > 50) {
    return { isValid: false, error: 'Name must be under 50 characters' };
  }
  if (!/^[a-zA-Z\s.-]+$/.test(trimmed)) {
    return { isValid: false, error: 'Name can only contain alphabetic letters and spaces' };
  }
  if (DUMMY_NAMES.has(trimmed.toLowerCase())) {
    return { isValid: false, error: 'Please enter a valid full name' };
  }
  if (/^(.)\1{3,}$/i.test(trimmed.replace(/\s+/g, ''))) {
    return { isValid: false, error: 'Please enter a genuine full name' };
  }
  return { isValid: true };
}

export function validateMobileNumber(phone: string): ValidationResult {
  const digitsOnly = phone.replace(/\D/g, '');
  if (!digitsOnly) {
    return { isValid: false, error: 'Phone number is required' };
  }
  if (digitsOnly.length !== 10) {
    return { isValid: false, error: 'Please enter a valid 10-digit mobile number' };
  }
  if (!/^[6-9]\d{9}$/.test(digitsOnly)) {
    return { isValid: false, error: 'Mobile number must start with 6, 7, 8, or 9' };
  }
  if (DUMMY_PHONE_NUMBERS.has(digitsOnly)) {
    return { isValid: false, error: 'Please enter a valid active mobile number' };
  }

  const counts: Record<string, number> = {};
  for (const char of digitsOnly) {
    counts[char] = (counts[char] || 0) + 1;
  }
  if (Object.values(counts).some(count => count >= 7)) {
    return { isValid: false, error: 'Please enter a genuine 10-digit phone number' };
  }

  return { isValid: true };
}

export function validateEmailAddress(email: string): ValidationResult {
  const trimmed = email.trim().toLowerCase();
  if (!trimmed) {
    return { isValid: false, error: 'Email address is required' };
  }
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(trimmed)) {
    return { isValid: false, error: 'Please enter a valid email address (e.g., name@gmail.com)' };
  }
  const parts = trimmed.split('@');
  if (parts.length !== 2) {
    return { isValid: false, error: 'Invalid email format' };
  }
  const [localPart, domainPart] = parts;
  if (localPart.length < 2) {
    return { isValid: false, error: 'Email username is too short' };
  }
  if (DUMMY_EMAIL_LOCALS.has(localPart)) {
    return { isValid: false, error: 'Please use your real email address' };
  }
  if (DISPOSABLE_EMAIL_DOMAINS.has(domainPart)) {
    return { isValid: false, error: 'Temporary or disposable email domains are not allowed' };
  }
  const domainSubparts = domainPart.split('.');
  if (domainSubparts[0].length < 2) {
    return { isValid: false, error: 'Please enter a valid email domain' };
  }
  return { isValid: true };
}
