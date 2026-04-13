import { mockUsers } from '../data/mockData';

const GOOGLE_SHEETS_ENDPOINT = import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL;

async function loginFromGoogleSheet(email, password) {
  const url = `${GOOGLE_SHEETS_ENDPOINT}?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Unable to validate login at the moment.');
  }

  const data = await response.json();

  if (!data.success) {
    throw new Error(data.message || 'Invalid login credentials.');
  }

  return {
    user: {
      id: data.user.id || email,
      name: data.user.name || email.split('@')[0],
      email: data.user.email,
      role: data.user.role || 'user',
      status: data.user.status,
    },
  };
}

function loginFromMock(email, password) {
  const match = mockUsers.find(
    (item) => item.email.toLowerCase() === email.toLowerCase()
  );

  if (!match || match.password !== password) {
    throw new Error('Invalid email or password.');
  }

  if (match.status !== 'active') {
    throw new Error('Your account is inactive. Please contact your administrator.');
  }

  return {
    user: {
      id: match.id,
      name: match.name,
      email: match.email,
      role: match.role,
      status: match.status,
    },
  };
}

export async function loginWithSheetCredentials(email, password) {
  if (!email || !password) {
    throw new Error('Please enter both email and password.');
  }

  if (GOOGLE_SHEETS_ENDPOINT) {
    try {
      return await loginFromGoogleSheet(email, password);
    } catch (error) {
      console.warn('Falling back to mock login:', error.message);
    }
  }

  await new Promise((resolve) => setTimeout(resolve, 700));
  return loginFromMock(email, password);
}
