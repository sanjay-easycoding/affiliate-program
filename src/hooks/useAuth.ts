'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  hasAffiliate: boolean;
  profilePicture?: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null
  });
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      console.log('🔍 useAuth checkAuth called');
      // API call commented out - using dummy data from localStorage
      // const response = await fetch('/api/auth/me', {
      //   method: 'GET',
      //   credentials: 'include', // Include cookies
      // });

      // if (response.ok) {
      //   const userData = await response.json();
      //   setAuthState({
      //     user: userData.user,
      //     loading: false,
      //     error: null
      //   });
      // } else {
      //   // Not authenticated
      //   setAuthState({
      //     user: null,
      //     loading: false,
      //     error: null
      //   });
      //   router.push('/login');
      // }

      // Check localStorage for dummy tokens and user data
      const accessToken = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
      const userDataStr = typeof window !== 'undefined' ? localStorage.getItem('user_data') : null;
      
      console.log('🔍 useAuth localStorage check:', { 
        hasAccessToken: !!accessToken, 
        hasUserData: !!userDataStr 
      });
      
      if (accessToken && userDataStr) {
        try {
          const userData = JSON.parse(userDataStr);
          console.log('🔍 useAuth parsed userData:', userData);
          // Ensure hasAffiliate is set for non-admin users
          // Ensure role is uppercase for consistency
          const userRole = userData.role ? userData.role.toUpperCase() : 'AFFILIATE';
          const user: User = {
            id: userData.id,
            email: userData.email,
            name: userData.name,
            role: userRole, // Always store in uppercase
            hasAffiliate: userData.hasAffiliate !== undefined ? userData.hasAffiliate : userRole !== 'ADMIN',
            profilePicture: userData.profilePicture,
          };
          
          console.log('✅ useAuth setting user:', user);
          setAuthState({
            user,
            loading: false,
            error: null
          });
        } catch (parseError) {
          console.error('❌ useAuth parse error:', parseError);
          // Invalid data in localStorage, clear it
          if (typeof window !== 'undefined') {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('user_data');
          }
          setAuthState({
            user: null,
            loading: false,
            error: null
          });
          router.push('/login');
        }
      } else {
        console.log('❌ useAuth no tokens found');
        // Not authenticated
        setAuthState({
          user: null,
          loading: false,
          error: null
        });
        // Only redirect if not already on login page
        if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
          router.push('/login');
        }
      }
    } catch (error) {
      console.error('❌ useAuth error:', error);
      setAuthState({
        user: null,
        loading: false,
        error: 'Failed to check authentication'
      });
      // Only redirect if not already on login page
      if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
        router.push('/login');
      }
    }
  };

  const logout = async () => {
    try {
      // API call commented out - clearing localStorage instead
      // await fetch('/api/auth/logout', {
      //   method: 'POST',
      //   credentials: 'include',
      // });
      
      // Clear all auth-related data from localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');
        localStorage.removeItem('affiliate_platform_session');
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setAuthState({
        user: null,
        loading: false,
        error: null
      });
      router.push('/login');
    }
  };

  return {
    ...authState,
    logout,
    checkAuth
  };
}