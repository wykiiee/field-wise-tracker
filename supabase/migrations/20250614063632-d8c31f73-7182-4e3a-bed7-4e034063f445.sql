
-- Create enum types for better data consistency
CREATE TYPE supply_status AS ENUM ('in_stock', 'low_stock', 'out_of_stock');
CREATE TYPE equipment_status AS ENUM ('operational', 'maintenance', 'repair', 'retired');
CREATE TYPE transaction_type AS ENUM ('purchase', 'usage', 'waste', 'transfer');

-- Supplies table for managing farm supplies
CREATE TABLE public.supplies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  quantity DECIMAL(10,2) NOT NULL DEFAULT 0,
  unit TEXT NOT NULL,
  cost_per_unit DECIMAL(10,2),
  supplier TEXT,
  status supply_status NOT NULL DEFAULT 'in_stock',
  low_stock_threshold DECIMAL(10,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Equipment table for managing farm equipment
CREATE TABLE public.equipment (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  purchase_date DATE,
  purchase_cost DECIMAL(10,2),
  status equipment_status NOT NULL DEFAULT 'operational',
  last_maintenance_date DATE,
  next_maintenance_date DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Supply transactions for tracking usage, purchases, etc.
CREATE TABLE public.supply_transactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  supply_id UUID REFERENCES public.supplies(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  transaction_type transaction_type NOT NULL,
  quantity DECIMAL(10,2) NOT NULL,
  cost DECIMAL(10,2),
  notes TEXT,
  transaction_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Equipment maintenance records
CREATE TABLE public.equipment_maintenance (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  equipment_id UUID REFERENCES public.equipment(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  maintenance_type TEXT NOT NULL,
  description TEXT,
  cost DECIMAL(10,2),
  performed_by TEXT,
  maintenance_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security (RLS) on all tables
ALTER TABLE public.supplies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.equipment ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.supply_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.equipment_maintenance ENABLE ROW LEVEL SECURITY;

-- Create security definer function to get user role
CREATE OR REPLACE FUNCTION public.get_user_role(user_uuid UUID)
RETURNS TEXT
LANGUAGE SQL
SECURITY DEFINER
STABLE
AS $$
  SELECT role FROM public.profiles WHERE id = user_uuid;
$$;

-- RLS Policies for supplies
CREATE POLICY "Users can view their own supplies" 
  ON public.supplies 
  FOR SELECT 
  USING (auth.uid() = user_id OR public.get_user_role(auth.uid()) = 'admin');

CREATE POLICY "Users can insert their own supplies" 
  ON public.supplies 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own supplies" 
  ON public.supplies 
  FOR UPDATE 
  USING (auth.uid() = user_id OR public.get_user_role(auth.uid()) = 'admin');

CREATE POLICY "Users can delete their own supplies" 
  ON public.supplies 
  FOR DELETE 
  USING (auth.uid() = user_id OR public.get_user_role(auth.uid()) = 'admin');

-- RLS Policies for equipment
CREATE POLICY "Users can view their own equipment" 
  ON public.equipment 
  FOR SELECT 
  USING (auth.uid() = user_id OR public.get_user_role(auth.uid()) = 'admin');

CREATE POLICY "Users can insert their own equipment" 
  ON public.equipment 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own equipment" 
  ON public.equipment 
  FOR UPDATE 
  USING (auth.uid() = user_id OR public.get_user_role(auth.uid()) = 'admin');

CREATE POLICY "Users can delete their own equipment" 
  ON public.equipment 
  FOR DELETE 
  USING (auth.uid() = user_id OR public.get_user_role(auth.uid()) = 'admin');

-- RLS Policies for supply transactions
CREATE POLICY "Users can view their own supply transactions" 
  ON public.supply_transactions 
  FOR SELECT 
  USING (auth.uid() = user_id OR public.get_user_role(auth.uid()) = 'admin');

CREATE POLICY "Users can insert their own supply transactions" 
  ON public.supply_transactions 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own supply transactions" 
  ON public.supply_transactions 
  FOR UPDATE 
  USING (auth.uid() = user_id OR public.get_user_role(auth.uid()) = 'admin');

CREATE POLICY "Users can delete their own supply transactions" 
  ON public.supply_transactions 
  FOR DELETE 
  USING (auth.uid() = user_id OR public.get_user_role(auth.uid()) = 'admin');

-- RLS Policies for equipment maintenance
CREATE POLICY "Users can view their own equipment maintenance" 
  ON public.equipment_maintenance 
  FOR SELECT 
  USING (auth.uid() = user_id OR public.get_user_role(auth.uid()) = 'admin');

CREATE POLICY "Users can insert their own equipment maintenance" 
  ON public.equipment_maintenance 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own equipment maintenance" 
  ON public.equipment_maintenance 
  FOR UPDATE 
  USING (auth.uid() = user_id OR public.get_user_role(auth.uid()) = 'admin');

CREATE POLICY "Users can delete their own equipment maintenance" 
  ON public.equipment_maintenance 
  FOR DELETE 
  USING (auth.uid() = user_id OR public.get_user_role(auth.uid()) = 'admin');

-- Create indexes for better performance
CREATE INDEX idx_supplies_user_id ON public.supplies(user_id);
CREATE INDEX idx_supplies_status ON public.supplies(status);
CREATE INDEX idx_equipment_user_id ON public.equipment(user_id);
CREATE INDEX idx_equipment_status ON public.equipment(status);
CREATE INDEX idx_supply_transactions_supply_id ON public.supply_transactions(supply_id);
CREATE INDEX idx_supply_transactions_user_id ON public.supply_transactions(user_id);
CREATE INDEX idx_equipment_maintenance_equipment_id ON public.equipment_maintenance(equipment_id);
CREATE INDEX idx_equipment_maintenance_user_id ON public.equipment_maintenance(user_id);

-- Function to automatically update the updated_at column
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers to automatically update updated_at
CREATE TRIGGER update_supplies_updated_at
  BEFORE UPDATE ON public.supplies
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_equipment_updated_at
  BEFORE UPDATE ON public.equipment
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Function to automatically update supply status based on quantity
CREATE OR REPLACE FUNCTION public.update_supply_status()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.quantity <= 0 THEN
    NEW.status = 'out_of_stock';
  ELSIF NEW.quantity <= NEW.low_stock_threshold THEN
    NEW.status = 'low_stock';
  ELSE
    NEW.status = 'in_stock';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update supply status
CREATE TRIGGER update_supply_status_trigger
  BEFORE INSERT OR UPDATE ON public.supplies
  FOR EACH ROW EXECUTE FUNCTION public.update_supply_status();
