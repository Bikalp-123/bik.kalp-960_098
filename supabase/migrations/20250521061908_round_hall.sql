/*
  # Add points system tables
  
  1. New Tables
    - `user_points`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `points` (integer)
      - `last_login` (timestamp)
      - `created_at` (timestamp)
  
  2. Security
    - Enable RLS on `user_points` table
    - Add policies for users to read/update their own points
*/

CREATE TABLE IF NOT EXISTS user_points (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  points integer DEFAULT 0,
  last_login timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

ALTER TABLE user_points ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own points"
  ON user_points
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own points"
  ON user_points
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);