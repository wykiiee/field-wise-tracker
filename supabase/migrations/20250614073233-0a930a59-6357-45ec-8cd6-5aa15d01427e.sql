
-- Only add the specific missing pieces that we know don't exist
-- Update the functions to handle the automatic triggers properly

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION public.update_supply_status()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.quantity <= 0 THEN
    NEW.status = 'out_of_stock';
  ELSIF NEW.quantity <= COALESCE(NEW.low_stock_threshold, 0) THEN
    NEW.status = 'low_stock';
  ELSE
    NEW.status = 'in_stock';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers only if they don't already exist
DO $$
BEGIN
  -- Check and create update_supplies_updated_at trigger
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.triggers 
    WHERE trigger_name = 'update_supplies_updated_at' 
    AND event_object_table = 'supplies'
  ) THEN
    CREATE TRIGGER update_supplies_updated_at 
      BEFORE UPDATE ON public.supplies 
      FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
  END IF;

  -- Check and create update_equipment_updated_at trigger
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.triggers 
    WHERE trigger_name = 'update_equipment_updated_at' 
    AND event_object_table = 'equipment'
  ) THEN
    CREATE TRIGGER update_equipment_updated_at 
      BEFORE UPDATE ON public.equipment 
      FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
  END IF;

  -- Check and create update_supplies_status trigger
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.triggers 
    WHERE trigger_name = 'update_supplies_status' 
    AND event_object_table = 'supplies'
  ) THEN
    CREATE TRIGGER update_supplies_status 
      BEFORE INSERT OR UPDATE ON public.supplies 
      FOR EACH ROW EXECUTE FUNCTION public.update_supply_status();
  END IF;
END $$;
