-- Make municipalities column nullable
ALTER TABLE public.clinics ALTER COLUMN municipalities DROP NOT NULL;
