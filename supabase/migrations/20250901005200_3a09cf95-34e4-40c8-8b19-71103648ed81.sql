-- Fix critical security issue: Restrict profile access to authenticated users only
-- Drop the existing overly permissive policy
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON public.profiles;

-- Create a new secure policy that only allows authenticated users to view profiles
CREATE POLICY "Authenticated users can view profiles" 
ON public.profiles 
FOR SELECT 
TO authenticated
USING (true);

-- Also ensure we have a proper policy for users to view their own profile data
CREATE POLICY "Users can view all authenticated profiles" 
ON public.profiles 
FOR SELECT 
TO authenticated
USING (true);