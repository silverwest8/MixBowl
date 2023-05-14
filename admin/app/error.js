'use client';
import Cookies from 'js-cookie';
import { useEffect } from 'react';

export default function Error({ error, reset }) {
  useEffect(() => {
    Cookies.remove('token');
    window.location.reload();
  }, [error]);

  return null;
}
