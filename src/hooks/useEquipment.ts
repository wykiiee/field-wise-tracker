
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Equipment {
  id: string;
  name: string;
  category: string;
  description?: string;
  status: 'operational' | 'maintenance' | 'repair' | 'retired';
  purchase_date?: string;
  purchase_cost?: number;
  last_maintenance_date?: string;
  next_maintenance_date?: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export type CreateEquipmentData = Omit<Equipment, 'id' | 'created_at' | 'updated_at' | 'user_id'>;

export const useEquipment = () => {
  const queryClient = useQueryClient();

  const { data: equipment, isLoading, error, refetch } = useQuery({
    queryKey: ['equipment'],
    queryFn: async () => {
      console.log('Fetching equipment...');
      const { data, error } = await supabase
        .from('equipment')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching equipment:', error);
        throw error;
      }

      console.log('Equipment fetched:', data);
      return data as Equipment[];
    },
  });

  const createMutation = useMutation({
    mutationFn: async (equipmentData: CreateEquipmentData) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('equipment')
        .insert({ ...equipmentData, user_id: user.id })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['equipment'] });
    },
  });

  const addEquipment = async (equipmentData: Omit<Equipment, 'id' | 'created_at' | 'updated_at' | 'user_id'>) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('equipment')
      .insert({ ...equipmentData, user_id: user.id })
      .select()
      .single();

    if (error) throw error;
    refetch();
    return data;
  };

  const updateEquipment = async (id: string, updates: Partial<Equipment>) => {
    const { data, error } = await supabase
      .from('equipment')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    refetch();
    return data;
  };

  const deleteEquipment = async (id: string) => {
    const { error } = await supabase
      .from('equipment')
      .delete()
      .eq('id', id);

    if (error) throw error;
    refetch();
  };

  return {
    equipment,
    isLoading,
    error,
    addEquipment,
    updateEquipment,
    deleteEquipment,
    refetch,
    createEquipment: createMutation.mutate,
    isCreating: createMutation.isPending,
  };
};
